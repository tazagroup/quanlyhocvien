import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApinhanhService } from '../../../shared/apinhanh.service';
import { CauhinhchungService } from '../../../shared/cauhinhchung.service';
@Component({
  selector: 'app-cauhinhapi',
  templateUrl: './cauhinhapi.component.html',
  styleUrls: ['./cauhinhapi.component.css']
})
export class CauhinhapiComponent implements OnInit {
  nhanhApi = localStorage.getItem('nhanhApi') || null;
  accessCode:any
  apifield:any ={oauth:"",url:"",version: "2.0",appId: "",accessCode: "",secretKey: ""}
  MenuDashboard: any[] = [
    { id: 1, Tieude: 'Bài Viết', Link: 'baiviet', Image: '', Icon: 'article' },
    { id: 2, Tieude: 'Sản Phẩm', Link: 'sanpham', Image: '', Icon: '' },
    { id: 3, Tieude: 'Đơn Hàng', Link: 'donhang', Image: '', Icon: '' },
    { id: 4, Tieude: 'Comment', Link: 'comment', Image: '', Icon: '' },
  ]
  constructor(
    private _router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _ApinhanhService: ApinhanhService,
    private _CauhinhchungService: CauhinhchungService,
  ) { }
  ngOnInit(): void {
    this._CauhinhchungService.getAll().subscribe((data:any)=>
    {
      const value = data.find((v:any)=>v.Slug=='api-nhanh')     
      if(value){this.apifield = JSON.parse(value.Content)}
      
    })
    this.accessCode = this.route.snapshot.queryParams['accessCode']; 
    this.apifield.accessCode = this.accessCode
  }
  getToken(data:any)
  {
     this._ApinhanhService.getToken(data).subscribe((data)=>
     {
      this._router.navigate(['admin']);
      location.reload();
     })
  }
  Disconect()
  {
    localStorage.removeItem('nhanhApi');
      this._router.navigate(['admin']);
      location.reload();
  }

}
