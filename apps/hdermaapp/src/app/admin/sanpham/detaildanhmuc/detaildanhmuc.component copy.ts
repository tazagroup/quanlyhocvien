// import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NotifierService } from 'angular-notifier';
// import { SanphamService } from '../sanpham.service';
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
//     private _sanphamService: SanphamService,
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
//     this._sanphamService.postDanhmuc(this.DanhmucList.value).subscribe()
//     this._notifierService.show({
//       message: 'Tạo danh mục thành công',
//       type: 'success',
//     });
//     this.resetForm();
//   }
//   Create(data:any) {
//     this._sanphamService.postDanhmuc(data).subscribe()
//     this._notifierService.show({
//       message: 'Tạo danh mục thành công',
//       type: 'success',
//     });
//     this.resetForm();
//   }
//   Update(data:any) {
//     this._sanphamService.updateDanhmuc(data).subscribe((data)=>
//     {
//       this._router.navigate(['admin/sanpham']);
//     }
//     );
//     this._notifierService.show({
//       message: 'Cập Nhật danh mục thành công',
//       type: 'success',
//     });

//   }
//   deleteDanhmuc() {
//     this._sanphamService.deleteDanhmuc
//     this.resetForm();
//   }
//   updateDanhmuc() {
//     this._sanphamService.updateDanhmuc(this.DanhmucList.value).subscribe();
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
//     this._sanphamService.uploadDriver(formData).subscribe((res) => {
//       if (res) {
//         if (i == 99) {
//           this.danhmuc.Image = res.idDrive;
//           this._sanphamService.updateDanhmuc(this.danhmuc).subscribe((res) => {});
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
//         this._sanphamService.getDanhmucDetail(this.slug).subscribe()
//         this._sanphamService.danhmuc$.subscribe(res=>{
//           if(res){
//             this.danhmuc = res
//           }
//         })
//       }
//       else this.danhmuc ={Image:0}
//     })
//   }
// }
