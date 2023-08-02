import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { CauhinhchungService } from '../../../shared/cauhinhchung.service';
@Component({
  selector: 'app-cauhinhchung',
  templateUrl: './cauhinhchung.component.html',
  styleUrls: ['./cauhinhchung.component.css']
})
export class CauhinhchungComponent implements OnInit {
  Lists:any[] = []
  FilterLists:any[] = []
  Detail:any={}
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _CauhinhchungService: CauhinhchungService,
  ) {}
  //{ "host": "smtp.ethereal.email", "port": "587", "secure": "false", "auth": { "user": "testAccount.user", "pass": "testAccount.pass" } }
  ngOnInit(): void {
    this._CauhinhchungService.getAll().subscribe((data)=>{
      this.FilterLists = this.Lists = data
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.FilterLists = this.Lists.filter((v) => {
        return  v.Tieude.toLowerCase().includes(value)
       }
      )
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {

    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._CauhinhchungService.createCauhinhchung(this.Detail).subscribe();
      }
    });
  }
}




