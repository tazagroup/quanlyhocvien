import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private APIURL = environment.APIURL;
  private _demo: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _demos: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get demos$(): Observable<any[]> {
    return this._demos.asObservable();
  }
  get demo$(): Observable<any> {
    return this._demo.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demos/${id}`).pipe(
      tap((response: any) => {
        this._demo.next(response);
      })
    );
  }
  getBySlug(data: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/demos/slug`,data).pipe(
      tap((response: any) => {
        this._demo.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/demos`).pipe(
      tap((response: any[]) => {
        this._demos.next(response);
      })
    );
  }
  createDemo(dulieu: any): Observable<any> {
    return this.demos$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/demos`, dulieu).pipe(
        map((res: any) => {
          this._demos.next([res, ...datas]);
          console.log(res);
          return res[1];
        })
      ))
    );
  }
  updateDemo(dulieu: any): Observable<any> {
    return this.demos$.pipe(
      take(1),
      switchMap((demos: any) =>
        this._httpClient.patch(`${this.APIURL}/demos/${dulieu.id}`, dulieu).pipe(
          map((demo: any) => {
            const index = demos.findIndex((item: any) => item.id === demo.id);
            demos[index] = demo;
            this._demos.next(demos);
            return demo;
          })
        )
      ))
  }
  deleteDemo(dulieu: any) {
    return this.demos$.pipe(
      take(1),
      switchMap((demos: any) =>
        this._httpClient.delete(`${this.APIURL}/demos/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = demos.filter((e: any) => e.id != dulieu.id);
            this._demos.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
