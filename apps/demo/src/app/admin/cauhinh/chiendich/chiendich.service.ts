import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChiendichService {
  private APIURL = environment.APIURL;
  private _chiendich: BehaviorSubject<any> = new BehaviorSubject(null);
  private _chiendichs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get chiendichs$(): Observable<any[]> {
    return this._chiendichs.asObservable();
  }
  get chiendich$(): Observable<any> {
    return this._chiendich.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-cauhinh-chiendich/${id}`).pipe(
      tap((response: any) => {
        this._chiendich.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-cauhinh-chiendich`).pipe(
      tap((response: any[]) => {
        this._chiendichs.next(response);
      })
    );
  }
  Create(dulieu: any): Observable<any> {
    return this.chiendichs$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-cauhinh-chiendich`, dulieu).pipe(
        map((res: any) => {
          this._chiendichs.next([res[1], ...datas]);
          return [res[1], ...datas];
        })
      ))
    );
  }
  Update(dulieu: any): Observable<any> {
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
  Delete(dulieu: any) {
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
