// import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NotifierService } from 'angular-notifier';
// import { KhoahocService } from '../khoahoc.service';
// @Component({
//   selector: 'tazagroup-detaildanhmuc',
//   templateUrl: './detaildanhmuc.component.html',
//   styleUrls: ['./detaildanhmuc.component.scss'],
// })
// export class DetaildanhmucComponent implements OnInit {
//   danhmuc: any={Image:0};
//   theme: any;
//   selectedFiles?: FileList;
//   percentage = 0;
//   selectTheme: any;
//   slug!: string;
//   DanhmucList!: FormGroup;
//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private _khoahocService: KhoahocService,
//     private _notifierService: NotifierService,
//     private _router: Router,
//   ) {
//   }
//   nest = (items: any[], id = '', link = 'pid'): any => {
//     if (items) {
//       return items
//         ?.filter((item) => item[link] == id)
//         .map((item) => ({
//           ...item,
//           children: this.nest(items, item.id),
//         }));
//     }
//   };
//   onSubmit() {
//     this.DanhmucList.removeControl('id')
//     this._khoahocService.postDanhmuc(this.DanhmucList.value).subscribe()
//     this._notifierService.show({
//       message: 'Tạo danh mục thành công',
//       type: 'success',
//     });
//     this.resetForm();
//   }
//   Create(data:any) {
//     this._khoahocService.postDanhmuc(data).subscribe()
//     this._notifierService.show({
//       message: 'Tạo danh mục thành công',
//       type: 'success',
//     });
//     this.resetForm();
//   }
//   Update(data:any) {
//     this._khoahocService.updateDanhmuc(data).subscribe((data)=>
//     {
//       this._router.navigate(['admin/khoahoc']);
//     }
//     );
//     this._notifierService.show({
//       message: 'Cập Nhật danh mục thành công',
//       type: 'success',
//     });

//   }
//   deleteDanhmuc() {
//     this._khoahocService.deleteDanhmuc
//     this.resetForm();
//   }
//   updateDanhmuc() {
//     this._khoahocService.updateDanhmuc(this.DanhmucList.value).subscribe();
//     this._notifierService.show({
//       message: 'Cập Nhật danh mục thành công',
//       type: 'success',
//     });
//     this.resetForm();
//   }
//   removeSimpleImage(value:any) {
//     this.danhmuc[value] = '';
//   }
//   onFileBrowse(event: any, i: number) {
//     event.target as HTMLInputElement;
//     let file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     this._khoahocService.uploadDriver(formData).subscribe((res) => {
//       if (res) {
//         if (i == 99) {
//           this.danhmuc.Image = res.idDrive;
//           this._khoahocService.updateDanhmuc(this.danhmuc).subscribe((res) => {});
//         }
//       }
//     });
//   }
//   resetForm() {
//     this.DanhmucList = this.fb.group({
//       id:[''],
//       Title: [''],
//       Mota: [''],
//       Type: [''],
//       pid: [''],
//       Slug: [''],
//       Ordering: [0],
//     });
//   }
//   ngOnInit(): void {
//     this.resetForm();
//     this.route.params.subscribe((paramsId) => {
//       this.slug = paramsId['slug'];
//       console.log(this.slug);
//       if (this.slug!='danhmucmoi') {
//         this._khoahocService.getDanhmucDetail(this.slug).subscribe()
//         this._khoahocService.danhmuc$.subscribe(res=>{
//           if(res){
//             this.danhmuc = res
//           }
//         })
//       }
//       else this.danhmuc ={Image:0}
//     })
//   }
// }
