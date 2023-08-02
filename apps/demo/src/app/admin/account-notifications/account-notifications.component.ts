import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotifierService } from 'angular-notifier';
import { mergeMapTo } from 'rxjs';
import { AccountNotificationsService } from './account-notifications.service';
import { UsersService } from '../../shared/users.service';
declare var Notification: any;
@Component({
  selector: 'tazagroup-account-notifications',
  templateUrl: './account-notifications.component.html',
  styleUrls: ['./account-notifications.component.scss'],
})
export class AccountNotificationsComponent implements OnInit {
  token:any;
  User:any;
  notify:any[]=[];
  deferredPrompt: any;
  Notification:any;
  isPermission:boolean=false;
  constructor(
    private messaging: AngularFireMessaging,
    private _usersService: UsersService,
    private _notifierService: NotifierService,
    private _accountNotificationsService: AccountNotificationsService,
    ) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.deferredPrompt = event;
        console.log(this.deferredPrompt);
      });
    }

  ngOnInit(): void {
    this.Notification = Notification.permission;
    this._usersService.getProfile().subscribe();
    this._usersService.profile$.subscribe((data) => {
      if (data) {
        this.User = data;
        this._accountNotificationsService.getByidUserNotify(data.id).subscribe((data)=>
        {this.notify =data})
      }
    });
    if (Notification.permission === 'granted') {
      this.isPermission =  true
    } else if (Notification.permission === 'denied') {
      this.isPermission =  false
    } else {
      Notification.requestPermission()
      console.log('Chưa CHọn');
      }
  }
  showInstallPrompt() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
        } else {
         }
        this.deferredPrompt = null;
      });
    }
  } 
  ActivePermission()
  {
    if (Notification.permission === 'granted') {
      this.isPermission =  true
      this.ngOnInit
    } else if (Notification.permission === 'denied') {
      this.isPermission =  false
      this.ngOnInit
    } else {
      Notification.requestPermission()
      console.log('Chưa CHọn');
      }
  }
  ActiveNoti()
  {
    console.log(Notification.permission);
    if (Notification.permission === 'granted') {
      this.messaging.requestPermission.pipe(
        mergeMapTo(this.messaging.tokenChanges)
      )
      .subscribe((token:any) => {

        console.log(token);
        console.log(this.User.fcmToken.includes(token));
        if (!this.User.fcmToken.includes(token)) {
          this.User.fcmToken.push(token);
          this._usersService.updateOneUser(this.User).subscribe((data)=>
          {
            this._notifierService.notify("success","Đã Bật Thông Báo Trên Thiết Bị Của Bạn")
          });
        }
        else
        {
          this._notifierService.notify("success","Đã lưu các sự thay đổi của bạn")
        }
      });
    } else if (Notification.permission === 'denied') {
      console.log('Notification permission denied');
    } else {
      Notification.requestPermission()
      console.log('Chưa CHọn');
      }
    }

}
