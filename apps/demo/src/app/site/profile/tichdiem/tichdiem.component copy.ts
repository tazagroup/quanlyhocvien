import { Component, OnInit, ViewChild } from '@angular/core';
import { TichdiemService } from '../../../admin/tichdiem/tichdiem.service';
import { HoahongService } from '../../../admin/cauhinh/hoahong/hoahong.service';
import { UsersService } from '../../shared/users.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


// @Component({
//   selector: 'tazagroup-tichdiem',
//   templateUrl: './tichdiem.component.html',
//   styleUrls: ['./tichdiem.component.scss'],
// })
export class TichdiemComponent implements OnInit {
  Tichdiem:any={};
  ListTichdiem:any={};
  Hoahongs:any={};
  Level:any={};
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 100;

  demo:any[] =[
    {id:1,name:'Test A'},
    {id:2,name:'Test B'},
    {id:3,name:'Test C'},
    {id:4,name:'Test D'}
  ]
  displayedColumns: string[] = ['madonhang','diem','ngaytao'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _tichdiemService: TichdiemService,
    private _hoahongService: HoahongService,
    private _usersService: UsersService,
  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getTichdiem
  ngOnInit(): void {
    this._usersService.getProfile().subscribe();
    this._usersService.profile$.subscribe((data) => {
      if(data)
      {
        console.log(data);
        
        this._tichdiemService.getByid(data.id).subscribe(()=>
        {
          this._tichdiemService.tichdiem$.subscribe((data2)=>
          {
            if(data2)
            {
            console.log(data2);
            this.ListTichdiem = data2;
            this.dataSource = new MatTableDataSource(this.ListTichdiem.Diem);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }  
          })
        });
        this._tichdiemService.getCustomerByidUser(data.id).subscribe(()=>
        {
          this._tichdiemService.customer$.subscribe((data3)=>{
            if(data3)
            {
              console.log(data3);
              this.Tichdiem = data3;
            }
            this._hoahongService.getAll().subscribe(()=>
            {
              this._hoahongService.hoahongs$.subscribe((data4)=>
              {
                if(data4)
                {
                  console.log(data4);
                  this.Hoahongs = data4
                  this.Level = data4.find(v=>this.Tichdiem.TongDiemcap*10000>=v.doanhthutu &&  this.Tichdiem.TongDiemcap*10000<  v.doanhthuden)
                  this.value = (this.Tichdiem.TongDiemcap/(this.Level.doanhthuden/10000))*100
                } 
              }
              )
            });
          })
        });
      }

    });


  }
}
