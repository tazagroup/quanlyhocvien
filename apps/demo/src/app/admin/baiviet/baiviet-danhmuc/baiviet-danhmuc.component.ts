import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DanhmucService } from '../../../shared/danhmuc.service';
import { BaivietComponent } from '../baiviet.component';
import { UsersService } from '../../../shared/users.service';
import { BaivietService } from '../../../shared/baiviet.service';
import { GetImage } from '../../../shared/shared.utils';

@Component({
  selector: 'tazagroup-baiviet-danhmuc',
  templateUrl: './baiviet-danhmuc.component.html',
  styleUrls: ['./baiviet-danhmuc.component.scss'],
})
export class BaivietDanhmucComponent implements OnInit {
  Detail: any
  images: File[] = [];
  Danhmucs: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userservice: UsersService,
    private _DanhmucService: DanhmucService,
    private _BaivietService: BaivietService,
    private _NotifierService: NotifierService,
    private _BaivietComponent: BaivietComponent
  ) { }
  ngOnInit(): void {
    this._DanhmucService.getDanhmucs().subscribe()
    this._DanhmucService.danhmucs$.subscribe(data => { if (data) { this.Danhmucs = data } })
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      if (id) {
        this._BaivietComponent.drawer.open();
        this._DanhmucService.getDanhmucById(id).subscribe();
        this._DanhmucService.danhmuc$.subscribe((res) => {
          if (res) {
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
    this._BaivietComponent.drawer.close();
  }
  onSelect(event: any) {
    this._BaivietService.uploadDriver(event.addedFiles[0]).subscribe((data)=>
    {
      this.Detail.Hinhanh = data
      this._DanhmucService.updateDanhmuc(this.Detail).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    }
    )
  }
  onRemove(data:any) {
    this._BaivietService.DeleteuploadDriver(data).subscribe(()=>
    {
      this.Detail.Hinhanh = {}
      this._DanhmucService.updateDanhmuc(this.Detail).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    })  
  }
  UpdateDanhmuc(data: any) {
    this._DanhmucService.updateDanhmuc(data).subscribe((data) => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
  }
  GetImage(data:any)
  {
    return GetImage(data);
  }
}










