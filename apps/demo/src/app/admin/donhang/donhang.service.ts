import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonhangService {
  // private urlApi = 'http://localhost:3000/hderma-donhang';
  private urlApi = environment.APIURL;
  private _donhang: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _donhang1: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _donhangchitiet: BehaviorSubject<any | null> = new BehaviorSubject(
    null
  );

  get donhang$(): Observable<any[]> {
    return this._donhang.asObservable();
  }
  get donhang1$(): Observable<any[]> {
    return this._donhang1.asObservable();
  }
  get donhangchitiet$(): Observable<any[]> {
    return this._donhangchitiet.asObservable();
  }
  constructor(private http: HttpClient) {}
  createDiem(data: any): Observable<any> {
       return this.http.post(this.urlApi+ `/hderma-customer-diem`, data).pipe(
        map((customer) => {
              console.log(customer);
            return customer;
          })
       )
  }
  postDonhang(data: any) {
    return this.donhang$.pipe(
      take(1),
      switchMap((donhangs) =>
        this.http.post(this.urlApi, data).pipe(
          map((donhang) => {
            this._donhang.next([donhang, ...donhangs]);
            return donhang;
          })
        )
      )
    );
  }
  getDonhang() {
    return this.http.get(this.urlApi + `/hderma-donhang`).pipe(
      map((donhangs) => {
        console.log(donhangs);
        this._donhang.next(donhangs);
        return donhangs;
      })
    );
  }
  getDonhangbyMDH(madonhang:any) {
    return this.http.get(this.urlApi + `/hderma-donhang/madonhang/${madonhang}`).pipe(
      map((donhang) => {
        return donhang;
      })
    );
  }
  getOneDonhang(id:any) {
    return this.http.get(this.urlApi + `/hderma-donhang/${id}`).pipe(
      map((donhang1) => {
        this._donhang1.next(donhang1);
        return donhang1;
      })
    );
  }
  getDonhangByidKH(idKH:any) {
    return this.http.get(this.urlApi + `/hderma-donhang/user/${idKH}`).pipe(
      map((donhangs) => {
        console.log(donhangs);
        this._donhang.next(donhangs);
        return donhangs;
      })
    );
  }
  getAllDonhangChitiet(id: string): Observable<any> {
    return this.http.get<any>(this.urlApi + `/hderma-donhangchitiet`).pipe(
      map((donhangchitiet) => {
        this._donhangchitiet.next(donhangchitiet);

        return donhangchitiet;
      }),
      switchMap((donhangchitiet) => {
        if (!donhangchitiet) {
          return throwError('Could not found course with id of ' + id + '!');
        }

        return of(donhangchitiet);
      })
    );
  }
  getDonhangchitiet(id: string): Observable<any> {
    return this.http.get<any>(this.urlApi + `/${id}`).pipe(
      map((donhangchitiet) => {
        this._donhangchitiet.next(donhangchitiet);

        return donhangchitiet;
      }),
      switchMap((donhangchitiet) => {
        if (!donhangchitiet) {
          return throwError('Could not found course with id of ' + id + '!');
        }

        return of(donhangchitiet);
      })
    );
  }
  deleteDonhang(id: string) {
    return this.donhang$.pipe(
      take(1),
      switchMap((donhangs) =>
        this.http.delete(this.urlApi + `/hderma-donhang/${id}`).pipe(
          map((isDelete) => {
            const updatedonhang = donhangs.filter((e) => e.id != id);
            this._donhang.next(updatedonhang);
            return isDelete;
          })
        )
      )
    );
  }
  updateDonhang(data: any) {
    return this.donhang$.pipe(
      take(1),
      switchMap((donhangs) =>
        this.http.patch(this.urlApi + `/hderma-donhang/${data.id}`, data).pipe(
          map((upadatedonhang) => {
            console.log(upadatedonhang);
            
            // Find the index of the updated tag
            const index = donhangs.findIndex((item) => item.id === data.id);
            // Update the tag
            donhangs[index] = data;
            // Update the tags
            this._donhang.next(donhangs);

            // Return the updated tag
            return upadatedonhang;
          })
        )
      )
    );
  }
}
