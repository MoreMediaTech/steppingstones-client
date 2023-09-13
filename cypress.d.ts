declare namespace Cypress {
  interface Chainable<Subject> {
    getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>
  }
}
