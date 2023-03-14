describe('freshStorage Expiration Tests - PURPOSEFULLY SLOW TESTS', () => {
  beforeEach(() => {
    cy.visitPage();
  });

  it('can store expiration date with a milliseconds number.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', 12);
      expect(localStorage).to.not.be.empty;
      const fullObj = JSON.parse(localStorage.getItem('__fs__key1'));
      expect(fullObj).to.not.be.undefined;
      expect(fullObj.exp).to.be.greaterThan(new Date().getTime());
    });
  });

  it('can store expiration date with a shorthand string.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', '15ms');
      expect(localStorage).to.not.be.empty;
      const fullObj = JSON.parse(localStorage.getItem('__fs__key1'));
      expect(fullObj).to.not.be.undefined;
      expect(fullObj.exp).to.be.greaterThan(new Date().getTime());
    });
  });

  it('can store expiration date with a Date object.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      const now = new Date();
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', new Date(now.getTime()+15));
      expect(localStorage).to.not.be.empty;
      const fullObj = JSON.parse(localStorage.getItem('__fs__key1'));
      expect(fullObj).to.not.be.undefined;
      expect(fullObj.exp).to.be.greaterThan(new Date().getTime());
    });
  });
});
