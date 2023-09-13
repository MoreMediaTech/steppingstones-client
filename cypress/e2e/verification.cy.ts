describe('Stepping Stones verification page test', () => {
    beforeEach(() => {
        cy.visit('/auth/verification');
    });
    it('should have a title', () => {
        cy.getDataTest('verification-page-title').should(
          'contain.text',
          'Enter verification code!'
        )
    });
});