

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
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add("loginToKapost", (url,username,password) => {
    cy.visit(url)
    cy.get('#user_email').type(username) 
    cy.get('#user_password').type(password)
    cy.get('.button').click()

})


Cypress.Commands.add("selectDateInitiative", (Date) => {

    cy.get('.ui-state-default').each(($e1, day, $list) => {
        if($e1.text().includes(Date)){
            cy.get('.ui-state-default').eq(day).click()
        }
    })

})


Cypress.Commands.add("deleteInitiative",(initiative_Id)=>{

    cy.request('GET','api/v1/profile').then(({body : {response : {token}}}) => {
        cy.request({
            method: 'DELETE',
            url: `api/v1/initiatives/${initiative_Id}`,
            headers: {
                authorization: 'Bearer' + token
            }
        }).then(resp=>{
            expect(resp.status).to.eq(200)              
        })
    })
})




//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })