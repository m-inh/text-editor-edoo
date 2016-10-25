import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.PluginManager.add('stylebuttons', function (editor, url) {
      ['h1', 'h2', 'h3'].forEach(function (name) {
        editor.addButton("style-" + name, {
          tooltip: "Heading " + name.charAt(1),
          text: name,
          onClick: function () {
            editor.execCommand('mceToggleFormat', false, name);
          },
          onPostRender: function () {
            var self = this, setup = function () {
              editor.formatter.formatChanged(name, function (state) {
                self.active(state);
              });
            };
            editor.formatter ? setup() : editor.on('init', setup);
          }
        })
      });
    });

    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'stylebuttons'],
      skin_url: 'assets/skins/lightgray',
      min_height: 200,
      menubar: false,
      target_list: false,
      link_title: false,
      toolbar1: 'style-h1 style-h2 style-h3 | bold italic | bullist numlist | link | blockquote',
      // file_picker_types: 'file image media',
      // file_picker_callback: function (callback, value, meta) {
      //   // Provide file and text for the link dialog
      //   if (meta.filetype == 'file') {
      //     callback('mypage.html', {text: 'My text'});
      //   }
      //
      //   // Provide image and alt text for the image dialog
      //   if (meta.filetype == 'image') {
      //     callback('myimage.jpg', {alt: 'My alt text'});
      //   }
      //
      //   // Provide alternative source and posted for the media dialog
      //   if (meta.filetype == 'media') {
      //     callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
      //   }
      // },
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
