import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'apps/hdermaapp/src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SanphamService {
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
  getById(id: string) {
    return this.http.post(this.urlApi + `/hderma-product/findid`,{id}).pipe(
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
  // uploadDriver(file: any): Observable<any> {
  //   return this.http.post(this.urlApi + '/upload/filehderma', file).pipe(
  //     map((data: any) => {
  //       if (data) {
  //         return data;
  //       }
  //     })
  //   );
  // }

  private _danhmucs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  get danhmucs$(): Observable<any[] | null> {
    return this._danhmucs.asObservable();
  }
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get danhmuc$(): Observable<any | null> {
    return this._danhmuc.asObservable();
  }
  getDanhmucs() {
    return this.http.get(this.urlApi + '/hderma-danhmuc-product').pipe(
      map((data: any) => {
        this._danhmucs.next(data);
        return data;
      })
    );
  }
  getDanhmucDetail(slug: string) {
    return this.http.get(this.urlApi + `/hderma-danhmuc-product/${slug}`).pipe(
      map((data: any) => {
        this._danhmuc.next(data);
        return data;
      })
    );
  }
  getDMById(id: any) {
    return this.http.post(this.urlApi + `/hderma-danhmuc-product/findid`,{id}).pipe(
      map((data: any) => {
        this._danhmuc.next(data);
        return data;
      })
    );
  }
  postDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.post(this.urlApi + '/hderma-danhmuc-product', data).pipe(
          map((danhmuc) => {
            if (danhmucs?.length > 0) {
              this._danhmucs.next([...danhmucs, danhmuc]);
            } else {
              this._danhmucs.next([danhmuc]);
            }
            return danhmuc;
          })
        )
      )
    );
  }
  updateDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.patch(this.urlApi + `/hderma-danhmuc-product/${data.id}`, data).pipe(
          map((danhmuc) => {
            // Find the index of the updated tag
            const index = danhmucs.findIndex((item: any) => item.id === data.id);

            // Update the tag
            if (index != -1) {
              danhmucs[index] = data;

              this._danhmucs.next(danhmucs as any[]);
            } else {
              this._danhmucs.next([danhmuc]);
            }
            // Return the updated tag
            return danhmuc;
          })
        )
      )
    );
  }
  deleteDanhmuc(id: string) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.delete(this.urlApi + `/hderma-danhmuc-product/${id}`).pipe(
          map((isDelete) => {
            const updateDanhmuc = danhmucs.filter((e: any) => e.id != id);
            this._danhmucs.next(updateDanhmuc);
            return isDelete;
          })
        )
      )
    );
  }
  DeleteuploadDriver(data: any): Observable<any> {
    console.log(data);
    return this.http.delete(this.urlApi + `/upload/${data.id}`,{ body: data }).pipe(
      map((res: any) => {
        if (res) {
          console.log(res);
          return res;
        }
      })
    );
  }
  uploadDriver(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}_${month}_${year}`;
    return this.http.post(this.urlApi + `/upload/server?folder=hderma/${formattedDate}`, formData).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
