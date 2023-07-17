import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'tazagroup-gioithieu',
  templateUrl: './gioithieu.component.html',
  styleUrls: ['./gioithieu.component.scss'],
})
export class GioithieuComponent implements OnInit {
  Ref= [
    { HoTen: 'Ref1', DoanhThu: 10000},
    { HoTen: 'Ref1', DoanhThu: 10000},
    { HoTen: 'Ref1', DoanhThu: 10000},
    { HoTen: 'Ref1', DoanhThu: 10000},
    { HoTen: 'Ref1', DoanhThu: 10000},
  ];
  displayedColumns: string[] = ['HoTen', 'DoanhThu'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
        this.dataSource = new MatTableDataSource(this.Ref);
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
