import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { ProductService } from '../../../admin/product/product.service';
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
SwiperCore.use([FreeMode, Navigation, Thumbs]);
@Component({
  selector: 'tazagroup-radiance',
  templateUrl: './radiance.component.html',
  styleUrls: ['./radiance.component.scss'],
})
export class RadianceComponent implements OnInit{
  @ViewChild(SwiperComponent) swiper!: SwiperComponent;
  thumbsSwiper: any;
  configProduct: any;
  panelOpenState = false;
  APITINYMCE!: string;
  id!: string;
  product: any = [{}];
  constructor(
    private _sanphamService: ProductService,
    private route: ActivatedRoute
  ) {
    this.APITINYMCE = environment.APITINYMCE;
  }
  ngOnInit(): void {
    this.configProduct = {
      spaceBetween: 10,
    };
    this.route.params.subscribe((paramsId) => {
      this.id = paramsId['slug'];
      this.product = {};
      if (this.id) {
        this._sanphamService.getProductDetail(this.id).subscribe();
        this._sanphamService.product$.subscribe((res) => {
          if (res) {
            this.product = res;
          }
        });
      }
    });
  }
}
