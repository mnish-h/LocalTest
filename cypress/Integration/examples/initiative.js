/// <reference types="Cypress"/>
let initid
// let authtoken
describe('test suite', function()
{
    before(function(){
        // runs once before all tests
        cy.fixture('example').then(function(data){
            this.data=data
        })
    })

it('Test case to create initiative', function(){
    cy.intercept('POST', '**/api/v1/campaigns').as('GetInitiative')

    
    // cy.intercept('GET', '**/api/v1/profile').as('GetProfile')

    let x = Math.floor((Math.random() * 100) + 1);
    //log in function reusability - support folder
    //faker library

    cy.loginToKapost(this.data.url,this.data.username,this.data.password)
    cy.wait(1000)
    cy.get("span[class='action-text']").click()
    cy.get('.choose-campaign').click()
    cy.get('#campaign-title').type(this.data.initiativeName+x)
    cy.get('#campaign-display-name').type(this.data.initiativeType)

    cy.get('span[class="display"]').each(($e1, index, $list)  =>  {
        if($e1.text()===this.data.initiativeType){
            cy.wrap($e1).click()
        }
    })
    
    cy.get('#start-date').click()
    //cy.get('tbody tr td').eq(1).click()
    cy.selectDateInitiative(this.data.startDate)

    cy.get('#end-date').click()
    cy.selectDateInitiative(this.data.endDate)
    //cy.get('tbody tr td').eq(2).click()
    
    cy.get("[type='submit']").click()

    cy.get('.title-content > h1').should('have.text', this.data.initiativeName+x)
    // deleting initiative using API call afetr this test
    // faker concept use
    // vs code shortcuts, auto formatting
    //  cy.wait('@GetProfile').then((res)=>{
    //     authtoken = res.response.body.response.token
    //     cy.log(authtoken)
    //  })

     cy.wait('@GetInitiative').then((resp)=>{
        initid = resp.response.body.response.id
         cy.log(initid)
     })


    // cy.wait('@GetInitiative').then(({ response: { body : { id }}}) => {
    //     initid = id
    //   })

    cy.request('GET', 'api/v1/profile').then(({ body: { response: { token } } }) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v1/initiatives/${initid}`,
        headers: {
          authorization: 'Bearer ' + token
        }
      }).then(resp => {
        expect(resp.status).to.eq(200)
      })
    })
})

})