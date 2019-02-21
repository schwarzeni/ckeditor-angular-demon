export class FileUploadAdapter {
  loader;
  http;
  editor;

  constructor(loader, editor) {
    this.loader = loader;
    this.editor = editor;
    this.http = this.editor.config.get('http');
  }
  upload() {

    const data = new FormData();

    data.append('file', this.loader.file);
    return new Promise((resolve, reject) => {

      this.http.post(
        '/upload',
        data)
        .subscribe(
          (resp) => {
            console.log(resp)
            resolve({
              default: resp.default
            });
          },
          (err) => reject(err));
    });
  }
  abort() {
  }
}


export function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new FileUploadAdapter(loader, editor);
  };
}
