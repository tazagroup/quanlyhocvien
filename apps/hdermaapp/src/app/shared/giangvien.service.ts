import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GiangvienService {
  private APIURL = environment.APIURL;
  private _giangvien: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _giangviens: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get giangviens$(): Observable<any[]> {
    return this._giangviens.asObservable();
  }
  get giangvien$(): Observable<any> {
    return this._giangvien.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-giangvien/findid/${id}`).pipe(
      tap((response: any) => {
        this._giangvien.next(response);
      })
    );
  }
  getBySlug(slug: string) {
    return this._httpClient.get<any>(`${this.APIURL}/qlhocvien-giangvien/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._giangvien.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/qlhocvien-giangvien`).pipe(
      tap((response: any[]) => {
        this._giangviens.next(response);
      })
    );
  }
  createGiangvien(dulieu: any): Observable<any> {
    return this.giangviens$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/qlhocvien-giangvien`, dulieu).pipe(
        map((res: any) => {
          this._giangviens.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updateGiangvien(dulieu: any): Observable<any> {
    return this.giangviens$.pipe(
      take(1),
      switchMap((giangviens: any) =>
        this._httpClient.patch(`${this.APIURL}/qlhocvien-giangvien/${dulieu.id}`, dulieu).pipe(
          map((giangvien: any) => {
            const index = giangviens.findIndex((item: any) => item.id === giangvien.id);
            giangviens[index] = giangvien;
            this._giangviens.next(giangviens);
            return giangvien;
          })
        )
      ))
  }
  deleteGiangvien(dulieu: any) {
    return this.giangviens$.pipe(
      take(1),
      switchMap((giangviens: any) =>
        this._httpClient.delete(`${this.APIURL}/qlhocvien-giangvien/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = giangviens.filter((e: any) => e.id != dulieu.id);
            this._giangviens.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
