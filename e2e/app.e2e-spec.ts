import { TinymceDemoPage } from './app.po';

describe('tinymce-demo App', function() {
  let page: TinymceDemoPage;

  beforeEach(() => {
    page = new TinymceDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
