describe('Cloud platform tests', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('has clouds listed by default', () => {
    cy.get(`[data-cy="TableRow"]`)
      .its('length')
      .should('be.gt', 80);
  });

  it('has "we are still getting your coords text" visible', () => {
    cy.get(`[data-cy="loadingCoords"]`).should('exist');
  });

  it('selecting provider drops the amount of visible clouds', () => {
    cy.contains('AWS')
      .first()
      .click({ force: true })
      .click({ force: true });
  });
});
