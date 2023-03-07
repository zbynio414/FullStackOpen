
Cypress.Commands.add('login_ui', ({ username, password }) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('login-api', ({ username, password }) => {
  cy.request('POST',`${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    window.localStorage.setItem(
      'loggedBlogListUser', JSON.stringify(body)
    )
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/blogs`,
    body:{ title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('loggedBlogListUser')).token}`
    }
  })

  cy.visit('')
})
