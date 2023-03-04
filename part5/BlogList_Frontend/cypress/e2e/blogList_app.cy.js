describe('Blog_List_App', function () {
  it('front page initial screen is login', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
  })
})