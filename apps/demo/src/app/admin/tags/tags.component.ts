import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { TagsService } from './tags.service';

@Component({
  selector: 'tazagroup-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  themes: any;
  tag: any;
  tags: any[]=[];
  Filtertags: any[]=[];
  theme: any;
  selectedFiles?: FileList;
  percentage = 0;
  selectTheme: any;
  TagList!: any;
  temp!: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      ...node,
    };
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
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
    private _tagService: TagsService
  ) { }
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

  OpenThemTag(item: any, templateRef: TemplateRef<any>) {
    this.temp = item;
    this.dialog.open(templateRef);
  }
  clickupdate() {
    this.tag.forEach((x: any) => {
      this._tagService.postTag(x).subscribe((res) => console.log(res));
    });
    // let a:any[] = this.baiviet.filter((x:any) => x.pid == '9ce23cc8-3e11-4bb1-bee9-2c9931a5e48e')
    // a.forEach((x:any)=>{
    //   this._baivietService.deleteBaiviet(x.id).subscribe()

    // })
  }
  displayedColumns: string[] = [
    'Loaitag',
    'Tieude',
    'Mota',
    'Image',
    'action',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectProduct(item: any) {
    this.resetForm();
  }

  deleteProduct(id: string) {
    this._tagService.deleteTag(id).subscribe((res) => {
      if (res) {
        alert('Xoá Tag thành công');
      }
    });
  }

  onSave() {
    this.TagList.pid = this.temp.id;
    this._tagService.postTag(this.TagList).subscribe((res) => {
      if (res) {
        this.resetForm();
        alert('Tạo danh mục thành công');
        this.dialog.closeAll();
      }
    });
  }
  updateTag(item: any) {
    if (item.Trangthai == 0) {
      item.Trangthai = 1
    } else {
      item.Trangthai = 0
    }
    this._tagService.updateTag(item).subscribe()
  }
  deleteTag(id: string) {
    this._tagService.deleteTag(id).subscribe((res) => {
      if (res) {
        alert('Xoá danh mục thành công');
      }
    });
  }
  resetForm() {
    this.TagList = {
      Title: '',
      Mota: '',
      Slug: '',
      Image: '',
      Ordering: 0,
    };
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  ngOnInit(): void {
    this.resetForm();
    this._tagService.getTags().subscribe();
    this._tagService.tags$.subscribe((res) => {
      if (res) {
        console.log(res); 
        this.tags = this.Filtertags = res;
      }
    });
  }
}
