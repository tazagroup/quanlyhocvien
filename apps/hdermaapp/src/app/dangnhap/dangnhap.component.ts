import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tazagroup-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.scss'],
})
export class DangnhapComponent implements OnInit {
  constructor() {}
  User:any={SDT:'0987654321',password:'123456'};
  ngOnInit(): void {}
  Dangnhap(data:any)
  {}
}
