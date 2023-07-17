import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'apps/hdermaapp/src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlApi = environment.APIURL;
  private _products: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _product: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get products$(): Observable<any[]> {
    return this._products.asObservable();
  }
  get product$(): Observable<any> {
    return this._product.asObservable();
  }
  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    console.log(data);

    return this.products$.pipe(
      take(1),
      switchMap((proudcts: any) =>
        this.http.post(this.urlApi + '/hderma-product/', data).pipe(
          map((product) => {
            this._products.next([product, ...proudcts]);
            return product;
          })
        )
      )
    );
  }
  getProduct() {
    return this.http.get(this.urlApi + '/hderma-product').pipe(
      map((products) => {
        this._products.next(products);
        return products;
      })
    );
  }
  getProductDetail(slug: string) {
    return this.http.get(this.urlApi + `/hderma-product/${slug}`).pipe(
      map((product) => {
        this._product.next(product);
        return product;
      })
    );
  }
  updateProduct(data: any) {
    return this.products$.pipe(
      take(1),
      switchMap((products) =>
        this.http.patch(this.urlApi + `/hderma-product/${data.id}`, data).pipe(
          map((product) => {
            if (products?.length > 0) {
              let index = products.findIndex(x => x.id == data.id)
              products[index] = data
              this._products.next(products);
            } else {
              this._products.next([product]);
            }
            return product;
          })
        )
      )
    );
  }
  deleteSanpham(id: string) {
    return this.products$.pipe(
      take(1),
      switchMap((productss: any) =>
        this.http.delete(this.urlApi + `/hderma-product/${id}`).pipe(
          map((isDelete) => {
            const updateSanPham = productss.filter((e: any) => e.id != id);
            this._products.next(updateSanPham);
            return isDelete;
          })
        )
      )
    );
  }
  uploadDriver(file: any): Observable<any> {
    return this.http.post(this.urlApi + '/upload/filehderma', file).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
