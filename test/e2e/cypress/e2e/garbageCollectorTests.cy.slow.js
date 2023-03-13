describe('freshStorage Garbage Collector Tests - PURPOSEFULLY SLOW TESTS', () => {
  beforeEach(() => {
    cy.visitPage();
  });

  it('can clean up an item that is expired.', () => {
    cy.window()
      .then(window => {
        const {
          freshStorage,
          localStorage
        } = window;
        localStorage.clear();
        expect(localStorage).to.be.empty;
        freshStorage.setItem('key1', 'value1', '10ms');
        expect(localStorage).to.not.be.empty;
        const fullObj = JSON.parse(localStorage.getItem('__fs__key1'));
        expect(fullObj).to.not.be.null;
        expect(fullObj).to.not.be.undefined;
        expect(fullObj.exp).to.be.greaterThan(new Date().getTime());

        cy.wait(200).then(() => {
          freshStorage.clean();
          expect(freshStorage.getItem('key1')).to.be.null;
          expect(localStorage.getItem('__fs__key1')).to.be.null;
        });
      });
  });

  it('will not remove items from the standard localStorage interface.', () => {
    cy.window()
      .then(window => {
        const {
          freshStorage,
          localStorage
        } = window;
        localStorage.clear();
        expect(localStorage).to.be.empty;
        freshStorage.setItem('key1', 'value1', '10ms');
        localStorage.setItem('key2', 'value2');
        expect(localStorage).to.not.be.empty;
        const fullObj = JSON.parse(localStorage.getItem('__fs__key1'));
        expect(fullObj).to.not.be.null;
        expect(fullObj).to.not.be.undefined;
        expect(fullObj.exp).to.be.greaterThan(new Date().getTime());
        const value2 = localStorage.getItem('key2');
        expect(value2).to.not.be.null;
        expect(value2).to.not.be.undefined;

        cy.wait(200).then(() => {
          freshStorage.clean();
          expect(freshStorage.getItem('key1')).to.be.null;
          expect(localStorage.getItem('__fs__key1')).to.be.null;
          expect(freshStorage.getItem('key2')).to.be.null;
          expect(localStorage.getItem('key2')).to.not.be.null;
        });
      });
  });

  it('will clean up automatically an item that is expired.', () => {
    cy.window()
      .then(window => {
        const {
          freshStorage,
          localStorage
        } = window;
        localStorage.clear();
        expect(localStorage).to.be.empty;
        freshStorage.setItem('key1', 'value1', '10ms');
        expect(localStorage).to.not.be.empty;
        const fullObj = JSON.parse(localStorage.getItem('__fs__key1'));
        expect(fullObj).to.not.be.null;
        expect(fullObj).to.not.be.undefined;
        expect(fullObj.exp).to.be.greaterThan(new Date().getTime());

        cy.wait((2*60*1000) + 200).then(() => {
          freshStorage.clean();
          expect(freshStorage.getItem('key1')).to.be.null;
          expect(localStorage.getItem('__fs__key1')).to.be.null;
        });
      });
  });

});
