import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'tazagroup-camon',
  templateUrl: './camon.component.html',
  styleUrls: ['./camon.component.scss'],
})
export class CamonComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  detailProduct:any;
  state$?: Observable<any>;
  ngOnInit(): void {
    this.state$ = this.route.paramMap
    .pipe(map(() => window.history.state.data))   
  }
}
