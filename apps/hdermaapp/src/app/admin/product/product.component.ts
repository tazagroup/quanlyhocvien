import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotifierService } from 'angular-notifier';
import { ProductService } from './product.service';
import { DanhmucProductService } from '../danhmuc-product/danhmuc-product.service';
import { TagsService } from '../tags/tags.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'tazagroup-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  private readonly notifier: NotifierService;

  productList!: any;
  selectedFiles?: FileList;
  products!: any[];
  isSelectProduct = false;
  percentage = 0;
  danhmucs!: any[];
  thuonghieus!: any[];
  tenDMcha!: string;
  listKeyRemove: any[] = [];
  listkey: any = {};
  listimage: any[] = [];
  isupdateListImage = false;
  tenThuonghieu!: any;
  Danhmuc!: any;
  // thumb = {};
  thumb!: string;
  chipsnhan = [];
  Tags = {};
  i = 0;
  displayedColumns: string[] = [
    'sku',
    'danhmuc',
    'name',
    'thuonghieu',
    'status',
    'price',
    'Image',
    'action',
  ];
  dataSource!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private _danhmucService: DanhmucProductService,
    notifierService: NotifierService // private _notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  onSubmit() {
    // this.productList.get('ListImage').setValue(this.listkey);
    // let GiaSale = this.productList.get('GiaSale').value;
    // if (GiaSale == 0) {
    //     this.productList
    //         .get('GiaSale')
    //         .setValue(this.productList.get('Gia').value);
    // }
    // this.sanphamService
    //     .postProduct(this.productList.value)
    //     .subscribe((res) => {
    //         this.notifier.notify('success', `Tạo sản phẩm thành công`);

    //     });
    this.resetForm();
  }
  drop(event: CdkDragDrop<any[]>) {
    const prevIndex = this.dataSource.findIndex((d: any) => d.id === event.item.data.id);
    let data1 = this.dataSource[prevIndex]
    let data2 = this.dataSource[event.currentIndex]
    data1.Ordering = event.currentIndex
    if (prevIndex > event.currentIndex) {
      data2.Ordering = event.currentIndex + 1
    }
    if (prevIndex < event.currentIndex) {
      data2.Ordering = event.currentIndex - 1
    }
    this._productService.updateProduct(data1).subscribe()
    this._productService.updateProduct(data2).subscribe()
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectProduct(item: any) {
    this.resetForm();
    this.listimage = [];
    this.isSelectProduct = true;
    this.thumb = item.Image;
    this.listkey = item.ListImage || {};
    this.Tags = item.Tags;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  onUpdate() {
    console.log('ss');
  }
  onDelete() {
    this._productService
      .deleteSanpham(this.productList.value)
      .subscribe((res) => {
        this.resetForm();
        this.notifier.notify('success', `Xóa sản phẩm thành công`);
        this.isSelectProduct = false;
        this.thumb = '';
      });
  }
  deleteProduct(id: string) {
    this._productService.deleteSanpham(id).subscribe((res) => {
      if (res) {
        alert('Xoá sản phẩm thành công');
      }
    });
  }
  selectionDanhmuc(item: any) {
    this.danhmucs.find((x) => {
      if (x.Tieude == item) {
      }
    });
  }
  resetForm() {
    this.productList = {
      Tieude: '',
      Mota: ` `,
      Thanhphan: '',
      Huongdan: '',
      idDM: '',
      Khoiluong: '',
      Thuonghieu: '',
      Code: '',
      Slug: '',
      SKU: '',
      Tags: {},
      ListImage: {},
      ContentImage: this.fb.group({
        contentImage1: '',
        contentImage2: '',
        contentImage3: '',
      }),
      GiaSale: 0,
      Gia: 0,
      Image: '',
      Type: '',
      Thongtin: '',
      Ordering: 0,
      Trangthai: 0,
    };
    this.listimage = [];
    this.Tags = {};
    this.chipsnhan = [];
    this.isSelectProduct = false;
  }

  ngOnInit(): void {
    this.resetForm();
    this._productService.getProduct().subscribe();
    this._productService.products$.subscribe((res) => {
      if (res) {
        console.log(res);
        this.products = res;
        this.products = this.products.filter((x: any) => !x.sort)
        this.products?.sort((a: any, b: any) => {
          return a.Ordering - b.Ordering;
        });
        this.dataSource = this.products;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
