describe('Blog_List_App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Zbigniew Kowalkowski',
      username: 'zkowalkowski',
      password: 'haslo',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('zkowalkowski')
      cy.get('#password').type('haslo')
      cy.get('#login-button').click()

      cy.contains('Zbigniew Kowalkowski logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('zkowalkowski')
      cy.get('#password').type('zlehaslo')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})