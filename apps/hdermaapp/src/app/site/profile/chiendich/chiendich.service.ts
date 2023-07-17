import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable()
export class CustomerchiendichService {
    constructor(private _httpClient: HttpClient) { }
    private APIURL = environment.APIURL;
    private _customerchiendich: BehaviorSubject<any | any> = new BehaviorSubject(null);
    private _customerchiendichs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
    get customerchiendichs$(): Observable<any[]> {
        return this._customerchiendichs.asObservable();
    }
    get customerchiendich$(): Observable<any> {
        return this._customerchiendich.asObservable();
    }
    getByidUser(id: any): Observable<any> {
        return this._httpClient.get<any>(`${this.APIURL}/hderma-customer-chiendich/user/${id}`).pipe(
            tap((response: any) => {
                return response;
              //  this._customerchiendich.next(response);
            })
        );
    }
    getByidCustomerchiendich(id: any): Observable<any> {
        return this._httpClient.get<any>(`${this.APIURL}/hderma-customer-chiendich/${id}`).pipe(
            tap((response: any) => {
                this._customerchiendich.next(response);
                console.log(response);
            })
        );
    }
    getAllCustomerchiendich(): Observable<any[]> {
        return this._httpClient.get<any[]>(`${this.APIURL}/hderma-customer-chiendich`).pipe(
            tap((response: any[]) => {
                this._customerchiendichs.next(response);
            })
        );
    }
    createCustomerchiendich(dulieu: any): Observable<any> {
          return this._httpClient.post<any>(`${this.APIURL}/hderma-customer-chiendich`, dulieu).pipe(
                map((res: any) => {
                    console.log(res);
                    return res[1];
                })
        );
    }
    updateCustomerchiendich(dulieu: any): Observable<any> {
        return this.customerchiendichs$.pipe(
            take(1),
            switchMap((customerchiendichs: any) =>
                this._httpClient.patch(`${this.APIURL}/hderma-customer-chiendich/${dulieu.id}`, dulieu).pipe(
                    map((customerchiendich: any) => {
                        const index = customerchiendichs.findIndex((item: any) => item.id === customerchiendich.id);
                        customerchiendichs[index] = customerchiendich;
                        this._customerchiendichs.next(customerchiendichs);
                        return customerchiendich;
                    })
                )
            ))
    }
    deleteCustomerchiendich(dulieu: any) {
        return this.customerchiendichs$.pipe(
            take(1),
            switchMap((customerchiendichs: any) =>
                this._httpClient.delete(`${this.APIURL}/hderma-customer-chiendich/${dulieu.id}`).pipe(
                    map((isDelete) => {
                        const updatePhanquyens = customerchiendichs.filter((e: any) => e.id != dulieu.id);
                        this._customerchiendichs.next(updatePhanquyens);
                        return isDelete;
                    })
                )
            )
        );
    }
}