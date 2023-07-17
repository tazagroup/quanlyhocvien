import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CauhinhchungService } from '../../../../shared/cauhinhchung.service';
import { CauhinhchungComponent } from '../cauhinhchung.component';
import { UsersService } from 'apps/hdermaapp/src/app/shared/users.service';
@Component({
  selector: 'app-cauhinh-chitiet',
  templateUrl: './cauhinh-chitiet.component.html',
  styleUrls: ['./cauhinh-chitiet.component.css']
})
export class CauhinhChitietComponent implements OnInit {
  user: any
  Detail:any={}
  constructor(
    private route: ActivatedRoute,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _CauhinhchungService: CauhinhchungService,
    private _CauhinhchungComponent: CauhinhchungComponent,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      const slug = paramsId['slug'];
      if(slug){this._CauhinhchungComponent.drawer.open()}
      this._CauhinhchungService.getAll().subscribe((data:any)=>
      {
        console.log(slug);
        console.log(data);  
        this.Detail = data.find((v:any)=>v.Slug==slug)
      })
      // this._CauhinhchungService.getByid(id).subscribe((data)=>
      // {
      //   this.Detail = data
      //   console.log(JSON.parse(data.Content));
        
      // }) 
    });
  }
  Update(data:any)
  {   
    this._CauhinhchungService.updateCauhinhchung(data).subscribe((data)=>
    {
      this._NotifierService.notify("success","Cập Nhật Thành Công")
    });
  }

}





