'use strict'

describe('Pruebas de expenses', () => {
    before(()=>{        
        cy.exec('php artisan custom:clear-database')        
        cy.fixture('user.json').as('userData')
        cy.visit('/login')
        cy.get('@userData').then((userData) => {            
            cy.createUser(userData)
            cy.visit('/expense_reports')
            cy.wait(3000)
        })
    })       

    it('Debe crear un report', () => {
        cy.get('@userData').then((userData) => {            
            cy.contains('.btn','Create a new report').as('botonCrear')
            cy.get('@botonCrear').should('be.enabled')
            cy.get('@botonCrear').click()
            
            cy.get('#title').type(Cypress.env('expenseTitle'))
            cy.contains('.btn','Submit').as('botonCrear2')
            cy.get('@botonCrear2').should('be.enabled')
            cy.get('@botonCrear2').click()

            cy.contains('#navbarDropdown',userData.name).should('be.visible')
            cy.contains('a',Cypress.env('expenseTitle')).should('be.visible')
        })
    })
})