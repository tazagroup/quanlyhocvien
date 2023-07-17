import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DanhmucProductService } from '../danhmuc-product.service';

@Component({
  selector: 'tazagroup-danhmuc-product-detail',
  templateUrl: './danhmuc-product-detail.component.html',
  styleUrls: ['./danhmuc-product-detail.component.scss'],
})
export class DanhmucProductDetailComponent implements OnInit {
  danhmuc: any;
  theme: any;
  selectedFiles?: FileList;
  percentage = 0;
  selectTheme: any;
  slug!: string;
  constructor(
    private route: ActivatedRoute,
    private _danhmucService: DanhmucProductService
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
  onSubmit() {
    this._danhmucService.postDanhmuc(this.danhmuc).subscribe();
  }
  updateDanhmuc() {
    this._danhmucService.updateDanhmuc(this.danhmuc).subscribe((res) => {
      if (res) {
        alert('Cập nhật thành công');
      }
    });
  }

  onFileBrowse(event: any, i: number) {
    event.target as HTMLInputElement;
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this._danhmucService.uploadDriver(formData).subscribe((res) => {
      if (res) {
        if (i == 99) {
          this.danhmuc.Image = res.idDrive;
          this._danhmucService.updateDanhmuc(this.danhmuc).subscribe((res) => {});
        }
      }
    });
  }

  ngOnInit(): void {
    this.danhmuc = {
      Title: '',
      pid: '',
      Mota: '',
      Slug: '',
      Image: '',
      Ordering: 0,
    };
    this.route.params.subscribe((paramsId) => {
      this.slug = paramsId['slug'];
      if (this.slug) {
        this._danhmucService.getDanhmucDetail(this.slug).subscribe();
        this._danhmucService.danhmuc$.subscribe((res) => {
          if (res) {
            this.danhmuc = res;
          }
        });
      }
    });
  }
}
