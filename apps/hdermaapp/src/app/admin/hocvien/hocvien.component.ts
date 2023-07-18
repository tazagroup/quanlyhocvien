import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { DanhmucService } from '../../shared/danhmuc.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { GetImage, convertToSlug, nest } from '../../shared/shared.utils';
import { MainComponent } from '../main/main.component';
import { HocvienService } from '../../shared/hocvien.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-hocvien',
  templateUrl: './hocvien.component.html',
  styleUrls: ['./hocvien.component.css']
})
export class HocvienComponent implements OnInit {
  Begindata:number = 1;
  Enddata:number= 1;
  Loidata:number= 0;
  Hoanthanhdata:number= 0;
  isLoading:boolean = false
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  APITINYMCE=environment.APITINYMCE
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  Detail: any ={Hoten:'',Hinhanh:{
    ContentImage: {spath: ""},
    hinhchinh: {spath: ""},
    hinh1:{spath: ""},
    hinh2:{spath: ""},
    hinh3:{spath: ""},
    hinh4:{spath: ""},
    hinh5:{spath: ""}
  }}
  danhmuc: any[]=[]
  Filterdanhmuc:any[]=[];
  dataFilter!: any[]
  id!: any
  hocvien: any = []
   private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      ...node,
    };
  };
  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );
  hasChild = (_: number, node: any) => node.expandable;
  hasNoContent = (_: number, _nodeData: any) => _nodeData.name === '';
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _hocvienService: HocvienService,
    private _MainComponent: MainComponent,
   private _router: Router,
  ) {}
    ngOnInit(): void {
    this._hocvienService.getDanhmucs().subscribe()
    this._hocvienService.getHocviens().subscribe()
    this._hocvienService.hocviens$.subscribe(res => {
      if (res) {
        this.hocvien = res          
        this.dataFilter = this.dataSource.data =this.hocvien
        this.treeControl.expandAll();
        console.log(res);
        
      }
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.Lists = this.Lists.filter((v) => {
     return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
       }
      )
    }
  }
  DLDeleteBaivet(teamplate: TemplateRef<any>,data:any): void {
    const dialogRef = this.dialog.open(teamplate);
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._hocvienService.deleteHocvien(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
      }
    });
  }
  DLDeleteDanhmuc(teamplate: TemplateRef<any>,data:any): void {
    const dialogRef = this.dialog.open(teamplate);
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._hocvienService.deleteDanhmuc(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
      }
    });
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result) {
      //   this._RedirectService.createRedirect(this.Detail).subscribe((data)=>this._Notification.notify('success','Thêm mới thành công'))
      // }
    });
  }
  CreateDM(data:any)
  {
    this._hocvienService.postHocvien(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
  }
  CreateHocvien(data:any)
  {
   const find = this.hocvien.find((v:any)=>v.Title==data.Title)
   if(find)
   {
    this._Notification.notify("error","Đã Tồn Tại")
   }
   else
   {
    this._hocvienService.postHocvien(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
   }

  }
  GetImage(data:any)
  {
    return GetImage(data);
  }
  ToggleMat()
  {
    this._MainComponent.drawer.toggle();
  }
  HocvienExcel(event: any) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = new Uint8Array((e.target as any).result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        this.Enddata = jsonData.length
        this.isLoading=true
        jsonData.forEach((v:any,k:any) => {
          setTimeout(() => {
          const Hinhanh = {
            ContentImage: {spath: ""},           
            hinhchinh: {spath: ""},
            hinh1:{spath: ""},
            hinh2:{spath: ""},
            hinh3:{spath: ""},
            hinh4:{spath: ""},
            hinh5:{spath: ""}
          }
          v.Hinhanh = Hinhanh
          v.Slug = convertToSlug(v.Title)
          const find = this.hocvien.find((v1:any)=>v1.Title==v.Title)
          if(find)
          {
           this.Loidata++
          }
          else
          {
           this._hocvienService.postHocvien(v).subscribe();
           this.Hoanthanhdata++
          }
            this.Begindata = k     
          }, 100*k);
        });
      };
      fileReader.readAsArrayBuffer(file);
    }
  readExcelFile(event: any) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = new Uint8Array((e.target as any).result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(jsonData);
        // jsonData.forEach((v:any,k:any) => {
        //   setTimeout(() => {
        //     const convertedDate = v.Ngay.replace(/_/g, "/")
        //     v.Ngayformat = new Date(convertedDate)
        //     this.AddChart(v)
        //     console.log(v);
        //   }, 100*k);
        // });
      };
      fileReader.readAsArrayBuffer(file);
    }
    writeExcelFile(data:any,name:any) {
      let mappedData = []
      if(name=="danhmuc")
      {
        mappedData = data.map((item:any) => ({
          Title: item.Title,
          Mota: item.Mota,
          Slug: item.Slug
        }));
        }
      else
      {
        mappedData = data.map((item:any) => ({
          idDM: item.idDM,
          SKU: item.SKU,
          Title: item.Title,
          Mota: item.Mota,
          Slug: item.Slug,
          Giamin: item.Giamin,
          Giamax: item.Giamax
        }));
     }
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mappedData);
      const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, name);
    }
    saveAsExcelFile(buffer: any, fileName: string) {
      const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
      const url: string = window.URL.createObjectURL(data);
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    }
}