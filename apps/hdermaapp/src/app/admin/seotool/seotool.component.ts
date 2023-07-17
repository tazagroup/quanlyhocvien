import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { SeotoolService } from '../../shared/seotools.service';
@Component({
  selector: 'app-seotool',
  templateUrl: './seotool.component.html',
  styleUrls: ['./seotool.component.css']
})
export class SeotoolComponent implements OnInit {
  Detail: any={Title:'',
  Meta:{title:'',description:'',keywords:'',robots:'',url:'',type:'',image:''},
  Schema:{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Đội ngũ giảng viên ngành spa, thẩm mỹ tại học viện Timona",
    "url": "https://timona.edu.vn/gioi-thieu/giang-vien",
    "description": "Đội ngũ giảng viên học viện Timona Academy giàu kinh nghiệm giảng dạy, với thâm niên lên đến 15 năm. Mang đến cho học viên những buổi học chất lượng nhất",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Danh sách giảng viên",
      "itemListElement": [
      {
        "@type": "Person",
        "name": "Nguyễn Thị Kiều Oanh",
        "jobTitle": "Giám đốc học viện",
        "image": "https://drive.google.com/uc?id=12zrdu-Dpfj6D_b6Up0ZMumFI1ztqinql",
        "description": "Nguyễn Thị Kiều Oanh là giám đốc của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Với hơn 15 năm kinh nghiệm trong ngành thẩm mỹ. Được chứng nhận nhiều khoá điều trị da liễu cho bác sĩ và chuyên gia nước ngoài đứng lớp"
        
      },
      {
        "@type": "Person",
        "name": "Tiền Ngọc Hoàng Anh",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1kHfHDRn97LT4ThswOmK0wgzJVTDiIhhR",
        "description": "Tiền Ngọc Hoàng Anh là trưởng bộ phận chuyên môn Taza Group, đồng thời là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 10 năm kinh nghiệm làm việc trong ngành chăm sóc điều trị da. Cố vấn chuyên môn tại hệ thống thẩm mỹ Quốc tế"
      },
     {
        "@type": "Person",
        "name": "Nguyễn Nữ Hoài Vy",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1YPwwbTf6Whx2dECZx5IlTbMXRWuQNd56",
        "description": "Nguyễn Nữ Hoài Vy là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 10 năm kinh nghiệm làm việc và giảng dạy trong ngành phun xăm thẩm mỹ. Đồng thời là BGK cuộc thi phun xăm thẩm mỹ Asia Beauty Award 2021"
      },
    {
        "@type": "Person",
        "name": "Nguyễn Thị Tú Loan",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1XZaiFD1sW-WXFxmRUF0yfLBM3q2-9li4",
        "description": "Nguyễn Thị Tú Loan là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 8 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ. Nghệ Nhân BÀN TAY VÀNG - Bộ môn phun xăm thẩm mỹ năm 2016"
      },
    {
        "@type": "Person",
        "name": "Phạm Thị Thanh Thuỷ",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1WNeD-QetCH29SiXR0x72OKM83YaiLKoW",
        "description": "Phạm Thị Thanh Thuỷ là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 8 năm kinh nghiệm giảng dạy trong ngành phun xăm thẩm mỹ. Top 10 triển vọng - Phun mày tại cuộc thi phát triển nghề làm đẹp tại Việt Nam"
      },
    {
        "@type": "Person",
        "name": "Nguyễn Huỳnh Hưng",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1_r04RpaXPfB_ZvTe3MktcZqugk8cWon0",
        "description": "Nguyễn Huỳnh Hưng là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Anh có hơn 5 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ. Giải nhất hội thi giảng viên dạy giỏi cấp trường năm 2016"
      },
    {
        "@type": "Person",
        "name": "Nguyễn Thị Hiền",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=13YZCcd47ClHpx7gtc6RdlMnduEWR9yzA",
        "description": "Nguyễn Thị Hiền là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có 5 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ, Bàn tay Đồng - Chăm sóc và điều trị da tại cuộc thi Asian Beauty Award 2018"
      },
    {
        "@type": "Person",
        "name": "Chu Thị Thu Hằng",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1dmWjdqQuHrGYluFI8-mVa9_zypFl8xpT",
        "description": "Chu Thị Thu Hằng là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 5 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ. Thành viên BTC cuộc thi I'm a Champion 2021, Giảng viên dạy giỏi cấp trường 2021"
      },
    {
        "@type": "Person",
        "name": "Lê Thị Bảo Trân",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1pJgniS064WXPD7U83BfQ8z4_junSj356",
        "description": "Lê Thị Bảo Trân là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 5 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ. Đạt bàn tay bạc - chăm sóc và điều trị da tại cuộc thi asian beauty award 2018, giảng viên dạy giỏi cấp trường 2019"
      },
  {
        "@type": "Person",
        "name": "Trương Thị Hằng",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1Si3eWZ1-SpUpElfgTxvCYVg-YGpY86Lk",
        "description": "Trương Thị Hằng là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 5 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ. Giải nhất hội thi giảng viên dạy giỏi cấp trường năm 2020"
      },
   {
        "@type": "Person",
        "name": "Phạm Thị Kim Nhung",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1-ZolrAj_i_8PT98A_7RPYwfhhFR1j8_L",
        "description": "Phạm Thị Kim Nhung là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 5 năm kinh nghiệm giảng dạy trong ngành chăm sóc và điều trị da, nối mi. Giải nhất hội thi giảng viên dạy giỏi cấp trường năm 2019"
      },
  {
        "@type": "Person",
        "name": "Ngô Thị Tuyết",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1qO1z7EuAaK-Pez3hrqCd-pMAdVFi2qMn",
        "description": "Ngô Thị Tuyết là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 5 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ. Giải nhất hội thi giảng viên dạy giỏi cấp trường năm 2017, Nghệ nhân bàn tay vàng - Bộ môn chăm sóc và điều trị da 2017"
      }, 
  {
        "@type": "Person",
        "name": "Mai Thị Ẩn",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1RK3ad8IC2qvSlqOQkCWNDnDDF_H5DK3p",
        "description": "Mai Thị Ẩn là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 5 năm kinh nghiệm giảng dạy trong ngành chăm sóc và điều trị da, nối mi. Giải nhất hội thi giảng viên dạy giỏi cấp trường năm 2019"
      },
  {
        "@type": "Person",
        "name": "Phạm Thị Na",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1RNS5VLwEOz4ocCoxs1fbgxtpcNnE64Ga",
        "description": "Phạm Thị Na là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 5 năm kinh nghiệm giảng dạy trong ngành phun xăm thẩm mỹ. Đạt giải kỹ thuật vàng tại Asian Beauty Award 2017. Thành viên BTC cuộc thi phun xăm thẩm mỹ Asia Beauty Award 2021"
      },
  {
        "@type": "Person",
        "name": "Nguyễn Mỹ Bình",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=1KgvvEtT9azvjl0Z4uB-OebpYXlpkiaSv",
        "description": "Nguyễn Mỹ Bình là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 3 năm kinh nghiệm giảng dạy trong ngành phun xăm thẩm mỹ. Giải triển vọng cuộc thi Asian Beauty Award 2022"
      },
  {
        "@type": "Person",
        "name": "Nguyễn Thị Kiều Oanh",
        "jobTitle": "Giảng viên",
        "image": "https://drive.google.com/uc?id=18kh-sYNsXusgq_YCVB2mNY8oxkRG4Dl2",
        "description": "Nguyễn Thị Kiều Oanh là giảng viên của Học viện Đào tạo Thẩm mỹ Quốc tế Timona Academy. Cô có hơn 3 năm kinh nghiệm giảng dạy trong ngành thẩm mỹ. Giảng viên đào tạo giỏi 2020"
      }
        ]
    }
  }
}
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _SeotoolService: SeotoolService,
  ) {
  }
  ngOnInit(): void {
    this._SeotoolService.getSeotools().subscribe((data)=>{
      console.log(data);
      this.FilterLists = this.Lists = data
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.Lists = this.Lists.filter((v) => {
     return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
       }
      )
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this._SeotoolService.postSeotool(this.Detail).subscribe((data)=>this._Notification.notify('success','Thêm mới thành công'))
      }
    });
  }
}
