import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { result } from 'lodash-es';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HinhanhService {
  private APIURL = environment.APIURL;
  private _hinhanh: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _hinhanhs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get hinhanhs$(): Observable<any[]> {
    return this._hinhanhs.asObservable();
  }
  get hinhanh$(): Observable<any> {
    return this._hinhanh.asObservable();
  }
  getCloud(data: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/upload/listfile`,data).pipe(
      tap((response: any) => {
        return response
        // this._hinhanh.next(response);
        // console.log(response);
      })
    );
  }
  Dongbo(data: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/upload/dongbo`,data).pipe(
      tap((response: any) => {
        return response
        // this._hinhanh.next(response);
        // console.log(response);
      })
    );
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/upload/id`).pipe(
      tap((response: any) => {
        this._hinhanh.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/upload`).pipe(
      tap((response: any[]) => {
        return response
      })
    );
  }
  createHinhanh(dulieu: any): Observable<any> {
    return this.hinhanhs$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/upload`, dulieu).pipe(
        map((res: any) => {
          this._hinhanhs.next([res[1], ...datas]);
          console.log(res);
          return res[1];
        })
      ))
    );
  }
  updateHinhanh(dulieu: any): Observable<any> {
    return this.hinhanhs$.pipe(
      take(1),
      switchMap((hinhanhs: any) =>
        this._httpClient.patch(`${this.APIURL}/upload/${dulieu.id}`, dulieu).pipe(
          map((hinhanh: any) => {
            const index = hinhanhs.findIndex((item: any) => item.id === hinhanh.id);
            hinhanhs[index] = hinhanh;
            this._hinhanhs.next(hinhanhs);
            return hinhanh;
          })
        )
      ))
  }
  deleteHinhanh(dulieu: any) {
    return this.hinhanhs$.pipe(
      take(1),
      switchMap((hinhanhs: any) =>
        this._httpClient.delete(`${this.APIURL}/upload/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = hinhanhs.filter((e: any) => e.id != dulieu.id);
            this._hinhanhs.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
