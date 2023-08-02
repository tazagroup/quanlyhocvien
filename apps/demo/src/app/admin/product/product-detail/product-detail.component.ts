import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/demo/src/environments/environment';
import { EditorComponent } from '@tinymce/tinymce-angular';
import tinymce from 'tinymce';
import { DanhmucProductService } from '../../danhmuc-product/danhmuc-product.service';
import { TagsService } from '../../tags/tags.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'tazagroup-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  APITINYMCE!: string;
  product: any;
  selectedFiles?: FileList;
  slug!: string;
  danhmucs: any = [];
  tags!: any[];
  tinhtrangdas!: any[];
  loaisanphams!: any[];
  ListImage: any = {};
  tagsTinhtrangData = [];
  tagsLoaiSpData = [];

  constructor(
    private _productService: ProductService,
    private _DanhmucService: DanhmucProductService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _tagService: TagsService
  ) {
    this.APITINYMCE = environment.APITINYMCE;
  }

  configTiny: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount media save',
    toolbar:
      'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image media save',
    image_advtab: false,
    image_description: true,
    image_dimensions: false,
    block_unsupported_drop: true,
    images_reuse_filename: true,
    paste_data_images: false,
    height: '300px',

    images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append('file', file);
      const promise = new Promise<string>((resolve, reject) => {
        this._productService.uploadDriver(formData).subscribe((res) => {
          if (res) {
            resolve(`https://drive.google.com/uc?id=${res.idDrive}`);
          }
        });
      });
      return promise;
    },
    entity_encoding: 'raw',
    file_picker_types: 'image media',
    file_picker_callback: function (cb, value, meta: any) {
      if (meta.filetype == 'media') {
        const input: any = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('accept', 'media/*');

        input.onchange = function () {
          const file = input.files[0];
          const reader = new FileReader();
          this.file = file;
          const formData = new FormData();
          formData.append('file', file);

          const upload = function () {
            fetch(environment.APIURL + '/upload/file', {
              method: 'POST',
              body: formData,
            })
              .then((response: any) => {
                return response.json();
              })
              .then((success) => {
                return cb(`https://drive.google.com/uc?id=${success.idDrive}`);
              })
              .catch((error) => console.log(error));
          };
          upload();
          // reader.onload = function () {
          //   const id = 'blobid' + new Date().getTime();
          //   const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          //   const base64 = (<string>reader.result).split(',')[1];
          //   const blobInfo = blobCache.create(id, file, base64);
          //   blobCache.add(blobInfo);
          // };
          reader.readAsDataURL(file);
        };
        // cb('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
        input.click();
      }
    },
    // init_instance_callback: function (editor) {},
  };

  onFileBrowse(event: any, i: number) {
    event.target as HTMLInputElement;
    const file: any = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this._productService.uploadDriver(formData).subscribe((res) => {
      if (res) {
        if (i == 1) {
          this.product.Image = res.idDrive;
        } else if (i == 2) {
          this.product.Image1 = res.idDrive;
        } else if (i == 3) {
          this.product.ContentImage = res.idDrive;
        } else if (i == 4) {
          this.product.Imagecachsudung = res.idDrive;
        }
      }
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  removeImage(i: any) {
    delete this.product.ListImage[i];
  }

  uploadListImage() {
    if (this.selectedFiles) {
      const number = Object.keys(this.ListImage).length;

      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file: File | null = this.selectedFiles[i];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          const promise = new Promise<string>((resolve) => {
            this._productService.uploadDriver(formData).subscribe((res) => {
              if (res) {
                resolve(res.idDrive);
              }
            });
          });
          if (number > 0) {
            promise.then((x) => {
              this.ListImage[i + number] = x;
            });
          } else {
            promise.then((x) => {
              this.ListImage[i] = x;
            });
          }
        }
      }
      this.selectedFiles = undefined;
    }
  }
  selectTags() {
  }
  onSubmit() {
    this._productService.postProduct(this.product).subscribe();
  }

  updateSanpham() {
    console.log(this.product);
    console.log(this.product);

    const Tags = this.tagsLoaiSpData.concat(this.tagsTinhtrangData);
    this.product.Tags = Tags;
    this._productService.updateProduct(this.product).subscribe((res) => {
      if (res) {
        alert('Cập nhật thành công');
      }
    });
  }
  compareFn(o1: any, o2: any) {
    return o1.id == o2.id;
  }
  ngOnInit(): void {
    this.product = {
      Tieude: '',
      Mota: ' ',
      Thanhphan: '',
      Huongdan: '',
      idDM: '',
      Khoiluong: '',
      Thuonghieu: '',
      Code: '',
      Slug: '',
      SKU: '',
      Tags: [],
      ListImage: {},
      ContentImage: '',
      GiaSale: 0,
      Gia: 0,
      Image: '',
      Type: '',
      Thongtin: '',
      Ordering: 0,
      Trangthai: 0,
    };
    this._DanhmucService.getDanhmucs().subscribe();
    this._DanhmucService.danhmucs$.subscribe((res) => {
      if (res) {
        this.danhmucs = res;
      }
    });
    this._tagService.getTags().subscribe();
    this._tagService.tags$.subscribe((res) => {
      if (res) {
        this.tags = res;
        this.tinhtrangdas = res.filter((x) => x.Loaitag == 0);
        this.loaisanphams = res.filter((x) => x.Loaitag == 1);
      }
    });
    this.ListImage = this.product.ListImage;
    this.route.params.subscribe((paramsId) => {
      this.slug = paramsId['slug'];
      if (this.slug) {
        this._productService.getProductDetail(this.slug).subscribe();
        this._productService.product$.subscribe((res) => {
          if (res) {
            this.product = res;
            this.tagsLoaiSpData = this.product.Tags.filter(
              (x: any) => x.Loaitag == 1
            );
            this.tagsTinhtrangData = this.product.Tags.filter(
              (x: any) => x.Loaitag == 0
            );
            this.ListImage = this.product.ListImage;
          }
        });
      }
    });
  }
}
