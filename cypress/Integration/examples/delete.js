/// <reference types="Cypress"/>

let testid 
describe('Testing initiaves', () => {

    before(function(){
        // runs once before all tests
        cy.fixture('example').then(function(data){
            this.data=data
        })
    })


  it('login into the app', () => {
    cy.intercept('POST', '**/api/v1/campaigns').as('inti')
  
    cy.loginToKapost('https://arontier.pilyr.com/','mhimanshu@uplandsoftware.com','Manish@12345')
    cy.wait(1000)
    cy.contains('button', 'Create').click()
    cy.get('.choose-campaign').click()
    cy.get('#campaign-title').type('test_200123_2')
    cy.get('[form="create-campaign-form"]').click()
    // cy.wait('@inti').then(({ response: { body : { id }}}) => {
    //   testid = id
    // })

      cy.wait('@inti').then((resp)=>{
        testid = resp.response.body.response.id
          cy.log(testid)
      })

    cy.request('GET', 'api/v1/profile').then(({ body: { response: { token } } }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v1/initiatives/${testid}`,
        headers: {
          authorization: 'Bearer ' + token
        }
      }).then(resp => {
        expect(resp.status).to.eq(200)
      })
    })
  })
})

