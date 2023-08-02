import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {
  private urlApi = environment.APIURL;
  private _khoahocs: BehaviorSubject<any[] | null> = new BehaviorSubject<
    any[] | null
  >(null);

  get khoahocs$(): Observable<any[] | null> {
    return this._khoahocs.asObservable();
  }
  private _khoahoc: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);

  get khoahoc$(): Observable<any | null> {
    return this._khoahoc.asObservable();
  }
  constructor(private http: HttpClient) { }

  getKhoahocs() {
    return this.http.get(this.urlApi + '/qlhocvien-khoahoc').pipe(
      map((data: any) => {
        this._khoahocs.next(data);
        return data;
      })
    );
  }
  getKhoahocBySlug(slug: string) {
    return this.http.get(this.urlApi + `/qlhocvien-khoahoc/findid/${slug}`).pipe(
      map((data: any) => {
        this._khoahoc.next(data);
        return data;
      })
    );
  }
  getKhoahocById(id: string) {
    return this.http.get(this.urlApi + `/qlhocvien-khoahoc/findid/${id}`).pipe(
      map((data: any) => {
        this._khoahoc.next(data);
        return data;
      })
    );
  }
  postKhoahoc(data: any) {
    return this.khoahocs$.pipe(
      take(1),
      switchMap((khoahocs: any) =>
        this.http.post(this.urlApi + '/qlhocvien-khoahoc', data).pipe(
          map((khoahoc) => {
            if (khoahocs?.length > 0) {
              this._khoahocs.next([...khoahocs, khoahoc]);
            }
            return khoahoc;
          })
        )
      )
    );
  }
  updateKhoahoc(data: any) {
    return this.khoahocs$.pipe(
      take(1),
      switchMap((khoahocs: any) =>
        this.http.patch(this.urlApi + `/qlhocvien-khoahoc/${data.id}`, data).pipe(
          map((khoahoc) => {
            // Find the index of the updated tag
            const index = khoahocs.findIndex((item: any) => item.id === data.id);
            if (index != -1) {
              khoahocs[index] = data;
              this._khoahocs.next(khoahocs as any[]);

            } else {
              this._khoahocs.next([khoahoc]);

            }

            // Return the updated tag
            return khoahoc;
          })
        )
      )
    );
  }
  deleteKhoahoc(id: string) {
    return this.khoahocs$.pipe(
      take(1),
      switchMap((khoahocs: any) =>
        this.http.delete(this.urlApi + `/qlhocvien-khoahoc/${id}`).pipe(
          map((isDelete) => {
            const updateKhoahoc = khoahocs.filter((e: any) => e.id != id);

            this._khoahocs.next(updateKhoahoc);
            return isDelete;
          })
        )
      )
    );
  }
  private _danhmucs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  get danhmucs$(): Observable<any[] | null> {
    return this._danhmucs.asObservable();
  }
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get danhmuc$(): Observable<any | null> {
    return this._danhmuc.asObservable();
  }
  getDanhmucs() {
    return this.http.get(this.urlApi + '/qlhocvien-danhmuc').pipe(
      map((data: any) => {
        this._danhmucs.next(data);        
        return data;
      })
    );
  }
  getDanhmucbyid(id: string) {
    return this.http.get(this.urlApi + `/qlhocvien-danhmuc/findid/${id}`).pipe(
      map((data: any) => {
        this._danhmuc.next(data);
        return data;
      })
    );
  }
  postDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.post(this.urlApi + '/qlhocvien-danhmuc', data).pipe(
          map((danhmuc) => {
            if (danhmucs?.length > 0) {
              this._danhmucs.next([...danhmucs, danhmuc]);
            } else {
              this._danhmucs.next([danhmuc]);
            }
            return danhmuc;
          })
        )
      )
    );
  }
  updateDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.patch(this.urlApi + `/qlhocvien-danhmuc/${data.id}`, data).pipe(
          map((danhmuc) => {
            // Find the index of the updated tag
            const index = danhmucs.findIndex((item: any) => item.id === data.id);

            // Update the tag
            if (index != -1) {
              danhmucs[index] = data;

              this._danhmucs.next(danhmucs as any[]);
            } else {
              this._danhmucs.next([danhmuc]);


            }


            // Return the updated tag
            return danhmuc;
          })
        )
      )
    );
  }
  deleteDanhmuc(id: String) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.delete(this.urlApi + `/qlhocvien-danhmuc/${id}`).pipe(
          map((isDelete) => {
            const updateDanhmuc = danhmucs.filter((e: any) => e.id != id);

            this._danhmucs.next(updateDanhmuc);
            return isDelete;
          })
        )
      )
    );
  }
  DeleteuploadDriver(data: any): Observable<any> {
    console.log(data);
    return this.http.delete(this.urlApi + `/upload/${data.id}`,{ body: data }).pipe(
      map((res: any) => {
        if (res) {
          console.log(res);
          return res;
        }
      })
    );
  }
  uploadDriver(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}_${month}_${year}`;
    return this.http.post(this.urlApi + `/upload/server?folder=qlhocvien/${formattedDate}`, formData).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
