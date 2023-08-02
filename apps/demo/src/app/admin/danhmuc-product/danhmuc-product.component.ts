import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { DanhmucService } from './danhmuc.service';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { map, take } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DanhmucProductService } from './danhmuc-product.service';

@Component({
  selector: 'tazagroup-danhmuc-product',
  templateUrl: './danhmuc-product.component.html',
  styleUrls: ['./danhmuc-product.component.scss'],
})
export class DanhmucProductComponent implements OnInit {
  themes: any;
  danhmuc: any;
  theme: any;
  selectedFiles?: FileList;
  percentage = 0;
  selectTheme: any;
  DanhmucList!: any;
  temp!: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );
  hasChild = (_: number, node: any) => node.expandable;
  hasNoContent = (_: number, _nodeData: any) => _nodeData.name === '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  dataSource1 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _danhmucService: DanhmucProductService
  ) {}
  nest = (items: any[], id = '', link = 'pid'): any => {
    if (items) {
      return items
        ?.filter((item) => item[link] == id)
        .map((item) => ({
          ...item,
          children: this.nest(items, item.id),
        }));
    }
  };

  OpenThemDanhmuc(item: any, templateRef: TemplateRef<any>) {
    this.temp = item;
    this.dialog.open(templateRef);
  }
  clickupdate() {
    this.danhmuc.forEach((x: any) => {
      this._danhmucService.postDanhmuc(x).subscribe((res) => console.log(res));
    });
    // let a:any[] = this.baiviet.filter((x:any) => x.pid == '9ce23cc8-3e11-4bb1-bee9-2c9931a5e48e')
    // a.forEach((x:any)=>{
    //   this._baivietService.deleteBaiviet(x.id).subscribe()

    // })
  }
  onSave() {
    this.DanhmucList.pid = this.temp.id;
    this._danhmucService.postDanhmuc(this.DanhmucList).subscribe((res) => {
      if (res) {
        this.resetForm();
        alert('Tạo danh mục thành công');
        this.dialog.closeAll();
      }
    });
  }
  updateTrangthai(item:any){
    if(item.Trangthai == 0){
        item.Trangthai = 1
    }else{
        item.Trangthai = 0
    }
    this._danhmucService.updateDanhmuc(item).subscribe()
}
  deleteDanhmuc(id: string) {
    this._danhmucService.deleteDanhmuc(id).subscribe((res) => {
      if (res) {
        alert('Xoá danh mục thành công');
      }
    });
  }
  resetForm() {
    this.DanhmucList = {
      Title: '',
      pid: '',
      Mota: '',
      Slug: '',
      Image: '',
      Ordering: 0,
    };
  }
  ngOnInit(): void {
    this.resetForm();
    this._danhmucService.getDanhmucs().subscribe();
    this._danhmucService.danhmucs$.subscribe((res) => {
      if (res) {
        this.danhmuc = res;
        this.danhmuc.sort((a: any, b: any) => {
          return a.Ordering - b.Ordering;
        });
        this.dataSource1.data = this.nest(res);
      }
    });
  }
}
