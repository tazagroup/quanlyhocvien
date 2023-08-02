import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HoahongService {
  private APIURL = environment.APIURL;
  private _hoahong: BehaviorSubject<any> = new BehaviorSubject(null);
  private _hoahongs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get hoahongs$(): Observable<any[]> {
    return this._hoahongs.asObservable();
  }
  get hoahong$(): Observable<any> {
    return this._hoahong.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/cauhinh-hoahong/${id}`).pipe(
      tap((response: any) => {
        this._hoahong.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/cauhinh-hoahong`).pipe(
      tap((response: any[]) => {
        this._hoahongs.next(response);
      })
    );
  }
  Create(dulieu: any): Observable<any> {
    return this.hoahongs$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/cauhinh-hoahong`, dulieu).pipe(
        map((res: any) => {
          this._hoahongs.next([res[1], ...datas]);
          console.log(res);
          return res[1];
        })
      ))
    );
  }
  Update(dulieu: any): Observable<any> {
    return this.hoahongs$.pipe(
      take(1),
      switchMap((hoahongs: any) =>
        this._httpClient.patch(`${this.APIURL}/cauhinh-hoahong/${dulieu.id}`, dulieu).pipe(
          map((hoahong: any) => {
            const index = hoahongs.findIndex((item: any) => item.id === hoahong.id);
            hoahongs[index] = hoahong;
            this._hoahongs.next(hoahongs);
            return hoahong;
          })
        )
      ))
  }
  Delete(dulieu: any) {
    return this.hoahongs$.pipe(
      take(1),
      switchMap((hoahongs: any) =>
        this._httpClient.delete(`${this.APIURL}/cauhinh-hoahong/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = hoahongs.filter((e: any) => e.id != dulieu.id);
            this._hoahongs.next(updatePhanquyens);
            return isDelete;
          })
        )
      )
    );
  }
}
