describe('Basic freshStorage Tests', () => {
  beforeEach(() => {
    cy.visitPage();
  });

  it('can store and retrieve data.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.equal('value1');
    });
  });

  it('can store data with future expiration date.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', '1d');
      expect(localStorage).to.not.be.empty;
      const fullObj = JSON.parse(localStorage.getItem('fresh_storage_key1'));
      expect(fullObj).to.not.be.undefined;
      expect(fullObj.exp).to.be.greaterThan(new Date().getTime());
    });
  });

  it('will manage multiple key/value pairs.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', '100ms');
      freshStorage.setItem('key2', 'value2', '100ms');
      expect(localStorage).to.not.be.empty;
      expect(localStorage.length).to.equal(2);
    });
  });

  it('can remove a key/value pair.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', '1000ms');
      expect(localStorage).to.not.be.empty;
      expect(localStorage.length).to.equal(1);
      freshStorage.removeItem('key1');
      expect(localStorage).to.be.empty;
    });
  });

  it('can clear all key/value pairs.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', '100ms');
      freshStorage.setItem('key2', 'value2', '100ms');
      expect(localStorage).to.not.be.empty;
      expect(localStorage.length).to.equal(2);
      freshStorage.clear();
      expect(localStorage).to.be.empty;
    });
  });

  it('won\'t return expired data.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('keyAsync1', 'value1', '100ms');
      expect(localStorage).to.not.be.empty;
      setTimeout(()=>{
        expect(freshStorage.getItem('key1')).to.be.undefined;
      }, 110);
    });
  });
})
