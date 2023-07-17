import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private urlApi = environment.APIURL;
  private _links: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _link: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get links$(): Observable<any[]> {
    return this._links.asObservable();
  }
  get link$(): Observable<any> {
    return this._link.asObservable();
  }
  constructor(private http: HttpClient) { }

  postLink(data: any) {
    return this.links$.pipe(
      take(1),
      switchMap((links: any) =>
        this.http.post(this.urlApi + '/hderma-link', data).pipe(
          map((link) => {
            if(links?.length > 0){
              this._links.next([link, ...links]);

            }else{
              this._links.next([link]);

            }
            return link;
          })
        )
      )
    );
  }
  getLink() {
    return this.http.get(this.urlApi + '/hderma-link').pipe(
      map((links) => {
        this._links.next(links);
        return links;
      })
    );
  }
  getLinkDetail(id: string) {
    return this.http.get(this.urlApi + `/hderma-link/${id}`).pipe(
      map((link) => {
        this._link.next(link);
        return link;
      })
    );
  }
  updateLink(data: any) {
    return this.links$.pipe(
      take(1),
      switchMap((links) =>
        this.http.patch(this.urlApi + `/hderma-link/${data.id}`, data).pipe(
          map((link) => {
            if (links?.length > 0) {
              let index = links.findIndex(x => x.id == data.id)
              links[index] = data
              this._links.next(links);
            } else {
              this._links.next([link]);
            }
            return link;
          })
        )
      )
    );
  }
  deleteLink(id: string) {
    return this.links$.pipe(
      take(1),
      switchMap((linkss: any) =>
        this.http.delete(this.urlApi + `/hderma-link/${id}`).pipe(
          map((isDelete) => {
            const updateLink = linkss.filter((e: any) => e.id != id);
            this._links.next(updateLink);
            return isDelete;
          })
        )
      )
    );
  }
}
