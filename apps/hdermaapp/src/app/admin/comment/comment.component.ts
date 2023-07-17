import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommentService } from './comment.service';

@Component({
  selector: 'tazagroup-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  displayedColumns: string[] = [
    'STT',
    'User',
    'Rate',
    'Comment',
    'product',
    'Image',
    'Ngaytao',
    'action',
  ];
  dataSource!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _commentService: CommentService) { }
  drop(event: CdkDragDrop<any[]>) {
    const prevIndex = this.dataSource.findIndex((d: any) => d.id === event.item.data.id);
    let data1 = this.dataSource[prevIndex]
    let data2 = this.dataSource[event.currentIndex]
    data1.Ordering = event.currentIndex
    if (prevIndex > event.currentIndex) {
      data2.Ordering = event.currentIndex + 1
    }
    if (prevIndex < event.currentIndex) {
      data2.Ordering = event.currentIndex - 1
    }
    // this._productService.updateProduct(data1).subscribe()
    // this._productService.updateProduct(data2).subscribe()
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
  }
  hiddenComment() {
    this.dataSource.forEach((x: any) => {
      x.Tinhtrang = false
      this._commentService.updateComment(x).subscribe()
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateTinhtrang(item: any) {
    item.Tinhtrang = !item.Tinhtrang
    this._commentService.updateComment(item).subscribe()
  }
  ngOnInit(): void {
    this._commentService.getComments().subscribe()
    this._commentService.comments$.subscribe(res => {
      if (res) {
        this.dataSource = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
}
