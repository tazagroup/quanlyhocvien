import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private APIURL = environment.APIURL;
  private _khachhang: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _khachhangs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get khachhangs$(): Observable<any[]> {
    return this._khachhangs.asObservable();
  }
  get khachhang$(): Observable<any> {
    return this._khachhang.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-khachhang/findid/${id}`).pipe(
      tap((response: any) => {
        this._khachhang.next(response);
      })
    );
  }
  getBySlug(slug: string) {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-khachhang/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._khachhang.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/qlhocvien-khachhang`).pipe(
      tap((response: any[]) => {
        this._khachhangs.next(response);
      })
    );
  }
  createKhachhang(dulieu: any): Observable<any> {
    return this.khachhangs$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/qlhocvien-khachhang`, dulieu).pipe(
        map((res: any) => {
          this._khachhangs.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updateKhachhang(dulieu: any): Observable<any> {
    return this.khachhangs$.pipe(
      take(1),
      switchMap((khachhangs: any) =>
        this._httpClient.patch(`${this.APIURL}/qlhocvien-khachhang/${dulieu.id}`, dulieu).pipe(
          map((khachhang: any) => {
            const index = khachhangs.findIndex((item: any) => item.id === khachhang.id);
            khachhangs[index] = khachhang;
            this._khachhangs.next(khachhangs);
            return khachhang;
          })
        )
      ))
  }
  deleteKhachhang(dulieu: any) {
    return this.khachhangs$.pipe(
      take(1),
      switchMap((khachhangs: any) =>
        this._httpClient.delete(`${this.APIURL}/qlhocvien-khachhang/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = khachhangs.filter((e: any) => e.id != dulieu.id);
            this._khachhangs.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
