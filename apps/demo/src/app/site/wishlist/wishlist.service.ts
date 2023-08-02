import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';

import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) { }
  private urlApi = environment.APIURL;

  private _wishlists: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _wishlist: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get wishlists$(): Observable<any[]> {
    return this._wishlists.asObservable();
  }
  get wishlist$(): Observable<any> {
    return this._wishlist.asObservable();
  }


  postWishlist(data: any) {
    return this.wishlists$.pipe(
      take(1),
      switchMap((wishlists: any) =>
        this.http.post(this.urlApi + '/hderma-wishlist', data).pipe(
          map((wishlist) => {
            if (wishlists?.length > 0) {
              this._wishlists.next([...wishlists, wishlist]);
            } else {
              this._wishlists.next([wishlist]);
            }
            return wishlist;
          })
        )
      )
    );
  }
  getWishlistDetail(id: string) {
    return this.http.get(this.urlApi + `/hderma-wishlist/${id}`).pipe(
      map((data: any) => {
        this._wishlist.next(data);
        return data;
      })
    );
  }
  getWishlist() {
    return this.http.get(this.urlApi + `/hderma-wishlist`).pipe(
      map((wishlists) => {
        this._wishlists.next(wishlists);
        return wishlists;
      })
    );
  }
  deleteWishlist() {
    this._wishlist.next(null);
    return of(true)
  }
  updateWishlist(data: any) {
    this._wishlist.next(data);
    return this.http.patch(this.urlApi + `/hderma-wishlist/${data.id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}