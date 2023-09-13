describe('Stepping Stones About page test', () => {
    beforeEach(() => {
        cy.visit('/about')
    })
    it('should have a title', () => {
        cy.get('[data-test="about-page-title"]').should(
          'contain.text',
          'About'
        )
    })
    it('should have a subtitle', () => {
        cy.get('[data-test="about-page-subtitle"]').should(
          'contain.text',
          'Information that fits your business needs'
        )
    })
  
});