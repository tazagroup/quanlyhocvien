import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DanhmucProductService } from '../../admin/danhmuc-product/danhmuc-product.service';
import { TagsService } from '../../admin/tags/tags.service';
@Component({
  selector: 'tazagroup-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss'],
})
export class SanphamComponent implements OnInit {
  panelOpenState = false;
  showFiller = false;
  isMobile = false;
  typeMatDra!: string;
  tags: any = [];
  tempCheckbox: any = []
  arrcheckbox: any = []
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _danhmucService: DanhmucProductService,
    private _tagService: TagsService,
  ) { }
  danhmucs: any = [];
  checkboxTags(item: any) {
    item.checked = !item.checked
    this._tagService
      .getTagsFilter(item)
      .subscribe();

  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });


    this._danhmucService.getDanhmucs().subscribe();
    this._danhmucService.danhmucs$.subscribe((res) => {
      if (res) {
        this.danhmucs = res.filter(x => x.Products.length > 0);
      }
    });
    this._tagService.getTags().subscribe();
    this._tagService.tags$.subscribe(res => {
      if (res) {
        this.tags = res;
        this.tags.forEach((x: any) => {
          x.checked = false
        })
        this._tagService.tagfilter$.subscribe(data => {
          if (data) {
            this.arrcheckbox = data
            this.tags.forEach((x: any) => {
              let index = data?.findIndex(y => x.id == y.id)
              if (index !== -1 && index != undefined) {
                x.checked = true
              } else {
                x.checked = false
              }
            })
          }
        })
      }
    })
    

  }
}
