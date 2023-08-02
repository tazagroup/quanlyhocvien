import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from 'apps/demo/src/environments/environment';
import { GetImage } from '../../../shared/shared.utils';
import { UsersService } from '../../../shared/users.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { KhachhangComponent } from '../khachhang.component';
import { KhachhangService } from '../../../shared/khachhang.service';
import { UploadService } from '../../../shared/upload.service';
@Component({
  selector: 'app-khachhang-chitiet',
  templateUrl: './khachhang-chitiet.component.html',
  styleUrls: ['./khachhang-chitiet.component.css']
})
export class KhachhangChitietComponent implements OnInit {
  Detail: any={
    Title:'',
    Danhmuc:{idDM:0},
    Hinhanh:{
        ContentImage: {spath: ""},
        hinhchinh: {spath: ""},
        hinh1:{spath: ""},
        hinh2:{spath: ""},
        hinh3:{spath: ""},
        hinh4:{spath: ""},
        hinh5:{spath: ""}
       }
}
  Danhmuc:any[] =[]
  APITINYMCE= environment.APITINYMCE;
  public activeTabIndex: number | undefined = undefined;
  @ViewChild('tabGroup', { static: false }) public tabGroup: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _KhachhangComponent: KhachhangComponent,
    private _KhachhangService: KhachhangService,
    private _UploadService: UploadService
    
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      if (id) {
        this._KhachhangComponent.drawer.open();
        this._KhachhangService.getByid(id).subscribe();
        this._KhachhangService.khachhang$.subscribe((res:any) => {
          if (res) {
            console.log(res);    
            this.Detail = res;
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
    height:"200",
    deprecation_warnings: false,
    plugins: [
      'advlist','autolink','lists','link','image','charmap','preview','anchor',
      'searchreplace','visualblocks','code','fullscreen',
      'insertdatetime','media','table','code','help'
    ],
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
        images_upload_handler: (blobInfo: any) => {
          const file = blobInfo.blob();
          const formData = new FormData();
          formData.append('file', file);
          const filePath = `${Date.now()}-${blobInfo.filename()}`;
          const promise = new Promise<string>((resolve, reject) => {
            this._UploadService.uploadDriver(formData).subscribe((res) => {
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
      'advlist','autolink','lists','link','image','charmap','preview','anchor',
      'searchreplace','visualblocks','code','fullscreen',
      'insertdatetime','media','table','code','help'
    ],
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media save',
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
     images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append('file', file);
      const filePath = `${Date.now()}-${blobInfo.filename()}`;
      const promise = new Promise<string>((resolve, reject) => {
        this._UploadService.uploadDriver(formData).subscribe((res) => {
          if (res) {
                resolve(GetImage(res.spath));
          }
        });
      });
      return promise;
    }, 
  };
  CloseDrawer()
  {
    this._KhachhangComponent.drawer.close();
  }
  Update(data:any)
  {
    this._KhachhangService.updateKhachhang(data).subscribe((res) => {
      if (res) {
        this._NotifierService.notify("success","Cập nhật thành công")
      }
    });
  }
  onSelect(event: any,field:any) {
    console.log(event,field);   
    this._UploadService.uploadDriver(event.addedFiles[0]).subscribe((data)=>
    {
      this.Detail.Hinhanh[field] = data
      this._KhachhangService.updateKhachhang(this.Detail).subscribe((res) => {
        if (res) {
          this._NotifierService.notify("success","Cập nhật thành công")
        }
      });
      }
    )
  }
  onRemove(data:any,field:any) {
    this._UploadService.DeleteuploadDriver(data[field]).subscribe(()=>
    {
      this.Detail.Hinhanh[field] = {}
      this._KhachhangService.updateKhachhang(this.Detail).subscribe((res) => {
        if (res) {
          this._NotifierService.notify("success","Cập nhật thành công")
        }
      });
    }) 
  }
  GetImage(data:any)
  {
    return GetImage(data);
  }
  GetImageUrl(data:any,field:any)
  {
    if(data[field]&&data[field].spath)
    {
      return GetImage(data[field].spath)
    }
    else {
      return ''
    };
  }
  public handleTabChange(e: MatTabChangeEvent) {
    this.activeTabIndex = e.index;
  }

  public ngAfterViewInit() {
   // this.activeTabIndex = this.tabGroup.selectedIndex;
  }
  CheckValue(data:any,field:any)
  {      
    const result = data[field].spath !='' && data[field].spath !== null && typeof data[field].spath === 'object'&&Object.keys(data[field]).length!==0;   
    return result
  }
}









