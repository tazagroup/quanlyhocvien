import { Component, OnInit } from '@angular/core';
import { DonhangService } from '../../admin/donhang/donhang.service';

@Component({
  selector: 'tazagroup-tracuudon',
  templateUrl: './tracuudon.component.html',
  styleUrls: ['./tracuudon.component.scss'],
})
export class TracuudonComponent implements OnInit {
  donhang:any
  constructor(
    private _donhangService:DonhangService,
    ) {
      this._donhangService.getDonhangbyMDH('DHd050614f').subscribe((data)=>console.log(data));
  }

  ngOnInit(): void {}
}
