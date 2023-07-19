import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private urlApi = environment.APIURL;
  private _uploads: BehaviorSubject<any[] | null> = new BehaviorSubject<any[]|null>(null);
  private _upload: BehaviorSubject<any | null> = new BehaviorSubject<any|null>(null);
  get uploads$(): Observable<any[] | null> {
    return this._uploads.asObservable();
  }
  get upload$(): Observable<any | null> {
    return this._upload.asObservable();
  }
  constructor(private http: HttpClient) { }
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
  getUploads() {
    return this.http.get(this.urlApi + '/hderma-upload').pipe(
      map((data: any) => {
        this._uploads.next(data);
        return data;
      })
    );
  }
  getUploadBySlug(slug: string) {
    return this.http.post(this.urlApi + `/hderma-upload/`,{slug}).pipe(
      map((data: any) => {
        this._upload.next(data);
        return data;
      })
    );
  }
  getUploadById(id: string) {
    return this.http.post(this.urlApi + `/hderma-upload/findid`,{id}).pipe(
      map((data: any) => {
        this._upload.next(data);
        return data;
      })
    );
  }
  postUpload(data: any) {
    return this.uploads$.pipe(
      take(1),
      switchMap((uploads: any) =>
        this.http.post(this.urlApi + '/hderma-upload', data).pipe(
          map((upload) => {
            if (uploads?.length > 0) {
              this._uploads.next([...uploads, upload]);
            }
            return upload;
          })
        )
      )
    );
  }
  updateUpload(data: any) {
    return this.uploads$.pipe(
      take(1),
      switchMap((uploads: any) =>
        this.http.patch(this.urlApi + `/hderma-upload/${data.id}`, data).pipe(
          map((upload) => {
            const index = uploads.findIndex((item: any) => item.id === data.id);
            if (index != -1) {
              uploads[index] = data;
              this._uploads.next(uploads as any[]);
            } else {
              this._uploads.next([upload]);
            }
            return upload;
          })
        )
      )
    );
  }
  deleteUpload(id: string) {
    return this.uploads$.pipe(
      take(1),
      switchMap((uploads: any) =>
        this.http.delete(this.urlApi + `/hderma-upload/${id}`).pipe(
          map((isDelete) => {
            const updateUpload = uploads.filter((e: any) => e.id != id);

            this._uploads.next(updateUpload);
            return isDelete;
          })
        )
      )
    );
  }
}