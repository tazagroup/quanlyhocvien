import { Component, OnInit, ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotifierService } from 'angular-notifier';
import { TichdiemService } from '../../../admin/tichdiem/tichdiem.service';
import { forEach } from 'lodash-es';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HoahongService } from '../../../admin/cauhinh/hoahong/hoahong.service';
import { UsersService } from '../../../shared/users.service';
@Component({
  selector: 'tazagroup-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent implements OnInit {
  User:any;
  Custom:any;
  Linkgioithieu:any;
  ListRef:any[]=[]
  demo:any[] =[
    {id:1,name:'Test A'},
    {id:2,name:'Test B'},
    {id:3,name:'Test C'},
    {id:4,name:'Test D'}
  ]
  Hoahongs:any[]=[]
  displayedColumns: string[] = ['Hoten', 'SDT','Tongdiem'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private clipboard: Clipboard,
    private _usersService: UsersService,
    private _notifierService: NotifierService,
    private _tichdiemService: TichdiemService,
    private _hoahongService: HoahongService,
    ) {}   
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  ngOnInit(): void {
    this._usersService.getProfile().subscribe();
    this._usersService.profile$.subscribe((data)=>
      {
        if(data)
        {
        this.User = data;
        this.Linkgioithieu = `${window.location.origin}/dangky?ref=${data.id}`;
        this._tichdiemService.getCustomerByidUser(data.id).subscribe((data1)=>
        {
        this.Custom =  data1
        this.dataSource = new MatTableDataSource(data1.REF);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data1);
        })
        }
      }
    )
    this._hoahongService.getAll().subscribe();
    this._hoahongService.hoahongs$.subscribe((data)=>
    {
      if(data)
      {
          this.Hoahongs = data.sort((a, b) => a.hhcanhan - b.hhcanhan);
      }
   }
)
  }
  copyText(text: string) {
    this.clipboard.copy(text);
    this._notifierService.notify('success','Đã Sao Chép')
  }
}
