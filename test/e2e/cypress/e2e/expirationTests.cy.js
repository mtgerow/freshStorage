describe('freshStorage Expiration Tests - PURPOSEFULLY SLOW TESTS', () => {
  beforeEach(() => {
    cy.visitPage();
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



  it('will expire after an expiration period. (milliseconds)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('keyAsync1', 'value1', '10ms');
      expect(localStorage).to.not.be.empty;
      expect(freshStorage.getItem('keyAsync1')).to.equal('value1');
      cy.wait(12).then(()=>expect(freshStorage.getItem('keyAsync1')).to.be.undefined);
    });
  });

  it('will expire after an expiration period. (seconds)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('keyAsync2', 'value2', '12s');
      expect(localStorage).to.not.be.empty;
      cy.wait(3000).then(()=>expect(freshStorage.getItem('keyAsync2')).to.equal('value2'));
      cy.wait(10000).then(()=>expect(freshStorage.getItem('keyAsync2')).to.be.undefined);
    });
  });

  it('will expire after an expiration period. (minutes)', () => {
    cy.window().then(window => {
      const {freshStorage, localStorage} = window;
      localStorage.clear();
      expect(localStorage).to.be.empty;
      freshStorage.setItem('keyAsync3', 'value3', '1m');
      expect(localStorage).to.not.be.empty;
      cy.wait(6000).then(()=>expect(freshStorage.getItem('keyAsync3')).to.equal('value3'));
      cy.wait(60010).then(()=>expect(freshStorage.getItem('keyAsync3')).to.be.undefined);
    });
  });
})
