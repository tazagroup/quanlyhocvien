import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DanhmucService } from '../../../shared/danhmuc.service';

@Component({
  selector: 'tazagroup-danhmuc-detail',
  templateUrl: './danhmuc-detail.component.html',
  styleUrls: ['./danhmuc-detail.component.scss'],
})
export class DanhmucDetailComponent implements OnInit {
  danhmuc: any;
  theme: any;
  selectedFiles?: FileList;
  percentage = 0;
  selectTheme: any;
  slug!: string;
  DanhmucList!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _danhmucService: DanhmucService
  ) {
  }
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
  onSubmit() {
    this.DanhmucList.removeControl('id')
    this._danhmucService.postDanhmuc(this.DanhmucList.value).subscribe(res => {
      if (res) {
        alert('Tạo danh mục thành công')
      }
    })

    this.resetForm();
  }
  
  deleteDanhmuc() {
    this._danhmucService.deleteDanhmuc
    this.resetForm();
  }
  updateDanhmuc() {
    this._danhmucService.updateDanhmuc(this.DanhmucList.value).subscribe(res => {
      if (res) {
        alert('Cập nhật thành công')
      }
    })
    this.resetForm();
  }
  resetForm() {
    this.DanhmucList = this.fb.group({
      id:[''],
      Title: [''],
      Mota: [''],
      Type: [''],
      pid: [''],
      Slug: [''],
      Ordering: [0],
    });
  }


  ngOnInit(): void {
    this.resetForm();
    this.route.params.subscribe((paramsId) => {
      this.slug = paramsId['slug'];
      if (this.slug) {
        this._danhmucService.getDanhmucDetail(this.slug).subscribe()
        this._danhmucService.danhmuc$.subscribe(res=>{
          if(res){
            this.DanhmucList.get('id')?.setValue(res.id)
            this.DanhmucList.get('Title')?.setValue(res.Title)
            this.DanhmucList.get('Slug')?.setValue(res.Slug)
            this.DanhmucList.get('Ordering')?.setValue(res.Ordering)
            this.DanhmucList.get('pid')?.setValue(res.pid)
            this.DanhmucList.get('Type')?.setValue(res.Type)

          }
        })
      }
    })
  }
}
