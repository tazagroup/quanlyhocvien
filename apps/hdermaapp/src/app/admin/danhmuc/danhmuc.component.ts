import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { DanhmucService } from './danhmuc.service';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { map, take } from 'rxjs';
import { DanhmucService } from '../../shared/danhmuc.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-danhmuc',
    templateUrl: './danhmuc.component.html',
    styleUrls: ['./danhmuc.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DanhmucComponent implements OnInit {
    themes: any;
    danhmuc: any;
    theme: any;
    selectedFiles?: FileList;
    percentage = 0;
    selectTheme: any;
    DanhmucList!: FormGroup
    temp!: any
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

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
    );
    hasChild = (_: number, node: any) => node.expandable;
    hasNoContent = (_: number, _nodeData: any) => _nodeData.name === '';
    dataSource1 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder,
        private _danhmucService: DanhmucService
    ) {
    }
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
        this.temp = item
        this.dialog.open(templateRef);
    }
    clickupdate() {
        this.danhmuc.forEach((x: any) => {
    
          this._danhmucService.postDanhmuc(x).subscribe(res => console.log(res)
          )
    
        })
        // let a:any[] = this.baiviet.filter((x:any) => x.pid == '9ce23cc8-3e11-4bb1-bee9-2c9931a5e48e')
        // a.forEach((x:any)=>{
        //   this._baivietService.deleteBaiviet(x.id).subscribe()
    
        // })
      }
    onSave() {
        this.DanhmucList.get('pid')?.setValue(this.temp.id)
        this._danhmucService.postDanhmuc(this.DanhmucList.value).subscribe(res => {
            if (res) {
                this.resetForm()
                alert('Tạo danh mục thành công')
                this.dialog.closeAll()
            }
        })
    }
   
    deleteDanhmuc(id: string) {
        
        this._danhmucService.deleteDanhmuc(id).subscribe(res => {
            if (res) {
                alert('Xoá danh mục thành công')
            }
        })
    }
    resetForm() {
        this.DanhmucList = this.fb.group({
            Title: [''],
            Mota: [''],
            Type: [''],
            pid: [''],
            Slug: [''],
            Ordering: [0],
        });
    }
    ngOnInit(): void {
        this.resetForm()
        this._danhmucService.getDanhmucs().subscribe()
        this._danhmucService.danhmucs$.subscribe(res => {
            if (res) {
                this.danhmuc = res
                this.danhmuc.sort((a:any, b:any) => {
                    return a.Ordering - b.Ordering;
                });
                this.dataSource1.data = this.nest(res)
            }
        })

    }
}
