// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginUser',(username, password)=>{
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.contains('.btn','Login').click()
    cy.wait(3000)  
})

Cypress.Commands.add('createUser',(userData)=>{
    cy.contains('Register').click()
    cy.get('#name').type(userData.name)
    cy.get('#email').type(userData.email)
    cy.get('#password').type(userData.password)
    cy.get('#password-confirm').type(userData.password)
    cy.contains('.btn','Register').click()
    cy.wait(3000)
    cy.contains('The email has already been taken').should('not.exist')
})
