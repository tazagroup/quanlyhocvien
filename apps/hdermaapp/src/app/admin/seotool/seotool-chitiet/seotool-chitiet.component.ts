import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SeotoolComponent } from '../seotool.component';
import { SeotoolService } from '../../../shared/seotools.service';
import { UsersService } from '../../../shared/users.service';
@Component({
  selector: 'app-seotool-chitiet',
  templateUrl: './seotool-chitiet.component.html',
  styleUrls: ['./seotool-chitiet.component.css']
})
export class SeotoolChitietComponent implements OnInit {
  Detail: any={Meta:{}}
Meta:any[]=[
  {id:1,Title:'title'},
  {id:2,Title:'description'},
  {id:3,Title:'keywords'},
  {id:4,Title:'robots'},
  {id:5,Title:'url'},
  {id:6,Title:'type'},
  {id:7,Title:'image'},
]
 constructor(
    private route: ActivatedRoute,
    private _userservice: UsersService,
    private _SeotoolService: SeotoolService,
    private _NotifierService: NotifierService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      if (id) {
        this._SeotoolService.getSeotoolById(id).subscribe();
        this._SeotoolService.seotool$.subscribe((res) => {
          if (res) {
            this.Detail = res;
          }
        });
      }
    });
  }
  Update(data:any)
  {
    this._SeotoolService.updateSeotool(data).subscribe(()=>this._NotifierService.notify('success','Cập Nhật Thành công'))
  }
}











