import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/demo/src/environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private urlApi = environment.APIURL;
  private _contacts: BehaviorSubject<any[] | null> = new BehaviorSubject<
    any[] | null
  >(null);

  get contacts$(): Observable<any[] | null> {
    return this._contacts.asObservable();
  }
  private _contact: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);

  get contact$(): Observable<any | null> {
    return this._contact.asObservable();
  }
  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get(this.urlApi+'/hderma-contact').pipe(
      map((data: any) => {
        this._contacts.next(data);
        return data;
      })
    );
  }
  getContactDetail(id: string) {
    return this.http.get(this.urlApi + `/hderma-contact/${id}`).pipe(
      map((data: any) => {
        this._contact.next(data);
        return data;
      })
    );
  }
  postContact(data: any) {
    return this.contacts$.pipe(
      take(1),
      switchMap((contacts: any) =>
        this.http.post(this.urlApi +'/hderma-contact', data).pipe(
          map((contact) => {
            if (contacts?.length > 0) {
              this._contacts.next([...contacts, contact]);
            }else{
              this._contacts.next([ contact]);
              }
            return contact;
          })
        )
      )
    );
  }
  updateContact(data: any) {
    return this.contacts$.pipe(
      take(1),
      switchMap((contacts: any) =>
        this.http.patch(this.urlApi + `/hderma-contact/${data.id}`, data).pipe(
          map((contact) => {
            // Find the index of the updated tag
            const index = contacts.findIndex((item: any) => item.id === data.id);

            // Update the tag
            if(index != -1){
              contacts[index] = data;

              this._contacts.next(contacts as any[]);
            }else{
            this._contacts.next([contact]);

            
            }
           

            // Return the updated tag
            return contact;
          })
        )
      )
    );
  }
  deleteContact(id: String) {
    return this.contacts$.pipe(
      take(1),
      switchMap((contacts: any) =>
        this.http.delete(this.urlApi + `/hderma-contact/${id}`).pipe(
          map((isDelete) => {
            const updateContact = contacts.filter((e: any) => e.id != id);

            this._contacts.next(updateContact);
            return isDelete;
          })
        )
      )
    );
  }
  
}
