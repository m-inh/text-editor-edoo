import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<simple-tiny
    [elementId]="'my-editor-id'"
    (onEditorKeyup)="keyupHandlerFunction($event)">
    </simple-tiny>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  
}
