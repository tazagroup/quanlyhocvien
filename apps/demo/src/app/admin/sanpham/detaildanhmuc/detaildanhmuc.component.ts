import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../../../shared/users.service';
import { GetImage } from '../../../shared/shared.utils';
import { SanphamComponent } from '../sanpham.component';
import { SanphamService } from '../sanpham.service';

@Component({
  selector: 'tazagroup-detaildanhmuc',
  templateUrl: './detaildanhmuc.component.html',
  styleUrls: ['./detaildanhmuc.component.scss'],
})
export class DetaildanhmucComponent implements OnInit {
  Detail: any
  images: File[] = [];
  Danhmucs: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _SanphamComponent: SanphamComponent,
    private _SanphamService: SanphamService
  ) { }
  ngOnInit(): void {
    this._SanphamService.getDanhmucs().subscribe()
    this._SanphamService.danhmucs$.subscribe(data => { if (data) { this.Danhmucs = data } })
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      console.log(id);
      
      if (id) {
        this._SanphamComponent.drawer.open();
        this._SanphamService.getDMById(id).subscribe();
        this._SanphamService.danhmuc$.subscribe((res) => {
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
    this._SanphamComponent.drawer.close();
  }
  onSelect(event: any) {
    this._SanphamService.uploadDriver(event.addedFiles[0]).subscribe((data)=>
    {
      this.Detail.Hinhanh = data
      this._SanphamService.updateDanhmuc(this.Detail).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    }
    )
  }
  onRemove(data:any) {
    this._SanphamService.DeleteuploadDriver(data).subscribe(()=>
    {
      this.Detail.Hinhanh = {}
      this._SanphamService.updateDanhmuc(this.Detail).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    })
   
  }
  UpdateDanhmuc(data: any) {
    this._SanphamService.updateDanhmuc(data).subscribe((data) => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
  }
  GetImage(data:any)
  {
    return GetImage(data);
  }
}











