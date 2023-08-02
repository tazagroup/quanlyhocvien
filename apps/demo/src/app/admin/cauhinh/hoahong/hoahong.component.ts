import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HoahongService } from './hoahong.service';
@Component({
  selector: 'tazagroup-hoahong',
  templateUrl: './hoahong.component.html',
  styleUrls: ['./hoahong.component.scss'],
})
export class HoahongComponent implements OnInit {
  displayedColumns: string[] = ['capbac', 'doanhthu', 'hhcanhan', 'hhgioithieu'];
  dataSource!: MatTableDataSource<any>;
  Hoahongs:any[]=[];
  Hoahong:any={};
  IsThemHH:boolean=true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _hoahongService: HoahongService
  ) {
    this._hoahongService.getAll().subscribe();
  }
  ngOnInit(): void {
    this._hoahongService.hoahongs$.subscribe((data)=>
         {
      if(data)
      {
          this.Hoahongs = data.sort((a, b) => a.hhcanhan - b.hhcanhan);
          this.dataSource = new MatTableDataSource(this.Hoahongs);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }
        }
    )
    this._hoahongService.hoahong$.subscribe((data)=>
         {
          if(data){this.Hoahong = data}
        }
    )
  }
  CreateHoahong(data: any) {
    this._hoahongService.Create(data).subscribe();
    this.dataSource = new MatTableDataSource(this.Hoahongs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.IsThemHH = true;
  }
  UpdateHoahong(data: any) {
    this._hoahongService.Update(data).subscribe();
    this.dataSource = new MatTableDataSource(this.Hoahongs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.IsThemHH = true;
  }
  DeleteHoahong(data: any) {
    this._hoahongService.Delete(data).subscribe();
    this.dataSource = new MatTableDataSource(this.Hoahongs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.IsThemHH = true;
  }
  checkEmptyObject(data:any)
  {
      return Object.keys(data).length ==0?true:false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
