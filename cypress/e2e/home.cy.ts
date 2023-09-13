describe('Stepping Stones Home page test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Home page contains correct call to action text', () => {
    cy.getDataTest('hero-title').should(
      'contain.text',
      'Empowering Business for Success'
    )
  })
  it('Faq item Accordion works correctly', () => {
    // cy.contains(
    //   /More Media Tech is currently building the Stepping Stones App/i
    // ).should('not.be.visible')
    cy.get(
      '[data-test="faq-accordion-item-1"] [data-test="faq-accordion-trigger-1"]'
    ).click()
    cy.contains(
      /More Media Tech is currently building the Stepping Stones App/i
    ).should('be.visible')
  })
})
