describe('Basic freshStorage Tests', () => {
  beforeEach(() => {
    cy.visitPage();
  });

  it('can\'t retrieve data that has not been stored.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      expect(freshStorage.getItem('key1')).to.be.null;
    });
  });

  it('will not override other keys with new key/value pair.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'value1', '100ms');
      freshStorage.setItem('key2', 'value2', '100ms');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key2')).not.to.equal('value1');
    });
  });

  it('won\'t store an invalid key. (boolean)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      try{
        freshStorage.setItem(true, 'value1', '1000ms');
      } catch (err) {
        expect(err.message).to.contain('[011]');
      }
      expect(localStorage).to.be.empty;
    });
  });

  it('won\'t store an invalid key. (object)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      try{
        freshStorage.setItem({key1:'key1'}, 'value1', '1000ms');
      } catch (err) {
        expect(err.message).to.contain('[011]');
      }
      expect(localStorage).to.be.empty;
    });
  });

  it('won\'t store an invalid key. (array)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      try{
        freshStorage.setItem(['key1', 'key2'], 'value1', '1000ms');
      } catch (err) {
        expect(err.message).to.contain('[011]');
      }
      expect(localStorage).to.be.empty;
    });
  });

  it('won\'t store an invalid key. (null)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      try{
        freshStorage.setItem(null, 'value1', '1000ms');
      } catch (err) {
        expect(err.message).to.contain('[011]');
      }
      expect(localStorage).to.be.empty;
    });
  });

  it('won\'t store an invalid key. (undefined)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      try{
        freshStorage.setItem(undefined, 'value1', '1000ms');
      } catch (err) {
        expect(err.message).to.contain('[011]');
      }
      expect(localStorage).to.be.empty;
    });
  });

  it('won\'t store an invalid key. (empty-string)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      try{
        freshStorage.setItem(undefined, 'value1', '1000ms');
      } catch (err) {
        expect(err.message).to.contain('[011]');
      }
      expect(localStorage).to.be.empty;
    });
  });

  it('can\'t store an expired object.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      try {
        freshStorage.setItem('key1', 'value1', new Date(new Date().getTime()-100));
      } catch (err) {
        expect(err.message).to.contain('[015]');
      }
      expect(localStorage).to.be.empty;
    });
  });
})
