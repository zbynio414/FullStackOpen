
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST',`${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    window.localStorage.setItem(
      'loggedBlogListUser', JSON.stringify(body)
    )
    cy.visit('')
  })
})
