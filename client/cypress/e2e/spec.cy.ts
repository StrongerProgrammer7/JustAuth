describe('template spec',() =>
{
  beforeEach(() =>
  {
    cy.visit('http://localhost:5173/');
  });

  it('Get name sigin in',() =>
  {

    cy.contains('button','Sign in');
    cy.contains('h1','Sign in');
  });
  it('Exist btn (sign in to sign up)',() =>
  {
    cy.get('[data-testid="cypress-btn"]').should('exist');

  });
  it('Enable sign up',() =>
  {
    cy.get('[data-testid="cypress-btn"]').click();
    cy.get('[data-testid="cypress-btn"]').should('exist');
    cy.contains('h1','Registration');

  });
  it('Get unknown error',() =>
  {
    cy.get('[data-testid="cypress-pulsar-btn-Sign in"]').click();
    cy.contains('p','Unknown error sorry status=500:(');

  });
});
