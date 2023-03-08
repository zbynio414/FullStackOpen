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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('zkowalkowski')
      cy.get('#password').type('haslo')
      cy.get('#login-button').click()

      cy.contains('Zbigniew Kowalkowski logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('zkowalkowski')
      cy.get('#password').type('zlehaslo')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login_ui({ username: 'zkowalkowski', password: 'haslo' })

      // cy.get('#username').type('zkowalkowski')
      // cy.get('#password').type('haslo')
      // cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()

      cy.contains('a new blog: test title by test author added')
    })

    it('User can like a blog', function () {
      // const blog = { title: 'like test title', author: 'like test author', url: 'like test url' }
      // cy.createBlog(blog)

      cy.contains('New blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()

      cy.contains('button', 'view').click()
      cy.contains('button', 'like').click()
      cy.get('html').contains('1')
    })

    it('A blog can be deleted', function () {
      cy.contains('New blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('html').not('test title')
    })

    it('user that not create the blog is not possible to see remove buttor', function () {
      cy.contains('New blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()


      cy.contains('Logout').click()
      cy.get('h2').should('contain', 'Login')
      const user = {
        name: 'test',
        username: 'testowy',
        password: 'haslo'
      }
      cy.createUser(user)
      cy.login_ui({ username: user.username, password: user.password })

      cy.contains('view').click()
      cy.get('.blog').contains('remove').parent().should('have.css', 'display', 'none')
    })

    it.only('desc blog order', function() {
      cy.contains('New blog').click()
      cy.get('#input-title').type('second')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()

      cy.contains('New blog').click()
      cy.get('#input-title').type('first')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#create-blog-button').click()

      cy.get('.blog').contains('first').as('first')
      cy.get('@first').contains('view').click()

      cy.get('@first').contains('like').click()
      cy.wait(500)
      cy.get('@first').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'first')
      cy.get('.blog').eq(1).should('contain', 'second')
    })
  })
})