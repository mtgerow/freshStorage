describe('freshStorage Variable Type Tests', () => {
  beforeEach(() => {
    cy.visitPage();
  });

  it('can store and retrieve a string.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', 'stringValue', '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.equal('stringValue');
    });
  });

  it('can store and retrieve a number.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      const value = 2;
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', value, '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.equal(value);
    });
  });

  it('can store and retrieve an array.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      const value = ['value1', 'value2'];
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', value, '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.deep.equal(value);
    });
  });


  it('can store and retrieve a date.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      const value = new Date();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', value, '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.deep.equal(value);
    });
  });

  it('can store and retrieve an object.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      const value = { username: 'first last', id: 1234, disabled: false, rights: ['can_add_comments', 'access_637q02ie2', 'access_d362o29p02'] };
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', value, '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.deep.equal(value);
    });
  });

  it('can store and retrieve null.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      const value = null;
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', value, '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.be.null;
    });
  });

  it('can store and retrieve undefined.', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      const value = undefined;
      expect(localStorage).to.be.empty;
      freshStorage.setItem('key1', value, '1d');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('key1')).to.be.undefined;
    });
  });


})
