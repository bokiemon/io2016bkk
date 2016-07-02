import { Io2016Page } from './app.po';

describe('io2016 App', function() {
  let page: Io2016Page;

  beforeEach(() => {
    page = new Io2016Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
