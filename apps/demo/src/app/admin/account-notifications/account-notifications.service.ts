import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable()
export class AccountNotificationsService {
constructor(private _httpClient: HttpClient) {}
 private APIURL = environment.APIURL;
 private _notify: BehaviorSubject<any | any> = new BehaviorSubject(null);
 private _notifys: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
 get notifys$(): Observable<any[]> {
   return this._notifys.asObservable();
 }
 get notify$(): Observable<any> {
   return this._notify.asObservable();
 }
 private _statePer: BehaviorSubject<any | any> = new BehaviorSubject(null);
 get statePer$(): Observable<any> {
   return this._statePer.asObservable();
 }
 public setStatePer(v: any): void {
  this._statePer.next(v);
}
 getByidNotify(id: any): Observable<any> {
   return this._httpClient.get<any>(`${this.APIURL}/hderma-notify/${id}`).pipe(
     tap((response: any) => {
       this._notify.next(response);
     })
   );
 }
 getByidUserNotify(id: any): Observable<any> {
   return this._httpClient.get<any>(`${this.APIURL}/hderma-notify/user/${id}`).pipe(
     tap((response: any) => {
       this._notify.next(response);
     })
   );
 }
 getAllNotify(): Observable<any[]> {
   return this._httpClient.get<any[]>(`${this.APIURL}/hderma-notify`).pipe(
     tap((response: any[]) => {
       this._notifys.next(response);
     })
   );
 }
 createNotify(dulieu: any): Observable<any> {
   return this._httpClient.post<any>(`${this.APIURL}/hderma-notify`, dulieu).pipe(
       map((res: any) => {
        return res
       })
   );
 }
 updateNotify(dulieu: any): Observable<any> {
   return this.notifys$.pipe(
     take(1),
     switchMap((notifys: any) =>
       this._httpClient.patch(`${this.APIURL}/hderma-notify/${dulieu.id}`, dulieu).pipe(
         map((notify: any) => {
           const index = notifys.findIndex((item: any) => item.id === notify.id);
           notifys[index] = notify;
           this._notifys.next(notifys);
           return notify;
         })
       )
     ))
 }
 deleteNotify(dulieu: any) {
   return this.notifys$.pipe(
     take(1),
     switchMap((notifys: any) =>
       this._httpClient.delete(`${this.APIURL}/hderma-notify/${dulieu.id}`).pipe(
         map((isDelete) => {
           const updatePhanquyens = notifys.filter((e: any) => e.id != dulieu.id);
           this._notifys.next(updatePhanquyens);
           return isDelete;
         })
       )
     )
   );
 }
 PushNotify(dulieu: any): Observable<any> {
  return this._httpClient.post<any>(`${this.APIURL}/hderma-notify/push-noti`, dulieu).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
  );
}
}
