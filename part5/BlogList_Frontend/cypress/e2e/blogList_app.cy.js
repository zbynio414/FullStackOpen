describe('Blog_List_App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })
})