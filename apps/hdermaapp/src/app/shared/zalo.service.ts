import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ZaloService {
  private APIURL = environment.APIURL;
  private _zalo: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _zalos: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get zalos$(): Observable<any[]> {
    return this._zalos.asObservable();
  }
  get zalo$(): Observable<any> {
    return this._zalo.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-zalo/findid/${id}`).pipe(
      tap((response: any) => {
        this._zalo.next(response);
      })
    );
  }
  getBySlug(slug: string) {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-zalo/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._zalo.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/qlhocvien-zalo`).pipe(
      tap((response: any[]) => {
        this._zalos.next(response);
      })
    );
  }
  createZalo(dulieu: any): Observable<any> {
    return this.zalos$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/qlhocvien-zalo`, dulieu).pipe(
        map((res: any) => {
          this._zalos.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updateZalo(dulieu: any): Observable<any> {
    return this.zalos$.pipe(
      take(1),
      switchMap((zalos: any) =>
        this._httpClient.patch(`${this.APIURL}/qlhocvien-zalo/${dulieu.id}`, dulieu).pipe(
          map((zalo: any) => {
            const index = zalos.findIndex((item: any) => item.id === zalo.id);
            zalos[index] = zalo;
            this._zalos.next(zalos);
            return zalo;
          })
        )
      ))
  }
  deleteZalo(dulieu: any) {
    return this.zalos$.pipe(
      take(1),
      switchMap((zalos: any) =>
        this._httpClient.delete(`${this.APIURL}/qlhocvien-zalo/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = zalos.filter((e: any) => e.id != dulieu.id);
            this._zalos.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
