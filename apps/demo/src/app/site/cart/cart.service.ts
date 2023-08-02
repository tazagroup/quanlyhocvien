import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private isOpenCart = new BehaviorSubject<boolean>(false);
  get isOpenCart$() {
    return this.isOpenCart.asObservable();
  }
  toggleCart() {
    this.isOpenCart.next(!this.isOpenCart.value);
  }
  product!: any;
  arr: any = JSON.parse(localStorage.getItem('carts') || '[]');
  num: any = JSON.parse(localStorage.getItem('num') || '0');
  amount: any = JSON.parse(localStorage.getItem('amount') || '0');

  private _carts: BehaviorSubject<any | []> = new BehaviorSubject(null);
  private _num: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _amount: BehaviorSubject<any | null> = new BehaviorSubject(null);

  get carts$(): Observable<any> {
    return this._carts.asObservable();
  }
  get num$(): Observable<number> {
    return this._num.asObservable();
  }
  get amount$(): Observable<number> {
    return this._amount.asObservable();
  }
  pushCart(item: any): Observable<any> {
    let cartNum = 1;
    this.amount += item.GiaSale * cartNum;
    this.num += cartNum;
    let index = this.arr.findIndex((e: any) => e.id == item.id);
    if (index === -1) {
      item.cartNum = cartNum;
      this.arr.push(item);
      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
    } else {
      this.arr[index].cartNum += 1;
      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
    }
    localStorage.setItem('carts', JSON.stringify(this.arr));
    localStorage.setItem('num', JSON.stringify(this.num));
    localStorage.setItem('amount', JSON.stringify(this.amount));
    return of(item);
  }

  pushQuantityCart(item: any, quantity: any) {
    let index = this.arr.findIndex((e: any) => e.id === item.id);
    if (index === -1) {
      item.cartNum = quantity;
      this.amount += item.GiaSale * quantity;
      this.num += quantity;
      this.arr.push(item);
      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
      localStorage.setItem('carts', JSON.stringify(this.arr));
      localStorage.setItem('num', JSON.stringify(this.num));
      localStorage.setItem('amount', JSON.stringify(this.amount));
    } else {
      if(item.idGioithieu){
        this.arr[index].idGioithieu = item.idGioithieu
      }
      this.num -= this.arr[index].cartNum;
      this.amount -= this.arr[index].GiaSale * this.arr[index].cartNum;
      this.arr[index].cartNum = quantity;
      this.num += quantity;
      this.amount += item.GiaSale * quantity;
      this._carts.next(this.arr);
      this._num.next(this.num);
      this._amount.next(this.amount);
      localStorage.setItem('carts', JSON.stringify(this.arr));
      localStorage.setItem('num', JSON.stringify(this.num));
      localStorage.setItem('amount', JSON.stringify(this.amount));
    }
    return of(item);
  }
  getCart(): Observable<any> {
    this._carts.next(this.arr);
    this._num.next(this.num);
    this._amount.next(this.amount);
    return of(this.arr);
  }
  removeCart(item: any) {
    let index = this.arr.findIndex((x: any) => x.id == item.id);
    let temp = this.arr[index].cartNum;
    this.num -= temp;
    this.arr[index].cartNum -= this.arr[index].cartNum;
    this.amount -= this.arr[index].GiaSale * temp;
    if (this.arr[index].cartNum === 0) {
      this.arr = this.arr.filter((x: any) => x.id != item.id);
      this._carts.next(this.arr);
      localStorage.setItem('carts', JSON.stringify(this.arr));
    }
    this._num.next(this.num);
    this._amount.next(this.amount);
    localStorage.setItem('num', JSON.stringify(this.num));
    localStorage.setItem('amount', JSON.stringify(this.amount));
    return of(this.arr);
  }
  resetCart() {
    this.arr = [];
    this._carts.next(this.arr);
    this._num.next(0);
    this._amount.next(0);
    localStorage.setItem('carts', JSON.stringify(this.arr));
    localStorage.setItem('num', JSON.stringify(0));
    localStorage.setItem('amount', JSON.stringify(0));
    return of(this.arr);
  }
}
