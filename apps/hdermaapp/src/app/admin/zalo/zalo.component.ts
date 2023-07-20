import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { GetImage, convertToSlug, nest } from '../../shared/shared.utils';
import { MainComponent } from '../main/main.component';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZaloService } from '../../shared/zalo.service';
@Component({
  selector: 'app-zalo',
  templateUrl: './zalo.component.html',
  styleUrls: ['./zalo.component.css']
})
export class ZaloComponent implements OnInit {
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
  zalo: any = []
  displayedColumns: string[] = ['Hoten','SDT','Email', 'Gioitinh','Doanhso','Doanhthu','Congno'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _zaloService: ZaloService,
    private _MainComponent: MainComponent,
   private _router: Router,
  ) {}
    ngOnInit(): void {
    this._zaloService.getAll().subscribe()
    this._zaloService.zalos$.subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.zalo = res          
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
        this._zaloService.deleteZalo(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
      }
    });
  }
  CreateZalo(teamplate: TemplateRef<any>,data:any)
  {

    const dialogRef = this.dialog.open(teamplate);
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        const find = this.zalo.find((v:any)=>v.Hoten==data.Hoten)
        if(find)
        {
         this._Notification.notify("error","Đã Tồn Tại")
        }
        else
        {
         this._zaloService.createZalo(data).subscribe(()=>this._Notification.notify("success","Thêm Thành Công"));
         this.dataSource = new MatTableDataSource(this.zalo);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
        }
      }
    });
  }
  GetImage(data:any)
  {
    return GetImage(data);
  }
  ToggleMat()
  {
    this._MainComponent.drawer.toggle();
  }
  ZaloExcel(event: any) {
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
        console.log(jsonData);
        jsonData.forEach((v:any,k:any) => {
          setTimeout(() => {
          const find = this.zalo.find((v1:any)=>v1.SDT==v.SDT)
          if(find)
          {
           this.Loidata++
          }
          else
          {
           this._zaloService.createZalo(v).subscribe();
           this.Hoanthanhdata++
          }
            this.Begindata = k     
          }, 100*k);
        });
      };
      fileReader.readAsArrayBuffer(file);
    }
    writeExcelFile(data:any,name:any) {
       const zalo = data.map((item:any) => ({
          Hoten: item.Hoten,
          idUser: item.idUser,
          idCN: item.idCN,
          Doanhso: item.Doanhso,
          Doanhthu: item.Doanhthu,
          MaGV: item.MaGV,
          SDT: item.SDT,
          Email: item.Email,
          Diachi: item.Diachi,
          Giotinh: item.Giotinh,
          Ghichu: item.Ghichu
        }));
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(zalo);
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