import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachhangComponent implements OnInit {
  New: any;
  NewPage: any = {};
  Users: any[] = []
  FilterUsers: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _UsersService: UsersService,
  ) {
  }
  ngOnInit(): void {
    this._UsersService.getUsers().subscribe((data)=>{
      console.log(data);
      this.FilterUsers = this.Users = data
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.FilterUsers = this.Users.filter((v) => v.loc.toLowerCase().includes(value))
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {

    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

}


