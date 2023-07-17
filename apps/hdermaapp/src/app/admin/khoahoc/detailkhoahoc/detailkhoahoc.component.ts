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
  Detail: any={Title:'',Hinhanh:{
    ContentImage: {spath: ""},
    hinhchinh: {spath: ""},
    hinh1:{spath: ""},
    hinh2:{spath: ""},
    hinh3:{spath: ""},
    hinh4:{spath: ""},
    hinh5:{spath: ""}
  }}
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
          else{
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
  public handleTabChange(e: MatTabChangeEvent) {
    this.activeTabIndex = e.index;
  }

  public ngAfterViewInit() {
    this.activeTabIndex = this.tabGroup.selectedIndex;
  }
  CheckValue(data:any,field:any)
  {
     const result = data[field] !== null && typeof data[field] === 'object'&&Object.keys(data[field]).length!==0;   
    return result
  }
}













// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatTabChangeEvent } from '@angular/material/tabs';
// import { DomSanitizer } from '@angular/platform-browser';
// import { ActivatedRoute, Router } from '@angular/router';
// import { environment } from 'apps/hdermaapp/src/environments/environment';
// import { EditorComponent } from '@tinymce/tinymce-angular';
// import { NotifierService } from 'angular-notifier';
// import { DanhmucProductService } from '../../danhmuc-product/danhmuc-product.service';
// import { TagsService } from '../../tags/tags.service';
// import { KhoahocService } from '../khoahoc.service';
// @Component({
//   selector: 'tazagroup-detailkhoahoc',
//   templateUrl: './detailkhoahoc.component.html',
//   styleUrls: ['./detailkhoahoc.component.scss'],
// })
// export class DetailkhoahocComponent implements OnInit {
//   APITINYMCE!: string;
//   product: any={};
//   selectedFiles?: FileList;
//   slug!: string;
//   danhmucs: any = [];
//   tags!: any[];
//   tinhtrangdas!: any[];
//   loaikhoahocs!: any[];
//   ListImage: any = {};
//   tagsTinhtrangData = [];
//   tagsLoaiSpData = [];
//   configTiny: EditorComponent['init'] = {
//     plugins: 'lists link image table code help wordcount media save',
//     toolbar:
//       'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image media save',
//     image_advtab: false,
//     image_description: true,
//     image_dimensions: false,
//     block_unsupported_drop: true,
//     images_reuse_filename: true,
//     paste_data_images: false,
//     height: '300px',

//     images_upload_handler: (blobInfo: any) => {
//       const file = blobInfo.blob();
//       const formData = new FormData();
//       formData.append('file', file);
//       const promise = new Promise<string>((resolve, reject) => {
//         this._khoahocService.uploadDriver(formData).subscribe((res) => {
//           console.log(res);
//           if (res) {
//             resolve(`https://drive.google.com/uc?id=${res.idDrive}`);
//           }
//         });
//       });
//       return promise;
//     },
//     entity_encoding: 'raw',
//     file_picker_types: 'image media',
//     file_picker_callback: function (cb, value, meta: any) {
//       if (meta.filetype == 'media') {
//         const input: any = document.createElement('input');
//         input.setAttribute('type', 'file');
//         input.setAttribute('accept', 'image/*');
//         input.setAttribute('accept', 'media/*');

//         input.onchange = function () {
//           const file = input.files[0];
//           const reader = new FileReader();
//           this.file = file;
//           const formData = new FormData();
//           formData.append('file', file);

//           const upload = function () {
//             fetch(environment.APIURL + '/upload/file', {
//               method: 'POST',
//               body: formData,
//             })
//               .then((response: any) => {
//                 return response.json();
//               })
//               .then((success) => {
//                 return cb(`https://drive.google.com/uc?id=${success.idDrive}`);
//               })
//               .catch((error) => console.log(error));
//           };
//           upload();
//           // reader.onload = function () {
//           //   const id = 'blobid' + new Date().getTime();
//           //   const blobCache = tinymce.activeEditor.editorUpload.blobCache;
//           //   const base64 = (<string>reader.result).split(',')[1];
//           //   const blobInfo = blobCache.create(id, file, base64);
//           //   blobCache.add(blobInfo);
//           // };
//           reader.readAsDataURL(file);
//         };
//         // cb('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
//         input.click();
//       }
//     },
//     // init_instance_callback: function (editor) {},
//   };
//   public activeTabIndex: number | undefined = undefined;
//   @ViewChild('tabGroup', { static: false }) public tabGroup: any;
//   constructor(
//     private _khoahocService: KhoahocService,
//     private route: ActivatedRoute,
//     private sanitizer: DomSanitizer,
//     private _tagService: TagsService,
//     private _notifierService: NotifierService,
//     private _router: Router
//   ) {
//     this.APITINYMCE = environment.APITINYMCE;
//   }

//   ngOnInit(): void {
//     this._khoahocService.getDanhmucs().subscribe();
//     this._khoahocService.danhmucs$.subscribe((res) => {
//       if (res) {
//         this.danhmucs = res;
//       }
//     });
//     this._tagService.getTags().subscribe();
//     this._tagService.tags$.subscribe((res) => {
//       if (res) {
//         this.tags = res;
//         this.tinhtrangdas = res.filter((x) => x.Loaitag == 0);
//         this.loaikhoahocs = res.filter((x) => x.Loaitag == 1);
//       }
//     });
//     this.ListImage = this.product.ListImage;
//     this.route.params.subscribe((paramsId) => {
//       //this.slug = paramsId['slug'];
//       const idDM = paramsId['id'];
//       if(idDM)
//       {
//         this.product = {
//           Tieude: '',
//           Mota: ' ',
//           Noidung:{Thongtin:'',Sudung:'',Thanhphan:''},
//           Thanhphan: '',
//           Huongdan: '',
//           idDM: idDM,
//           Khoiluong: '',
//           Thuonghieu: '',
//           Code: '',
//           Slug: '',
//           SKU: '',
//           Tags: [],
//           Hinhanh:{ContentImage:'',Image:''},
//           ListImage: {},
//           ContentImage: '',
//           GiaSale: 0,
//           Gia: 0,
//           Image: '',
//           Type: '',
//           Thongtin: '',
//           Ordering: 0,
//           Trangthai: 0,
//         };
//       }
//       else
//        {
//         this._khoahocService.getById(idDM).subscribe();
//         this._khoahocService.product$.subscribe((res) => {
//           if (res) {
//             console.log(res);
//             this.product = res;
//             this.tagsLoaiSpData = this.product.Tags.filter(
//               (x: any) => x.Loaitag == 1
//             );
//             this.tagsTinhtrangData = this.product.Tags.filter(
//               (x: any) => x.Loaitag == 0
//             );
//             this.ListImage = this.product.ListImage;
//           }
//         });
//       }
//     });
//   }
//   public handleTabChange(e: MatTabChangeEvent) {
//     this.activeTabIndex = e.index;
//   }

//   public ngAfterViewInit() {
//     this.activeTabIndex = this.tabGroup.selectedIndex;
//   }
//   onFileBrowse(event: any, i: number,width:any,height:any) {
//     event.target as HTMLInputElement;
//     const file: any = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file)
//     formData.append('width', width);
//     formData.append('height', height);
//     this._khoahocService.uploadDriver(formData).subscribe((res) => {
//       if (res) {
//         if (i == 1) {
//           this.product.Image = res.idDrive;
//         } else if (i == 2) {
//           this.product.Image1 = res.idDrive;
//         } else if (i == 3) {
//           this.product.ContentImage = res.idDrive;
//         } else if (i == 4) {
//           this.product.Imagecachsudung = res.idDrive;
//         }
//       }
//     });
//   }

//   Uploadfile(event: any, type: any,alt:any) {
//     event.target as HTMLInputElement;
//     const file: any = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file)
//     formData.append('alt', alt)
//     formData.append('idDrive', "0AKQL50NKsue5Uk9PVA");
//     formData.append('parents', "['1_3htpPNQTxMi2sDQZes2WGWXPNwRxDYv']");   
//     this._khoahocService.uploadDriver(formData).subscribe((res) => {
//       if (res) {
//         this.product.Hinhanh[type]=res 
//         console.log(res);
//         console.log(this.product);
        
//       }
//     });
//   }

//   selectFile(event: any): void {
//     this.selectedFiles = event.target.files;
//     console.log(this.selectedFiles);
//   }
//   removeImage(i: any) {
//     delete this.product.ListImage[i];
//   }
//   removeSimpleImage(value:any) {
//     this.product.Hinhanh[value] = '';
//   }
//   uploadListImage() {
//     if (this.selectedFiles) {
//       const number = Object.keys(this.product.ListImage).length;
//       for (let i = 0; i < this.selectedFiles.length; i++) {
//         const file: File | null = this.selectedFiles[i];
//         const formData = new FormData();
//         if(file) {
//           console.log(file);
//           formData.append('file', file);
//           const promise = new Promise<string>((resolve) => {
//             this._khoahocService.uploadDriver(formData).subscribe((res) => {
//               if (res) {
//                 console.log(res);
//                 resolve(res.idDrive);
//               }
//             });
//           });
//           if (number > 0) {
//             promise.then((x) => {
//               this.product.ListImage[i + number] = x;
//             });
//           } else {
//             promise.then((x) => {
//               this.product.ListImage[i] = x;
//             });
//           }
//         }
//       }
//       this.selectedFiles = undefined;
//     }
//   }
//   selectTags() {
//   }
//   onSubmit() {
//     this._khoahocService.postProduct(this.product).subscribe((data:any)=>
//     {
//       this._router.navigate([`./khoahoc/${data.Slug}`]);
//       console.log(data);
//     }
//     );
//   }

//   updateKhoahoc() {
//     delete this.product.Danhmuc
//     const Tags = this.tagsLoaiSpData.concat(this.tagsTinhtrangData);
//     this.product.Tags = Tags;
//     console.log(this.product);
//     this._khoahocService.updateProduct(this.product).subscribe((data:any)=>
//     {this._notifierService.notify('success','Cập nhật thành công')});

//   }
//   compareFn(o1: any, o2: any) {
//     return o1.id == o2.id;
//   }
// }
