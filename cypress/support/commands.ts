declare namespace Cypress {
    interface Chainable<Subject> {
      addCandidates(candidate : any): Chainable<Subject>
      validateCandidatesOnScreen(): Chainable<Subject>
      clearCandidates(): Chainable<Subject>
      waitForPageLoad(): Chainable<Subject>
    }
  }

Cypress.Commands.add('addCandidates', addCandidates)
Cypress.Commands.add('validateCandidatesOnScreen', validateCandidatesOnScreen)
Cypress.Commands.add('clearCandidates', clearCandidates)
Cypress.Commands.add('waitForPageLoad', waitForPageLoad)

function addCandidates(candidates : any) {
        for(var candidate of candidates)
        {
            cy.get("[title='Add']")
                .click();
            cy.get("[placeholder='First Name']")
                .type(candidate.firstName);
            cy.get("[placeholder='Last Name']")
                .type(candidate.lastName);
            cy.get("[title='Save']")
                .click();   
        }
}

function validateCandidatesOnScreen() {
    cy.request({
        method : 'GET',
        url: 'http://localhost:2999/candidates/'})
        .then((response)=>{
            for(var candidate of response.body.data.candidates){
                cy.log(response.body.data.candidates.length)
                cy.contains(candidate.firstName).should('be.visible');
                cy.contains(candidate.lastName).should('be.visible');
            }
    });
}

function clearCandidates(){
    cy.request({
        method : 'GET',
        url: 'http://localhost:2999/candidates/'})
    .then((response) => {
        for(var candidate of response.body.data.candidates){
            cy.log(response.body.data.candidates.length)
            cy.request({
                method : 'DELETE',
                url: `http://localhost:2999/candidates/${candidate.id}`})
        }
    });
}

function waitForPageLoad() {
    let loading:boolean = true;

    if(cy.get("[class=MuiCircularProgress-svg]")) {
        cy.log("Waiting for load");
        cy.wait(100);
    }
    else
        loading = false;
}
