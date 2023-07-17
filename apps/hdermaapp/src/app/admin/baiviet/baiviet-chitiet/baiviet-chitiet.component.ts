import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BaivietComponent } from '../baiviet.component';
import { BaivietService } from '../../../shared/baiviet.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { GetImage } from '../../../shared/shared.utils';
import { UsersService } from '../../../shared/users.service';
@Component({
  selector: 'tazagroup-baiviet-chitiet',
  templateUrl: './baiviet-chitiet.component.html',
  styleUrls: ['./baiviet-chitiet.component.scss'],
})
export class BaivietChitietComponent implements OnInit {
  Detail: any = {
    Title: '',
    Hinhanh:
    {
      hinhchinh: {spath: '' }
    }
  }
  APITINYMCE = environment.APITINYMCE;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _BaivietComponent: BaivietComponent,
    private _BaivietService: BaivietService

  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      if (id) {
        this._BaivietComponent.drawer.open();
        this._BaivietService.getBaivietById(id).subscribe();
        this._BaivietService.baiviet$.subscribe((res) => {
          if (res) {
            console.log(res);
            this.Detail = res;
          }
          else {
            this.CloseDrawer()
          }
        });
      }
    });
  }
  configTiny: EditorComponent['init'] = {
    menubar: false,
    toolbar_mode: 'sliding',
    branding: false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    height: "200",
    deprecation_warnings: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help'
    ],
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
    images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const promise = new Promise<string>((resolve, reject) => {
        this._BaivietService.uploadDriver(file).subscribe((res) => {
          if (res) {
            resolve(GetImage(res.spath));
          }
        });
      });
      return promise;
    },
  };
  configTiny1: EditorComponent['init'] = {
    menubar: false,
    toolbar_mode: 'sliding',
    branding: false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    deprecation_warnings: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help'
    ],
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media save',
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
    images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const promise = new Promise<string>((resolve, reject) => {
        this._BaivietService.uploadDriver(file).subscribe((res) => {
          if (res) {
            resolve(GetImage(res.spath));
          }
        });
      });
      return promise;
    },
  };
  CloseDrawer() {
    this.router.navigate(['../../'], { relativeTo: this.route });
    this._BaivietComponent.drawer.close();
  }
  Update(data: any) {
    this._BaivietService.updateBaiviet(data).subscribe((res) => {
      if (res) {
        this._NotifierService.notify("success", "Cập nhật thành công")
      }
    });
  }
  onSelect(event: any) {
    this._BaivietService.uploadDriver(event.addedFiles[0]).subscribe((data) => {
      this.Detail.Hinhanh.hinhchinh = data
      this._BaivietService.updateBaiviet(this.Detail).subscribe((res) => {
        if (res) {
          this._NotifierService.notify("success", "Cập nhật thành công")
        }
      });
    }
    )
  }
  onRemove(data: any) {
    this._BaivietService.DeleteuploadDriver(data).subscribe(() => {
      this.Detail.Hinhanh.hinhchinh = {}
      this._BaivietService.updateBaiviet(this.Detail).subscribe((res) => {
        if (res) {
          this._NotifierService.notify("success", "Cập nhật thành công")
        }
      });
    })

  }
  GetImage(data: any) {
    return GetImage(data);
  }
  CheckValue(data:any,field:any)
  {
     const result = data[field] !== null && typeof data[field] === 'object'&&Object.keys(data[field]).length!==0;   
    return result
  }
}










