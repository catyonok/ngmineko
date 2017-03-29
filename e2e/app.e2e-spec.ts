import { NgminekoPage } from './app.po';

describe('ngmineko App', () => {
  let page: NgminekoPage;

  beforeEach(() => {
    page = new NgminekoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
