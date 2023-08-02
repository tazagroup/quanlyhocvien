import { Component, OnInit } from '@angular/core';
import { AccountNotificationsService } from '../../../admin/account-notifications/account-notifications.service';
import * as moment from 'moment';
import 'moment/locale/vi';
import { UsersService } from '../../../shared/users.service';
moment.locale('vi');
@Component({
  selector: 'tazagroup-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notify:any[]=[];

  constructor(
    private _accountNotificationsService:AccountNotificationsService,
    private _usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this._usersService.getProfile().subscribe();
    this._usersService.profile$.subscribe((data) => {
      if (data) {
        this._accountNotificationsService.getByidUserNotify(data.id).subscribe((data)=>
        {this.notify =data})
      }
    });
  }
  getTime(data:any)
  {
    return moment(data).fromNow();
  }
}
