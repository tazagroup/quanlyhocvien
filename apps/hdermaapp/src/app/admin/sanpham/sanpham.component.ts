import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { DanhmucService } from '../../shared/danhmuc.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SanphamService } from './sanpham.service';
import { GetImage, nest } from '../../shared/shared.utils';
import { MainComponent } from '../main/main.component';
@Component({
  selector: 'tazagroup-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss'],
})
export class SanphamComponent implements OnInit {
  Detail: any = {};
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  APITINYMCE=environment.APITINYMCE
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  DMDetail: any = {};
  BVDetail: any = {};
  danhmuc: any[]=[]
  Filterdanhmuc:any[]=[];
  dataFilter!: any[]
  id!: any
  sanpham: any = []
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
    private _sanphamService: SanphamService,
    private _MainComponent: MainComponent,
   private _router: Router,
  ) {}
    ngOnInit(): void {
    this._sanphamService.getDanhmucs().subscribe()
    this._sanphamService.getProduct().subscribe()
    this._sanphamService.danhmucs$.subscribe(data => {
      if (data) {
        data.forEach(v=>v.isDM=true) 
        this.danhmuc = data
        this.danhmuc.forEach((v)=>v.Loai = 0)
        this._sanphamService.products$.subscribe(res => {
          if (res) {
            res.forEach(v=>v.isDM=false)
            this.sanpham = res
            this.sanpham.forEach((v:any) => {
              v.pid=v.idDM
            });
            this.sanpham.sort((a: any, b: any) => {
              return a.Ordering - b.Ordering;
            });
            let arr = [...this.danhmuc, ...this.sanpham]
            this.dataFilter = this.dataSource.data = nest(arr)
            this.treeControl.expandAll();
          }})
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
        this._sanphamService.deleteSanpham(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
      }
    });
  }
  DLDeleteDanhmuc(teamplate: TemplateRef<any>,data:any): void {
    const dialogRef = this.dialog.open(teamplate);
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._sanphamService.deleteDanhmuc(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
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
    this._sanphamService.postDanhmuc(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
  }
  CreateSanpham(data:any)
  {
    console.log(data);
    
    this._sanphamService.postProduct(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
  }
  GetImage(data:any)
  {
    return GetImage(data);
  }
  ToggleMat()
  {
    this._MainComponent.drawer.toggle();
  }
}