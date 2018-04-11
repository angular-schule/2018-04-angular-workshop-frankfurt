import { browser, element, by } from 'protractor';

describe('compeople imprint', () => {

  beforeAll(() => browser.waitForAngularEnabled(false));

  it('should show the tax numer', () => {

    browser.get('https://www.compeople.de/impressum.html');

    const text = element(by.className('content'));
    expect(text.getText()).toContain('DE207665352');
  });

  afterAll(() => browser.waitForAngularEnabled(true));

});

