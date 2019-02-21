import {Component} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';
import {HttpClient} from '@angular/common/http';
import {CustomUploadAdapterPlugin} from './fileupload.ckeditor';
import {SaveFilePlugin} from './savefile.ckeditor';

@Component({
  selector: 'app-root',
  template: `
    <ckeditor
      [(ngModel)]="article.content" [editor]="Editor"
      [config]="config"
    >
    </ckeditor>
  `
})
export class AppComponent {
  public Editor = ClassicEditor;
  public config
  article = {content: ''};

  constructor(private http: HttpClient) {
    this.config = {
      // 配置语言
      language: 'zh-cn',
      toolbar: ['imageUpload', '|', 'bold', '|', 'save'],
      http,
      uploadContent: () => this.uploadContent(),
      extraPlugins: [CustomUploadAdapterPlugin, SaveFilePlugin]
    };
  }

  uploadContent() {
    this.http.post('/upload/content', this.article)
      .subscribe((resp) => {
        console.log(resp);
      }, (err) => {
        console.log(err);
      });
  }
}
