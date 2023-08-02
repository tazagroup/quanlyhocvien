import { Component, Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotifierService } from 'angular-notifier';
declare var Notification: any;
@Component({
  selector: 'tazagroup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Hderma - Công ty TNHH Dược Mỹ phẩm';
  constructor(
  private swUpdate: SwUpdate,
  private _notifierService: NotifierService
    ) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((data) => {    
        if (confirm('Có Phiên Bản Mới. Bạn Có Muốn Cập Nhật Không')) {
          window.location.reload();
        }
      });
    }
  }
  ngOnInit(): void {
   // console.log(this._notifierService.notify('success','Cập nhật thành công'));
  }
}
