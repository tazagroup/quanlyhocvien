import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

import * as AOS from 'aos';
@Component({
  selector: 'tazagroup-vehderma',
  templateUrl: './vehderma.component.html',
  styleUrls: ['./vehderma.component.scss'],
})
export class VehdermaComponent implements OnInit {
  // constructor() {}
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2000,
    },
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
  };
  ngOnInit(): void {
    AOS.init();
  }
}
