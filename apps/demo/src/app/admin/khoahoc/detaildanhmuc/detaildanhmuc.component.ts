import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../../../shared/users.service';
import { GetImage } from '../../../shared/shared.utils';
import { KhoahocComponent } from '../khoahoc.component';
import { KhoahocService } from '../../../shared/khoahoc.service';

@Component({
  selector: 'tazagroup-detaildanhmuc',
  templateUrl: './detaildanhmuc.component.html',
  styleUrls: ['./detaildanhmuc.component.scss'],
})
export class DetaildanhmucComponent implements OnInit {
  Detail: any = {Title:'',Hinhanh:{spath:''}}
  images: File[] = [];
  Danhmucs: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _KhoahocComponent: KhoahocComponent,
    private _KhoahocService: KhoahocService
  ) { }
  ngOnInit(): void {
    this._KhoahocService.getDanhmucs().subscribe()
    this._KhoahocService.danhmucs$.subscribe(data => { if (data) { this.Danhmucs = data } })
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      console.log(id);
      if (id) {
        this._KhoahocComponent.drawer.open();
        this._KhoahocService.getDanhmucbyid(id).subscribe();
        this._KhoahocService.danhmuc$.subscribe((res) => {
          if (res) {
            console.log(res);
            this.Detail = res;            
          }
        });
      }else{
        this.CloseDrawer()
      }
    });
  }
  CloseDrawer() {
    this.router.navigate(['../../'], { relativeTo: this.route });
    this._KhoahocComponent.drawer.close();
  }
  onSelect(event: any) {
    this._KhoahocService.uploadDriver(event.addedFiles[0]).subscribe((data)=>
    {
      this.Detail.Hinhanh = data
      this._KhoahocService.updateDanhmuc(this.Detail).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    }
    )
  }
  onRemove(data:any) {
    this._KhoahocService.DeleteuploadDriver(data).subscribe(()=>
    {
      this.Detail.Hinhanh = {}
      this._KhoahocService.updateDanhmuc(this.Detail).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    })
   
  }
  UpdateDanhmuc(data: any) {
    this._KhoahocService.updateDanhmuc(data).subscribe((data) => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
  }
  GetImage(data:any)
  {

    return GetImage(data);
  }
}











