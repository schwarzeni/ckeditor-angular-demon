import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

/**
 *  添加保存文件的功能
 */
export function SaveFilePlugin(editor) {

  editor.ui.componentFactory.add( 'save', locale => {
    const view = new ButtonView( locale );

    view.set( {
      label: '保存',
      withText: true,
    } );

    // Callback executed once the image is clicked.
    view.on( 'execute', () => {
      const func = editor.config.get('uploadContent');
      func();
    } );

    return view;
  } );
}
