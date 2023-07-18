import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { KhoahocComponent } from '../khoahoc.component';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { GetImage } from '../../../shared/shared.utils';
import { UsersService } from '../../../shared/users.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { KhoahocService } from '../../../shared/khoahoc.service';
@Component({
  selector: 'tazagroup-detailkhoahoc',
  templateUrl: './detailkhoahoc.component.html',
  styleUrls: ['./detailkhoahoc.component.scss'],
})
export class DetailkhoahocComponent implements OnInit {
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
    private _KhoahocComponent: KhoahocComponent,
    private _KhoahocService: KhoahocService
    
  ) {}
  ngOnInit(): void {
    this._KhoahocService.getDanhmucs().subscribe(data=> this.Danhmuc= data)
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      if (id) {
        this._KhoahocComponent.drawer.open();
        this._KhoahocService.getKhoahocById(id).subscribe();
        this._KhoahocService.khoahoc$.subscribe((res:any) => {
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
            this._KhoahocService.uploadDriver(formData).subscribe((res) => {
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
        this._KhoahocService.uploadDriver(formData).subscribe((res) => {
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
    this.router.navigate(['../../'], { relativeTo: this.route });
    this._KhoahocComponent.drawer.close();
  }
  Update(data:any)
  {
    this._KhoahocService.updateKhoahoc(data).subscribe((res) => {
      if (res) {
        this._NotifierService.notify("success","Cập nhật thành công")
      }
    });
  }
  onSelect(event: any,field:any) {
    console.log(event,field);   
    this._KhoahocService.uploadDriver(event.addedFiles[0]).subscribe((data)=>
    {
      this.Detail.Hinhanh[field] = data
      console.log(this.Detail.Hinhanh);
      
      this._KhoahocService.updateKhoahoc(this.Detail).subscribe((res) => {
        if (res) {
          this._NotifierService.notify("success","Cập nhật thành công")
        }
      });
      }
    )
  }
  onRemove(data:any,field:any) {
    this._KhoahocService.DeleteuploadDriver(data[field]).subscribe(()=>
    {
      this.Detail.Hinhanh[field] = {}
      this._KhoahocService.updateKhoahoc(this.Detail).subscribe((res) => {
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
    if(data[field])
    {
      return ''
    }
    else {return GetImage(data[field].spath)};
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