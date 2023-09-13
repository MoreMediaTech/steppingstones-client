describe('Stepping Stones Register page test', () => {
  beforeEach(() => {
    cy.visit('/register-now')
  })

  it('should have a title', () => {
    cy.getDataTest('register-now-page-title').should(
      'contain.text',
      'Launching Soon'
    )
  })
})
