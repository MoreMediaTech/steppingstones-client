describe('Stepping Stones Enquire page test', () => {
    beforeEach(() => {
        cy.visit('/enquire');
    });

    it('should have a title', () => {
        cy.getDataTest('enquire-page-title').should(
          'contain.text',
          'Leave a message'
        )
    });
});