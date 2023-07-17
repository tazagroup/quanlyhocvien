import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { DanhmucService } from '../../shared/danhmuc.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { GetImage, nest } from '../../shared/shared.utils';
import { MainComponent } from '../main/main.component';
import { KhoahocService } from '../../shared/khoahoc.service';
@Component({
  selector: 'tazagroup-khoahoc',
  templateUrl: './khoahoc.component.html',
  styleUrls: ['./khoahoc.component.scss'],
})
export class KhoahocComponent implements OnInit {
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
  khoahoc: any = []
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
    private _khoahocService: KhoahocService,
    private _MainComponent: MainComponent,
   private _router: Router,
  ) {}
    ngOnInit(): void {
    this._khoahocService.getDanhmucs().subscribe()
    this._khoahocService.getKhoahocs().subscribe()
    this._khoahocService.danhmucs$.subscribe(data => {
      if (data) {

        data.forEach(v=>v.isDM=true) 
        this.danhmuc = data
        console.log(data);
        this._khoahocService.khoahocs$.subscribe(res => {
          if (res) {
            res.forEach(v=>v.isDM=false)
            this.khoahoc = res
            this.khoahoc.forEach((v:any) => {
              v.pid=v.idDM
            });
            this.khoahoc.sort((a: any, b: any) => {
              return a.Ordering - b.Ordering;
            });
            let arr = [...this.danhmuc, ...this.khoahoc]
            this.dataFilter = this.dataSource.data = nest(arr)
            this.treeControl.expandAll();
            console.log(arr);
          }
          else {
            let arr = [...this.danhmuc, ...this.khoahoc]
            this.dataFilter = this.dataSource.data = nest(arr)
            this.treeControl.expandAll();
            console.log(arr);
          }
        })
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
        this._khoahocService.deleteKhoahoc(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
      }
    });
  }
  DLDeleteDanhmuc(teamplate: TemplateRef<any>,data:any): void {
    const dialogRef = this.dialog.open(teamplate);
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._khoahocService.deleteDanhmuc(data.id).subscribe((data)=>this._Notification.notify('success','Xoá thành công'))
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
    this._khoahocService.postDanhmuc(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
  }
  CreateKhoahoc(data:any)
  {
    console.log(data);
    
    this._khoahocService.postKhoahoc(data).subscribe((data)=>this._Notification.notify("success","Thêm Thành Công"));
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