import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private urlApi = environment.APIURL;
  private _comments: BehaviorSubject<any[] | null> = new BehaviorSubject<
    any[] | null
  >(null);

  get comments$(): Observable<any[] | null> {
    return this._comments.asObservable();
  }
  private _comment: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);

  get comment$(): Observable<any | null> {
    return this._comment.asObservable();
  }
  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get(this.urlApi+'/hderma-comment').pipe(
      map((data: any) => {
        this._comments.next(data);
        return data;
      })
    );
  }
  getCommentDetail(slug: string) {
    return this.http.get(this.urlApi + `/hderma-comment/${slug}`).pipe(
      map((data: any) => {
        this._comment.next(data);
        return data;
      })
    );
  }
  postComment(data: any) {
    return this.comments$.pipe(
      take(1),
      switchMap((comments: any) =>
        this.http.post(this.urlApi +'/hderma-comment', data).pipe(
          map((comment) => {
            if (comments?.length > 0) {
              this._comments.next([...comments, comment]);
            }else{
              this._comments.next([ comment]);
              }
            return comment;
          })
        )
      )
    );
  }
  updateComment(data: any) {
    return this.comments$.pipe(
      take(1),
      switchMap((comments: any) =>
        this.http.patch(this.urlApi + `/hderma-comment/${data.id}`, data).pipe(
          map((comment) => {
            // Find the index of the updated tag
            const index = comments.findIndex((item: any) => item.id === data.id);

            // Update the tag
            if(index != -1){
              comments[index] = data;

              this._comments.next(comments as any[]);
            }else{
            this._comments.next([comment]);

            
            }
           

            // Return the updated tag
            return comment;
          })
        )
      )
    );
  }
  deleteComment(id: String) {
    return this.comments$.pipe(
      take(1),
      switchMap((comments: any) =>
        this.http.delete(this.urlApi + `/hderma-comment/${id}`).pipe(
          map((isDelete) => {
            const updateComment = comments.filter((e: any) => e.id != id);
            this._comments.next(updateComment);
            return isDelete;
          })
        )
      )
    );
  }
}
