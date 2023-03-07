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

  describe('When logged in', function() {
    beforeEach(function() {
      // fn login does not set the state in BlogList form with token
      // cy.login({ username: 'zkowalkowski', password: 'haslo' })
      cy.get('#username').type('zkowalkowski')
      cy.get('#password').type('haslo')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()

      cy.contains('a new blog: test title by test author added')
    })
    it('A blog can be deleted', function() {
      cy.contains('New blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('html').not('test title')
    })
  })

})