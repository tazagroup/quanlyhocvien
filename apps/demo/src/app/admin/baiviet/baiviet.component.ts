import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from 'apps/demo/src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { DanhmucService } from '../../shared/danhmuc.service';
import { BaivietService } from '../../shared/baiviet.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { GetImage, nest } from '../../shared/shared.utils';
@Component({
  selector: 'tazagroup-baiviet',
  templateUrl: './baiviet.component.html',
  styleUrls: ['./baiviet.component.scss'],
})
export class BaivietComponent implements OnInit {
  Detail: any = {};
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  APITINYMCE=environment.APITINYMCE
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  DMDetail: any = {};
  BVDetail: any = {};
  danhmuc: any[]=[]
  dataFilter!: any[]
  id!: any
  baiviet: any = []
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
    private _baivietService: BaivietService, 
    private _danhmucService: DanhmucService,
   private _router: Router,
  ) {}
    ngOnInit(): void {
    this._danhmucService.getDanhmucs().subscribe()
    this._baivietService.getBaiviets().subscribe()
    this._danhmucService.danhmucs$.subscribe(data => {
      if (data) {
        data.forEach(v=>v.isDM=true) 
        this.danhmuc = data
        this.danhmuc.forEach((v)=>v.Loai = 0)
        this._baivietService.baiviets$.subscribe(res => {
          if (res) {
            res.forEach(v=>v.isDM=false)
            this.baiviet = res
           // this.theme1 = this.baiviet.filter((x: any) => x.Theme == 4)
            this.baiviet.sort((a: any, b: any) => {
              return a.Ordering - b.Ordering;
            });
            // this.baiviet.forEach((v:any) =>v.Loai = 1);
            let arr = [...this.danhmuc, ...this.baiviet]
            console.log(arr);
            
            this.dataFilter = this.dataSource.data = nest(arr)
            console.log(this.dataFilter);
            
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
        this._baivietService.deleteBaiviet(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
      }
    });
  }
  DLDeleteDanhmuc(teamplate: TemplateRef<any>,data:any): void {
    const dialogRef = this.dialog.open(teamplate);
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._danhmucService.deleteDanhmuc(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
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
    this._danhmucService.postDanhmuc(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
  }
  CreateBaiviet(data:any)
  {
    this._baivietService.postBaiviet(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
  }
  GetImage(data:any)
  {
    return GetImage(data);
  }
}