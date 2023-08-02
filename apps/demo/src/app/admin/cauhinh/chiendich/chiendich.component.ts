import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { ListChiendich,ListCauhinh } from '../cauhinh';
import { HoahongService } from '../hoahong/hoahong.service';
import { ChiendichService } from './chiendich.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'tazagroup-chiendich',
  templateUrl: './chiendich.component.html',
  styleUrls: ['./chiendich.component.scss'],
})
export class ChiendichComponent implements OnInit {
  displayedColumns: string[] = ['TenCD', 'Noidung','Doanhthu','Deadline'];
  dataSource!: MatTableDataSource<any>;
  ListChiendich:any[]=[];
  Hoahongs:any[]=[];
  Chiendich:any={idSP:'',Soluong:'',Deadline:{Batdau:'',Ketthuc:''},ListDiem:[],ListGiatriqua:[],ListMax:[],ListActive:[]};
  ChiendichInit:any={};
  IsThemCD:boolean=false
  DiemMax:any[]=[]
  ListCapbac:any[]=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Sanphams:any[]=[]
  filteredSanphams:any[]=[]
  Loai:any[] = [
    {id:1,Tieude:'Sản Phẩm'},
    {id:2,Tieude:'Doanh Thu'},
    {id:3,Tieude:'Số Lượng'},
    {id:4,Tieude:'Sản Phẩm và Số Lượng'},
  ]
  filterLoai:any[] = [ 
  {id:1,Tieude:'Sản Phẩm'},
  {id:2,Tieude:'Doanh Thu'},
  {id:3,Tieude:'Số Lượng'},
  {id:4,Tieude:'Sản Phẩm và Số Lượng'}]
  idSP:any
  constructor(
    private _notifierService: NotifierService,
    private _hoahongService: HoahongService,
    private _chiendichService: ChiendichService,   
    private _sanphamService: SanphamService,   
    ) {
    this._chiendichService.getAll().subscribe();
    this._hoahongService.getAll().subscribe();
    this._sanphamService.getProduct().subscribe();
  }
  addNhiemvu()
  {
    this.Chiendich.Nhiemvus.push({});
  }
  onBlur()
  {

  }
  onValueChange(state: string) {
    this.filteredSanphams = this.Sanphams.filter(v => v.Tieude.toLowerCase().includes(state));
  }
  onLoaiChange(state: string) {
    this.filterLoai = this.Loai.filter(v => v.Tieude.toLowerCase().includes(state));
  }
  displayFn(data: any): string {
    return data && data.Tieude ? data.Tieude : '';
  }
  ngOnInit(): void {
    this._sanphamService.products$.subscribe((data)=>
    {
      if(data)
      {this.filteredSanphams = this.Sanphams = data.map(v=>({id: v.id,Tieude: v.Tieude}));} 
    })
    this._hoahongService.hoahongs$.subscribe((data)=>
        {
          if(data)
          {
            this.Hoahongs = data.sort((a, b) => a.hhcanhan - b.hhcanhan);
            this.Hoahongs.forEach((v,k)=>
              {
                this.Chiendich.ListDiem[k]=0
                this.Chiendich.ListGiatriqua[k]=0;
                this.Chiendich.ListMax[k]=this.Chiendich.ListActive[k]=35-v.hhcanhan-v.hhgioithieu;
              }
            )
            this.ChiendichInit = this.Chiendich
          }
      })
    this._chiendichService.chiendichs$.subscribe((data)=>
    {
      if(data)
      {
      this.ListChiendich = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    })
  }
  FDemMax(index:number,hhcanhan:number,hhgioithieu:number) {
    this.Chiendich.ListMax[index] = 35-hhcanhan-hhgioithieu
    return Number(this.Chiendich.ListMax[index])
  }
  CheckListDiem(i:any,e:any) {
    if((this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i])<0)
    {
      this._notifierService.notify('error', `Vượt Giới Hạn`);
      this.Chiendich.ListDiem[i] =0;
      this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
    }
    else
    {
      this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
    }
  }
  CheckListGiatriqua(i:any,e:any) {
    if((this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i])<0)
    {
      this._notifierService.notify('error', `Vượt Giới Hạn`);
      this.Chiendich.ListGiatriqua[i] =0;
      this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
    }
    else
    {
      this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
    }
  }

  CreateChiendich(data: any) {
    this._chiendichService.Create(data).subscribe((data)=>
    {
      this._notifierService.notify('success', `Thêm Mới Thành Công`);
      this.Chiendich = this.ChiendichInit
      this.dataSource = new MatTableDataSource(this.ListChiendich);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    )
  }
  UpdateChiendich(data: any) {
    this._chiendichService.Update(data).subscribe();
    this.Chiendich = this.ChiendichInit
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  DeleteChiendich(data: any) {
    this._chiendichService.Delete(data).subscribe();
    this.Chiendich = this.ChiendichInit
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
