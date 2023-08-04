import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HocvienService {
  private APIURL = environment.APIURL;
  private _hocvien: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _hocviens: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get hocviens$(): Observable<any[]> {
    return this._hocviens.asObservable();
  }
  get hocvien$(): Observable<any> {
    return this._hocvien.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-hocvien/findid/${id}`).pipe(
      tap((response: any) => {
        this._hocvien.next(response);
      })
    );
  }
  getBySlug(slug: string) {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-hocvien/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._hocvien.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/qlhocvien-hocvien`).pipe(
      tap((response: any[]) => {
        this._hocviens.next(response);
      })
    );
  }
  createHocvien(dulieu: any): Observable<any> {
    return this.hocviens$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/qlhocvien-hocvien`, dulieu).pipe(
        map((res: any) => {
          this._hocviens.next([res, ...datas]);
          console.log(res);
          return res;
        })
      ))
    );
  }
  updateHocvien(dulieu: any): Observable<any> {
    return this.hocviens$.pipe(
      take(1),
      switchMap((hocviens: any) =>
        this._httpClient.patch(`${this.APIURL}/qlhocvien-hocvien/${dulieu.id}`, dulieu).pipe(
          map((hocvien: any) => {
            const index = hocviens.findIndex((item: any) => item.id === hocvien.id);
            hocviens[index] = hocvien;
            this._hocviens.next(hocviens);
            return hocvien;
          })
        )
      ))
  }
  deleteHocvien(dulieu: any) {
    return this.hocviens$.pipe(
      take(1),
      switchMap((hocviens: any) =>
        this._httpClient.delete(`${this.APIURL}/qlhocvien-hocvien/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = hocviens.filter((e: any) => e.id != dulieu.id);
            this._hocviens.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
