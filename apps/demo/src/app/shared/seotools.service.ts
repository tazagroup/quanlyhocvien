import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeotoolService {

  private urlApi = environment.APIURL;
  private _seotools: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  get seotools$(): Observable<any[] | null> {
    return this._seotools.asObservable();
  }
  private _seotool: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get seotool$(): Observable<any | null> {
    return this._seotool.asObservable();
  }
  constructor(private http: HttpClient) { }

  getSeotools() {
    return this.http.get(this.urlApi + '/hderma-seotool').pipe(
      map((data: any) => {
        console.log(data);
        
        this._seotools.next(data);
        return data;
      })
    );
  }
  getSeotoolDetail(slug: string) {
    return this.http.get(this.urlApi + `/hderma-seotool/${slug}`).pipe(
      map((data: any) => {
        this._seotool.next(data);
        return data;
      })
    );
  }
  getSeotoolById(id: string) {
    return this.http.get(this.urlApi + `/hderma-seotool/findid/${id}`).pipe(
      map((data: any) => {
        this._seotool.next(data);
        return data;
      })
    );
  }
  postSeotool(data: any) {
    return this.seotools$.pipe(
      take(1),
      switchMap((seotools: any) =>
        this.http.post(this.urlApi + '/hderma-seotool', data).pipe(
          map((seotool) => {
            if (seotools?.length > 0) {
              this._seotools.next([...seotools, seotool]);
            } else {
              this._seotools.next([seotool]);
            }
            return seotool;
          })
        )
      )
    );
  }
  updateSeotool(data: any) {
    return this.http.patch(this.urlApi + `/hderma-seotool/${data.id}`, data).pipe(
          map((seotool) => {
            this._seotool.next(seotool)
            return seotool;
          })
        )
  }
  deleteSeotool(id: String) {
    return this.seotools$.pipe(
      take(1),
      switchMap((seotools: any) =>
        this.http.delete(this.urlApi + `/hderma-seotool/${id}`).pipe(
          map((isDelete) => {
            const updateSeotool = seotools.filter((e: any) => e.id != id);
            this._seotools.next(updateSeotool);
            return isDelete;
          })
        )
      )
    );
  }
  uploadDriver(file: any): Observable<any> {
    return this.http.post(this.urlApi + '/upload/file', file).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
