///<reference types="cypress" />

describe('login google', () => {
    it('do it', () => {

        // cy.viewport(1366, 768)
        // cy.visit('https://play.google.com/intl/pt-BR/console/about')
        // cy.get('.navbar-cta > .btn-primary').click()

        cy.visit('https://accounts.google.com/signin/v2/identifier?service=androiddeveloper&passive=true&continue=https%3A%2F%2Fplay.google.com%2Fconsole%2Fdeveloper%2F&flowName=GlifWebSignIn&flowEntry=ServiceLogin')
            // cy.visit('https://accounts.google.com/signin/v2/identifier?service=androiddeveloper&passive=true&continue=https%3A%2F%2Fplay.google.com%2Fconsole%2Fdeveloper%2F&flowName=GlifWebSignIn&flowEntry=ServiceLogin')

        // cy.log(Cypress.env('email'))
        cy.get('#identifierId').type(Cypress.env('email'))
        cy.contains('Próxima').click()

        cy.get('#password').type('qweqwe')
    })
})