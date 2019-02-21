'use strict'

import { callbackify } from "util";

describe('Pruebas del login', () => {

    before(() => {
        cy.exec('php artisan custom:clear-database')
    })
    
    beforeEach(() => {
        cy.fixture('user.json').as('userData')
        cy.visit('/login')
        cy.contains('.card-header','Login').should('be.visible')        
    })   
    
    it('Debe registrar un usuario', () => {         
        cy.get('@userData').then((userData) => {
            cy.createUser(userData)
            cy.screenshot('create-user')
        })         
    })

    it('Debe loguear un usuario', () => {       
        cy.get('@userData').then((userData) => {
            cy.loginUser(userData.email, userData.password)
            cy.screenshot('login-user')            
            cy.contains('These credentials do not match our records.').should('not.exist')
        })
   })

   it('Debe fallar al loguear un usuario', () => {    
        cy.loginUser('fail@test.com','test1234')        
        cy.contains('These credentials do not match our records.').should('be.visible')
        cy.screenshot('login-failed', { blackout: ['#email'] })
    })

    after(() => {
        cy.log('Tests finalizados')
    })
})