import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CauhinhService {
  private APIURL = environment.APIURL;
  private _cauhinh: BehaviorSubject<any> = new BehaviorSubject(null);
  private _cauhinhs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get cauhinhs$(): Observable<any[]> {
    return this._cauhinhs.asObservable();
  }
  get cauhinh$(): Observable<any> {
    return this._cauhinh.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/cauhinh-hoahong/${id}`).pipe(
      tap((response: any) => {
        this._cauhinh.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/cauhinh-hoahong`).pipe(
      tap((response: any[]) => {
        this._cauhinhs.next(response);
      })
    );
  }
  Create(dulieu: any): Observable<any> {
    return this.cauhinhs$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/cauhinh-hoahong`, dulieu).pipe(
        map((res: any) => {
          this._cauhinhs.next([res[1], ...datas]);
          console.log(res);
          return res[1];
        })
      ))
    );
  }
  Update(dulieu: any): Observable<any> {
    return this.cauhinhs$.pipe(
      take(1),
      switchMap((cauhinhs: any) =>
        this._httpClient.patch(`${this.APIURL}/cauhinh-hoahong/${dulieu.id}`, dulieu).pipe(
          map((cauhinh: any) => {
            const index = cauhinhs.findIndex((item: any) => item.id === cauhinh.id);
            cauhinhs[index] = cauhinh;
            this._cauhinhs.next(cauhinhs);
            return cauhinh;
          })
        )
      ))
  }
  Delete(dulieu: any) {
    return this.cauhinhs$.pipe(
      take(1),
      switchMap((cauhinhs: any) =>
        this._httpClient.delete(`${this.APIURL}/cauhinh-hoahong/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = cauhinhs.filter((e: any) => e.id != dulieu.id);
            this._cauhinhs.next(updatePhanquyens);
            return isDelete;
          })
        )
      )
    );
  }


 private _chiendich: BehaviorSubject<any | any> = new BehaviorSubject(null);
 private _chiendichs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
 get chiendichs$(): Observable<any[]> {
   return this._chiendichs.asObservable();
 }
 get chiendich$(): Observable<any> {
   return this._chiendich.asObservable();
 }
 getChiendichByid(id: any): Observable<any> {
   return this._httpClient.get<any>(`${this.APIURL}/hderma-cauhinh-chiendich/${id}`).pipe(
     tap((response: any) => {
       this._chiendich.next(response);
       console.log(response);
     })
   );
 }
 getAllChiendich(): Observable<any[]> {
   return this._httpClient.get<any[]>(`${this.APIURL}/hderma-cauhinh-chiendich`).pipe(
     tap((response: any[]) => {
       this._chiendichs.next(response);
     })
   );
 }
 createChiendich(dulieu: any): Observable<any> {
   return this.chiendichs$.pipe(
     take(1),
     switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-cauhinh-chiendich`, dulieu).pipe(
       map((res: any) => {
         this._chiendichs.next([res[1], ...datas]);
         console.log(res);
         return res[1];
       })
     ))
   );
 }
 updateChiendich(dulieu: any): Observable<any> {
   return this.chiendichs$.pipe(
     take(1),
     switchMap((chiendichs: any) =>
       this._httpClient.patch(`${this.APIURL}/hderma-cauhinh-chiendich/${dulieu.id}`, dulieu).pipe(
         map((chiendich: any) => {
           const index = chiendichs.findIndex((item: any) => item.id === chiendich.id);
           chiendichs[index] = chiendich;
           this._chiendichs.next(chiendichs);
           return chiendich;
         })
       )
     ))
 }
 deleteChiendich(dulieu: any) {
   return this.chiendichs$.pipe(
     take(1),
     switchMap((chiendichs: any) =>
       this._httpClient.delete(`${this.APIURL}/hderma-cauhinh-chiendich/${dulieu.id}`).pipe(
         map((isDelete) => {
           const updatePhanquyens = chiendichs.filter((e: any) => e.id != dulieu.id);
           this._chiendichs.next(updatePhanquyens);
           return isDelete;
         })
       )
     )
   );
 }

}
