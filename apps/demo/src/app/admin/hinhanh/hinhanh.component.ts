import { Component, OnInit } from '@angular/core';
import { HinhanhService } from './hinhanh.service';

@Component({
  selector: 'app-hinhanh',
  templateUrl: './hinhanh.component.html',
  styleUrls: ['./hinhanh.component.css']
})
export class HinhanhComponent implements OnInit {

  constructor(private _HinhanhService: HinhanhService) { }
  HinhCloud: any[] = [];
  HinhServer: any[] = [];
  ngOnInit() {
    const data =  { driveId:'', query: '', pageSize: 1000};
     data.driveId = '0AMBOQ7GHj5Y4Uk9PVA'  
     data.query = '"1_3htpPNQTxMi2sDQZes2WGWXPNwRxDYv" in parents'
     data.pageSize = 1000
    this._HinhanhService.getCloud(data).subscribe((data) => {
      console.log(data);
      this.HinhCloud = data.filter((v: any) => {
        return v.mimeType == 'image/jpeg'||v.mimeType == 'image/png'
      });
    })
    this._HinhanhService.getAll().subscribe((data) => {
      this.HinhServer = data
      console.log(data);
    })

  }
  Dongbo(data:any)
  {     
    this._HinhanhService.Dongbo(data).subscribe((data)=>{console.log(data);})
  }

}
