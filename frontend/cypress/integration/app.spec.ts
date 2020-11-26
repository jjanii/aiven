describe('Cloud platform tests', () => {
  before(() => {
    cy.server();

    cy.intercept('**/clouds', { fixture: 'clouds.json' });
    cy.visit('/');
  });

  it('has clouds listed by default', () => {
    cy.get(`[data-cy="tableRow"]`)
      .its('length')
      .should('be.gt', 80);
  });

  it('has "we are still getting your coords text" visible', () => {
    cy.get(`[data-cy="loadingCoords"]`).should('exist');
  });

  it('selecting AWS as provider only shows cloud platforms provided by them', () => {
    cy.get('[data-cy="select"]')
      .first()
      .select('AWS');

    cy.get('[data-cy="tableRow"]')
      .find('td:first-child')
      .should('contain', 'aws-');
  });

  it('selecting UpCloud as provider only shows cloud platforms provided by them', () => {
    cy.get('[data-cy="select"]')
      .first()
      .select('UpCloud');

    cy.get('[data-cy="tableRow"]')
      .find('td:first-child')
      .should('contain', 'upcloud-');
  });

  it('selecting region only shows cloud platforms from that region', () => {
    cy.get('[data-cy="select"]')
      .last()
      .select('Europe');

    cy.wait(500);

    cy.get('[data-cy="tableRow"]')
      .find('td:nth-child(3n)')
      .should('contain', 'europe');

    cy.get('[data-cy="select"]')
      .last()
      .select('Africa');

    cy.wait(500);

    cy.get('[data-cy="tableRow"]')
      .find('td:nth-child(3n)')
      .should('contain', 'africa');
  });

  it('sorts by distance when clicking distance table header', () => {
    let distances = [];

    // first click handles sorts them in ascending order
    cy.contains('Distance (km)').click();
    cy.get('[data-cy="tableRow"]')
      .find('td:last-child')
      // this one from https://stackoverflow.com/questions/57077997/how-do-i-iterate-through-a-table-and-extract-the-values-from-a-row-and-compare-w
      .each(($el, $index) => {
        return cy
          .wrap($el)
          .invoke('text')
          .then(distance => {
            distances.push(Number(distance));
          });
      })
      .then(() => () =>
        // got this one from here https://gist.github.com/yorkie/7959685
        assert.Equal(
          distances.every((val, i, arr) => !i || val <= arr[i]),
          true,
        ),
      );

    distances = [];

    // second click handles sorts them in descending order
    // so lets do the same thing again to see if it works

    cy.contains('Distance (km)').click();
    cy.get('[data-cy="tableRow"]')
      .find('td:last-child')
      .each(($el, $index) => {
        return cy
          .wrap($el)
          .invoke('text')
          .then(distance => {
            distances.push(Number(distance));
          });
      })
      .then(() => () =>
        assert.Equal(
          distances.every((val, i, arr) => !i || val <= arr[i]),
          true,
        ),
      );
  });

  afterEach(() => {
    cy.get('[data-cy="select"]')
      .first()
      .select('All');

    cy.get('[data-cy="select"]')
      .last()
      .select('All');
  });
});
