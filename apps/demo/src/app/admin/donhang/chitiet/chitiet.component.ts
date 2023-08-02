import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { NotifierService } from 'angular-notifier';
import { LinkService } from '../../product/link.service';
import { ProductService } from '../../product/product.service';
import { TichdiemService } from '../../tichdiem/tichdiem.service';
import { DonhangService } from '../donhang.service';
import { ActivatedRoute } from '@angular/router';
import { TTDonhang } from '../../../shared/shared-datatype';

@Component({
  selector: 'tazagroup-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.scss'],
})
export class ChitietComponent implements OnInit {
  displayedColumns1: string[] = [
    'TenSP',
    'Soluong',
    'Dongia',
    // 'Khuyenmai',
    'Ghichu',
    'Trangthai',
    // 'Gioithieu'
  ];
  dataSource1 = new MatTableDataSource();
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Hoten',
    'SDT',
    'Diachi',
    'Ngaytao',
    'Trangthai',
    'action',
  ];
  TTDonhang: any[] = TTDonhang;
  isOpen = false;
  CDonhang: any;
  DonHangs: any[] = [];
  products!: any[];
  users = {};
  arr: any = []
  customer:any = {};
  customer_diem:any = {};
  landingpageForm!: FormGroup;
  selectRow: any={};
  DHChitiet: any={};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  triggerOrigin!: any;
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      ...node,
    };
  };

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );
  hasChild = (_: number, node: any) => node.expandable;
  hasNoContent = (_: number, _nodeData: any) => _nodeData.name === '';
  dataSourceTree = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private fb: FormBuilder,
    private donhangService: DonhangService,
    private _sanphamService: ProductService,
    private _linkService: LinkService,
    private _notifierService: NotifierService,
    private _tichdiemService: TichdiemService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this._sanphamService.getProduct().subscribe();
    this._sanphamService.products$.subscribe(
      (res: any) => (this.products = res)
    );
    this.route.params.subscribe(params => {
      this.donhangService.getOneDonhang(params['id']).subscribe();
      this.donhangService.donhang1$.subscribe((res: any) => {
        if (res) {
          this.DHChitiet =res
          console.log(res.Donhangchitiets);
          this.dataSource = new MatTableDataSource(res.Donhangchitiets);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    });

    this._linkService.getLink().subscribe()
  }
  Total(items:any)
  {
    return items.reduce((acc:any, item:any) => acc + item.Soluong * item.Dongia, 0)
  }
  Findbyid(item:any,items:any)
  {
    const result =  items.find((v:any)=>v.id ==item)
    return result?result.Tieude:''
  }
  selectTrangthai(item: any, trangthai:number) {
    if(trangthai==3)
    {
      this.customer_diem.idUser = item.idKH
      this.customer_diem.idDonHang = item.id
      this.customer_diem.Diemcap =   this.customer_diem.Diemqua = item.Donhangchitiets.reduce((acc:any, obj:any) => acc + obj.Dongia, 0)/10000;
      this._tichdiemService.createTichdiem(this.customer_diem).subscribe((data)=>
        {
          this._tichdiemService.getCustomerByidUser(data.idUser).subscribe((data1)=>
          {
            if(data1)
            {
              this.customer = data1
              this.customer.TongDiemcap += data.Diemcap
              this.customer.TongDiemqua += data.Diemqua
              this._tichdiemService.updateCustomer(this.customer).subscribe((data)=>{this.customer = {}})
              this.ngOnInit();
            }
            else
            {
              this.customer.idUser = data.idUser
              this.customer.TongDiemcap = data.Diemcap
              this.customer.TongDiemqua = data.Diemqua
              this._tichdiemService.createCustomer(this.customer).subscribe((data)=>{this.customer = {}})
              this.ngOnInit();
            }
          })
        }
      );
     }
    delete item.Donhangchitiets
     item.Trangthai = trangthai
     this.donhangService.updateDonhang(item).subscribe();
     this._notifierService.notify('success','Cập Nhật Đơn Hàng Thành Công')
}
  nest = (items: any, id = '', link = 'pid') =>
    items
      ?.filter((item: any) => item[link] == id)
      .map((item: any) => ({
        ...item,
        children: this.nest(items, item.id),
      }));
  //function kiếm phần tử cha từ phần tử con
  getParent(data: any, id: string) {
    let item: any = data.find((x: any) => x.pid == id)

    if (item) {
      this.arr.push(item)
      this.getParent(data, item.id)
    }
    return item
  }
  openDialog(item: any, templateRef: TemplateRef<any>) {
    this.dataSourceTree.data = []
    this.arr = []
    this.dialog.open(templateRef);
    this._linkService.getLinkDetail(item.idGioithieu).subscribe((res: any) => {
      if (res) {
        this._linkService.links$.subscribe(data => {
          if (data) {
            if (res.pid != '') {
              let item = data.find(x => x.id == res.pid)
              this.arr.push(item)
            }
            this.arr.push(res)
            res.isCheck = true
            this.getParent(data, res.id)
            // this._dangkyService.nhanviens$.subscribe(users => {
            //   if (users) {
            //     this.arr.forEach((x: any) => {
            //       users.filter((y: any) => {
            //         if (x.idUser == y.id) {
            //           x.SDT = y.SDT
            //           x.Hoten = y.Hoten
            //         }
            //       })
            //     });
            //   }
            // })
            this.dataSourceTree.data = this.nest(this.arr)

          }
        })
      }
    })

  }
  SelectDonhang(item: any) {
    this.dataSource1 = new MatTableDataSource(item.Donhangchitiets);
  }
  // ngAfterViewInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  toggle(trigger: any, row: any) {
    this.selectRow = row;
    this.triggerOrigin = trigger;
    this.isOpen = !this.isOpen;
  }


  filterDonhang(value: any) {
    this.dataSource = new MatTableDataSource(
      this.DonHangs.filter((v) => v.Hoten.toLowerCase().includes(value))
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}