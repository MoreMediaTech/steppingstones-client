describe('Stepping Stones Login page test', () => {
    beforeEach(() => {
        cy.visit('/auth/login');
    });

    it('should have a title', () => {
        cy.getDataTest('login-page-title').should(
          'contain.text',
          'Welcome back!'
        )
    });
    it('Test the login form', () => {
        cy.getDataTest('login-form-email-input').find('input').type('adewoyin@aolausoro.tech')
        cy.getDataTest('login-form-button').click()
    });
});