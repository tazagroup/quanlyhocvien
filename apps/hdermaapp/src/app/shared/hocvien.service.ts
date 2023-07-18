import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HocvienService {
  private urlApi = environment.APIURL;
  private _hocviens: BehaviorSubject<any[] | null> = new BehaviorSubject<
    any[] | null
  >(null);

  get hocviens$(): Observable<any[] | null> {
    return this._hocviens.asObservable();
  }
  private _hocvien: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);

  get hocvien$(): Observable<any | null> {
    return this._hocvien.asObservable();
  }
  constructor(private http: HttpClient) { }

  getHocviens() {
    return this.http.get(this.urlApi + '/qlhocvien-hocvien').pipe(
      map((data: any) => {
        this._hocviens.next(data);
        return data;
      })
    );
  }
  getHocvienBySlug(slug: string) {
    return this.http.get(this.urlApi + `/qlhocvien-hocvien/findid/${slug}`).pipe(
      map((data: any) => {
        this._hocvien.next(data);
        return data;
      })
    );
  }
  getHocvienById(id: string) {
    return this.http.get(this.urlApi + `/qlhocvien-hocvien/findid/${id}`).pipe(
      map((data: any) => {
        this._hocvien.next(data);
        return data;
      })
    );
  }
  postHocvien(data: any) {
    return this.hocviens$.pipe(
      take(1),
      switchMap((hocviens: any) =>
        this.http.post(this.urlApi + '/qlhocvien-hocvien', data).pipe(
          map((hocvien) => {
            if (hocviens?.length > 0) {
              this._hocviens.next([...hocviens, hocvien]);
            }
            return hocvien;
          })
        )
      )
    );
  }
  updateHocvien(data: any) {
    return this.hocviens$.pipe(
      take(1),
      switchMap((hocviens: any) =>
        this.http.patch(this.urlApi + `/qlhocvien-hocvien/${data.id}`, data).pipe(
          map((hocvien) => {
            // Find the index of the updated tag
            const index = hocviens.findIndex((item: any) => item.id === data.id);
            if (index != -1) {
              hocviens[index] = data;
              this._hocviens.next(hocviens as any[]);

            } else {
              this._hocviens.next([hocvien]);

            }

            // Return the updated tag
            return hocvien;
          })
        )
      )
    );
  }
  deleteHocvien(id: string) {
    return this.hocviens$.pipe(
      take(1),
      switchMap((hocviens: any) =>
        this.http.delete(this.urlApi + `/qlhocvien-hocvien/${id}`).pipe(
          map((isDelete) => {
            const updateHocvien = hocviens.filter((e: any) => e.id != id);

            this._hocviens.next(updateHocvien);
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
    return this.http.post(this.urlApi + `/upload/server?folder=hderma/${formattedDate}`, formData).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
