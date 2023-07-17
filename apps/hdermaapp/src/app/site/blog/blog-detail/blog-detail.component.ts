import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BaivietService } from '../../../shared/baiviet.service';

@Component({
  selector: 'tazagroup-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit {
  APITINYMCE!:string
  id!:string
  constructor(private _baivietService: BaivietService, private route: ActivatedRoute) {
    this.APITINYMCE = environment.APITINYMCE;
  }
  items:any = [
    {
      Title:'Cocoon x AAF: Chung tay bảo vệ loài gấu cùng Tổ chức Động vật Châu Á',
      Image:'https://image.cocoonvietnam.com/uploads/Website_Posts_2_01c6db287a.jpg',
      Des:'Cocoon tin rằng, dù bạn là ai, bạn đến từ đâu và bạn đang làm công việc gì thì CHẤT bên trong bạn chính là những điều rất tuyệt vời mà không một ai có thể thay thế. Hãy tiếp tục nỗ lực, tiếp tục khám phá và đánh thức vị “nữ hoàng” bên trong, bạn sẽ tỏa sáng theo cách mà mình muốn'
    },
    {
      Title: 'Cocoon x Suboi: “Queen” Chất - “luôn có một nữ hoàng hiện diện trong bản thân bạn"',
      Image: 'https://image.cocoonvietnam.com/uploads/HAU_05224_Vuong_Website_b76c8e6bda.png',
      Des:'Tiếp tục lan tỏa các “thông điệp xanh” hướng đến Mẹ Trái Đất, nhân rộng phạm vi chương trình đổi vỏ chai cũ và đáp ứng mong mỏi của rất nhiều quý khách hàng, từ ngày 02/06/2021, Cocoon sẽ áp dụng thêm hình thức đổi vỏ chai online. Từ đây, dù bạn ở bất cứ nơi đâu tại Việt Nam thì đều có thể tham gia đổi vỏ chai cũ.'
    },
    {
      Title:'Ngành công nghiệp làm đẹp đã tác động thế nào lên động vật vô tội?',
      Image:'https://image.cocoonvietnam.com/uploads/z2910986494404_9274f93843560a34091bde3cc4419ced_664e4e46bc.jpg',
      Des:'Ngành công nghiệp làm đẹp với vẻ ngoài mỹ miều ẩn chứa nhiều sự thật vô nhân đạo. Nhất là đối với các quy trình sản xuất mỹ phẩm dựa trên nguyên liệu có nguồn gốc từ động vật.'
    }
  ]
  data:any = [{}]
  ngOnInit(): void {
    //chi tiet bai viet
    this.route.params.subscribe((paramsId) => {
      this.id = paramsId['slug'];
      this.data = {}
      if (this.id) {
        this._baivietService.getBaivietBySlug(this.id).subscribe()
        this._baivietService.baiviet$.subscribe(res => {
          if (res) {
            this.data = res
          }
        })
      }
    }
    )
    //bai viet
    this._baivietService.getBaiviets().subscribe()
    this._baivietService.baiviets$.subscribe(res => {
      if(res){
        this.items = res
        
      }
    })
  }
}
