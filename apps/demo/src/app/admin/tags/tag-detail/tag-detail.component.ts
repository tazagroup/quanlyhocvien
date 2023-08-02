import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DanhmucService } from '../../../shared/danhmuc.service';
import { TagsService } from '../tags.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tazagroup-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
})
export class TagDetailComponent implements OnInit {
  tag: any= {
    Tieude: '',
    Loaitag: 0,
    Hinhanh:{spath:'',idDrive:''},
    Image: '',
    Ordering: 0,
  };
  theme: any;
  selectedFiles?: FileList;
  percentage = 0;
  selectTheme: any;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private _tagService: TagsService,
    private _danhmucService: DanhmucService,
    private _sanphamService: SanphamService,
    private _NotifierService: NotifierService
  ) {}
  nest = (items: any[], id = '', link = 'pid'): any => {
    if (items) {
      return items
        ?.filter((item) => item[link] == id)
        .map((item) => ({
          ...item,
          children: this.nest(items, item.id),
        }));
    }
  };
  onFileBrowse(event: any) {
    event.target as HTMLInputElement;
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this._danhmucService.uploadDriver(formData).subscribe((res) => {
      if (res) {
          this.tag.Image = res.idDrive;
      }
    });
  }


removeSimpleImage(value:any) {
    this.tag.Hinhanh = {};
}  
//app.ts
  Uploadfile(event: any, type: any,alt:any) {
    event.target as HTMLInputElement;
    const file: any = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file)
    formData.append('alt', alt)
    formData.append('idDrive', "0AKQL50NKsue5Uk9PVA");
    formData.append('parents', "['1_3htpPNQTxMi2sDQZes2WGWXPNwRxDYv']");
    this._sanphamService.uploadDriver(formData).subscribe((res) => {
      if (res) {        
        this.tag.Hinhanh=res     
        this._tagService.updateTag(this.tag).subscribe((res) => {
           if (res) {
            console.log(res);
            this._NotifierService.notify('success','Upload thành công');
          }
        }); 
      }
    });
  }
  onSubmit() {
    this._tagService.postTag(this.tag).subscribe();
  }
  updateTag() {
    this._tagService.updateTag(this.tag).subscribe((res) => {
      if (res) {
        alert('Cập nhật thành công');
      }
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
      if (this.id) {
        this._tagService.getTagDetail(this.id).subscribe();
        this._tagService.tag$.subscribe((res) => {
          if (res) {
            this.tag = res;
          }
        });
      }
    });
  }
}

