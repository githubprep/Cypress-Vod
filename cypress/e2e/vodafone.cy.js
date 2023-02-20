/// <reference types="cypress" />
describe('Website Tests', () => {
  const loginUrl = 'https://www.vodafone.de/business/business-portale/login.html'
  const usernameInput = '#username'
  const passwordInput = '#password'
  const loginButton = 'button[type="submit"]'
  const cookiesButton = '[tabindex="1"]'
  const breadcrumbLogin = '[data-cy="breadcrumb-link"]'
  const homeBreadcrumb = '.fBvmPd'
  const errorMessage = '.Content-sc-iywq2w > p'
  beforeEach(() => {
    cy.viewport(1980, 1080)
    cy.on('uncaught:exception', (err, runnable) => { return false })
    cy.visit(loginUrl)
    cy.get(cookiesButton).click()
  });


  it('Check Login BreadCrumb', () => {
    cy.get(breadcrumbLogin).should('contain', "Login")
    cy.location('pathname').should('eq', '/business/business-portale/login.html')
  })

  it('Check Home Breadcrumb', () => {
    cy.get(homeBreadcrumb).should('contain', "Geschäftskunden")
    cy.location('pathname').should('eq', '/business/business-portale/login.html')
  })


  it('Login behavior', () => {
    cy.get(usernameInput).type("invalid_user", { delay: 0 })
    cy.get(passwordInput).type('invalid_password123')
    cy.get(loginButton).click()
    cy.get(errorMessage).should('be.visible')
  })

  // it('Check Link Collection', () => {
  //   cy.visit('https://www.vodafone.de/business/business-portale/login.html')
  //   cy.get('a').each(link => {
  //     cy.request(link.prop('href')).its('status').should('equal', 200)
  //   })
  // })

  it('Find broken links', () => {
    cy.get('a').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        })

      cy.log(link.prop('href'))

    })
  })
  
})
