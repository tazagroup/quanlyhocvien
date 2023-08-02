import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private urlApi = environment.APIURL;
  private _tags: BehaviorSubject<any[] | null> = new BehaviorSubject<
    any[] | null
  >(null);

  get tags$(): Observable<any[] | null> {
    return this._tags.asObservable();
  }
  private _tag: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);

  get tag$(): Observable<any | null> {
    return this._tag.asObservable();
  }
  private _tagsfilter: BehaviorSubject<any[] | null> = new BehaviorSubject<
    any | null
  >(null);

  get tagfilter$(): Observable<any[] | null> {
    return this._tagsfilter.asObservable();
  }
  constructor(private http: HttpClient) { }

  getTags() {
    return this.http.get(this.urlApi + '/hderma-tags').pipe(
      map((data: any) => {
        this._tags.next(data);
        return data;
      })
    );
  }
  getTagDetail(id: string) {
    return this.http.get(this.urlApi + `/hderma-tags/${id}`).pipe(
      map((data: any) => {
        this._tag.next(data);
        return data;
      })
    );
  }
  postTag(data: any) {
    return this.tags$.pipe(
      take(1),
      switchMap((tags: any) =>
        this.http.post(this.urlApi + '/hderma-tags', data).pipe(
          map((tag) => {
            if (tags?.length > 0) {
              this._tags.next([...tags, tag]);
            } else {
              this._tags.next([tag]);
            }
            return tag;
          })
        )
      )
    );
  }
  updateTag(data: any) {
     return this.http.patch<any>(this.urlApi + `/hderma-tags/${data.id}`, data).pipe(
      map((tag) => {
        console.log(tag);
        
        this._tag.next(tag);
        return tag;
      })
    )
  }
  deleteTag(id: String) {
    return this.tags$.pipe(
      take(1),
      switchMap((tags: any) =>
        this.http.delete(this.urlApi + `/hderma-tags/${id}`).pipe(
          map((isDelete) => {
            const updateTag = tags.filter((e: any) => e.id != id);
            this._tags.next(updateTag);
            return isDelete;
          })
        )
      )
    );
  }
  getTagsFilter(data: any) {
    return this.tagfilter$.pipe(
      take(1),
      switchMap((tags: any) => {
        if (tags?.length > 0) {
          let item = tags.find((x: any) => x.id == data.id)
          if (item) {
            let temp = tags.filter((x: any) => x.id != item.id)
            this._tagsfilter.next(temp);
          } else {
            this._tagsfilter.next([...tags, data]);
          }
          return of(data)
        } else {
          this._tagsfilter.next([data]);
        }
        return of(data)
      }
      )
    );
  }

}
