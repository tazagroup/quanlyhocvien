import { Component, OnInit } from '@angular/core';
import { DonhangService } from '../../../admin/donhang/donhang.service';
import { UsersService } from '../../../shared/users.service';
import { TTDonhang } from '../../../shared/shared-datatype';

@Component({
  selector: 'tazagroup-donhang',
  templateUrl: './donhang.component.html',
  styleUrls: ['./donhang.component.scss'],
})
export class DonhangComponent implements OnInit {
  Donhangs:any[]=[];
  filterDonhangs:any[]=[];
  TTDonhang =TTDonhang
  constructor(
    private _donhangService:DonhangService,
    private _usersService:UsersService
    ) {
      this._usersService.getProfile().subscribe();
      this._usersService.profile$.subscribe((data:any)=>
      {
        if(data!=null)
        {
        this._donhangService.getDonhangByidKH(data.id).subscribe();
        this._donhangService.donhang$.subscribe((res: any) => {
          if (res) {
             console.log(res);
             this.filterDonhangs = this.Donhangs = res;
          }
        });
      }})

  }

  ngOnInit(): void {}
  SumTotal(item:any)
  {
    return item.reduce((acc:any, curr:any) => acc + (curr.Soluong*curr.Product.Gia), 0)
  }
  Findbyid(item:any,items:any)
  {
    const result =  items.find((v:any)=>v.id ==item)
    return result?result.Tieude:''
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterDonhangs = this.Donhangs.filter((v)=>{
      return v.MaDonHang.toLowerCase().includes(filterValue)
    })
    console.log(filterValue);
    console.log(this.Donhangs);
    console.log(this.filterDonhangs);
    
  }
}
