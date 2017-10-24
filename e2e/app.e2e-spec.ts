import { GIPage } from './app.po';

describe('gi App', () => {
  let page: GIPage;

  beforeEach(() => {
    page = new GIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
