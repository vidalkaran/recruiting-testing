describe('e2e_candidates', () => {
    //=====
    //Hooks
    //=====
    beforeEach(() => {
        //Open URL
        cy.visit('http://localhost:3000/');
        cy.fixture('candidates.json').as('candidates');
    });
   
    afterEach(() => {
        //Clear all candidates
        cy.request({
            method : 'GET',
            url: 'http://localhost:2999/candidates/'})
            .then((response)=>{
                for(var candidate of response.body.data.candidates){
                  cy.request({
                      method : 'DELETE',
                      url: `http://localhost:2999/candidates/${candidate.id}`})
                }
            });
    });

    //=====
    //Tests
    //=====
    it('E2ETest_Candidate_AddCandidate', function() {

        for(var candidate of this.candidates){
            cy.get("[title='Add']")
                .click();
            cy.get("[placeholder='First Name']")
                .type(candidate.firstName);
            cy.get("[placeholder='Last Name']")
                .type(candidate.lastName);
            cy.get("[title='Save']")
                .click();   
        }

        cy.wait(1000);

        cy.request({
            method : 'GET',
            url: 'http://localhost:2999/candidates/'})
            .then((response)=>{
                for(var candidate of response.body.data.candidates){
                    let candidate  = response.body.data.candidates[0];
                    cy.contains(candidate.firstName).should('be.visible');
                    cy.contains(candidate.lastName).should('be.visible');
                }
        });
    });
});