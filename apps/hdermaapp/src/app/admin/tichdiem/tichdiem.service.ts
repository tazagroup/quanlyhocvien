import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TichdiemService {
  private APIURL = environment.APIURL;
  constructor(private _httpClient: HttpClient) { }
  private _tichdiem: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _tichdiems: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  get tichdiems$(): Observable<any[]> {
    return this._tichdiems.asObservable();
  }
  get tichdiem$(): Observable<any> {
    return this._tichdiem.asObservable();
  }
  getTichdiem(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-customer/diem/${id}`).pipe(
      tap((response: any) => {
        return response
      })
    );
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-customer-diem/${id}`).pipe(
      tap((response: any) => {
        this._tichdiem.next(response);
        //console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-customer-diem`).pipe(
      tap((response: any[]) => {
        this._tichdiems.next(response);
      })
    );
  }

//   createDiem(data: any): Observable<any> {
//     return this.http.post(this.urlApi+ `/hderma-customer-diem`, data).pipe(
//      map((customer) => {
//            //console.log(customer);
//          return customer;
//        })
//     )
// }

  createTichdiem(dulieu: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/hderma-customer-diem`, dulieu).pipe(
        map((res: any) => {         
           //console.log(res);
          return res;
        })
    );
  }
  updateTichdiem(dulieu: any): Observable<any> {
    return this.tichdiems$.pipe(
      take(1),
      switchMap((tichdiems: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-customer-diem/${dulieu.id}`, dulieu).pipe(
          map((tichdiem: any) => {
            const index = tichdiems.findIndex((item: any) => item.id === tichdiem.id);
            tichdiems[index] = tichdiem;
            this._tichdiems.next(tichdiems);
            return tichdiem;
          })
        )
      ))
  }
  deleteTichdiem(dulieu: any) {
    return this.tichdiems$.pipe(
      take(1),
      switchMap((tichdiems: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-customer-diem/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = tichdiems.filter((e: any) => e.id != dulieu.id);
            this._tichdiems.next(updatePhanquyens);
            return isDelete;
          })
        )
      )
    );
  }



 private _customer: BehaviorSubject<any | any> = new BehaviorSubject(null);
 private _customers: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
 get customers$(): Observable<any[]> {
   return this._customers.asObservable();
 }
 get customer$(): Observable<any> {
   return this._customer.asObservable();
 }
 getCustomerByid(id: any): Observable<any> {
   return this._httpClient.get<any>(`${this.APIURL}/hderma-customer/${id}`).pipe(
     tap((response: any) => {
       this._customer.next(response);
       //console.log(response);
     })
   );
 }
 getCustomerByidUser(id: any): Observable<any> {
   return this._httpClient.get<any>(`${this.APIURL}/hderma-customer/idUser/${id}`).pipe(
     tap((response: any) => {
       return response
     })
   );
 }
 getAllCustomer(): Observable<any[]> {
   return this._httpClient.get<any[]>(`${this.APIURL}/hderma-customer`).pipe(
     tap((response: any[]) => {
       this._customers.next(response);
     })
   );
 }
 createCustomer(dulieu: any): Observable<any> {
   return this._httpClient.post<any>(`${this.APIURL}/hderma-customer`, dulieu).pipe(
       map((res: any) => {
         //console.log(res);
         return res;
       })
   );
 }
 updateCustomer(dulieu: any): Observable<any> {
  //console.log(dulieu);
  
   return this._httpClient.patch(`${this.APIURL}/hderma-customer/${dulieu.id}`, dulieu).pipe(
         map((customer: any) => {
          //console.log(customer);
           return customer;
         })
       )
 }
 deleteCustomer(dulieu: any) {
   return this.customers$.pipe(
     take(1),
     switchMap((customers: any) =>
       this._httpClient.delete(`${this.APIURL}/hderma-customer/${dulieu.id}`).pipe(
         map((isDelete) => {
           const updatePhanquyens = customers.filter((e: any) => e.id != dulieu.id);
           this._customers.next(updatePhanquyens);
           return isDelete;
         })
       )
     )
   );
 }
}