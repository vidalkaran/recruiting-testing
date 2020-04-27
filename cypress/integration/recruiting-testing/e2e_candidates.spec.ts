describe('e2e_candidates', () => {
    //=====
    //Hooks
    //=====
    beforeEach(() => {
        //Open URL
        cy.visit('http://localhost:3000/');
        cy.fixture('candidates.json').as('candidates_from_json');
    });
   
    afterEach(() => {
        cy.clearCandidates();
    });

    //=====
    //Tests
    //=====
    it('E2ETest_Candidate_AddCandidate', function() {
        cy.addCandidates(this.candidates_from_json);
        cy.waitForPageLoad();
        cy.validateCandidatesOnScreen();
    });
});