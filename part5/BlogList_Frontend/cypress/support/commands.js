
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
