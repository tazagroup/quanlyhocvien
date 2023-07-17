// import {AfterViewInit, Component, ViewChild} from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';
// import { NotifierService } from 'angular-notifier';
// import { ListChiendich,ListCauhinh } from '../cauhinh';
// import { HoahongService } from '../hoahong/hoahong.service';
// @Component({
//   selector: 'tazagroup-chiendich',
//   templateUrl: './chiendich.component.html',
//   styleUrls: ['./chiendich.component.scss'],
// })
// export class ChiendichComponent implements AfterViewInit {
//   displayedColumns: string[] = ['TenCD','Doanhthu', 'Noidung', 'Diem', 'Giatriqua'];
//   dataSource!: MatTableDataSource<any>;
//   ListChiendich:any[];
//   ListCauhinh:any[]=[];
//   Chiendich:any={ListDiem:[],ListGiatriqua:[],ListMax:[],ListActive:[]};
//   IsThemCD:boolean=false
//   DiemMax:any[]=[]
//   ListCapbac:any[]=[]
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(
//     private _notifierService: NotifierService,
//     private _hoahongService: HoahongService,
    
//     ) {
//     const StoreListChiendich = localStorage.getItem('ListChiendich')
//     if(StoreListChiendich!=null) {
//       this.ListChiendich = JSON.parse(StoreListChiendich)
//     }
//     else {this.ListChiendich = ListChiendich}

//     this._hoahongService.getAll().subscribe();
//   }
//   ngOnInit(): void {

//     this._hoahongService.hoahongs$.subscribe((data)=>
//         {
//           if(data)
//           {
//             this.ListCauhinh = data.sort((a, b) => a.hhcanhan - b.hhcanhan);
//             this.ListCauhinh.forEach((v,k)=>
//             {
//               console.log(v,k);
//               this.Chiendich.ListDiem[k]=0
//               this.Chiendich.ListGiatriqua[k]=0;
//               this.Chiendich.ListMax[k]=this.Chiendich.ListActive[k]=35-v.hhcanhan-v.hhgioithieu;
//             }
//             )
//           }
//       })   
//     this.dataSource = new MatTableDataSource(this.ListChiendich);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//     console.log(this.Chiendich);

//   }
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
//   FDemMax(index:number,hhcanhan:number,hhgioithieu:number) {
//     this.Chiendich.ListMax[index] = 35-hhcanhan-hhgioithieu
//     return Number(this.Chiendich.ListMax[index])
//   }
//   CheckListDiem(i:any,e:any) {
//     if((this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i])<0)
//     {
//       this._notifierService.notify('error', `Vượt Giới Hạn`);
//       this.Chiendich.ListDiem[i] =0;
//       this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
//     }
//     else
//     {
//       this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
//     }
//   }
//   CheckListGiatriqua(i:any,e:any) {
//     if((this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i])<0)
//     {
//       this._notifierService.notify('error', `Vượt Giới Hạn`);
//       this.Chiendich.ListGiatriqua[i] =0;
//       this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
//     }
//     else
//     {
//       this.Chiendich.ListActive[i] = this.Chiendich.ListMax[i] - this.Chiendich.ListDiem[i] - this.Chiendich.ListGiatriqua[i];
//     }
//   }

//   AddChiendich(data: any) {
//     console.log(data);
//     this.ListChiendich.push(data);
//     this.Chiendich={ListDiem:[],ListGiatriqua:[],ListMax:[],ListActive:[]};
//     localStorage.setItem('ListChiendich',JSON.stringify(this.ListChiendich));
//     this.dataSource = new MatTableDataSource(this.ListChiendich);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }
