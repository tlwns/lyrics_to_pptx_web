import cypress from 'cypress';

context('Lyrics slide creation flow - happy path', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Successfully submits lyrics form', () => {
    const lyrics = `We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy

I just wanna tell you how I'm feeling
Gotta make you understand

Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you`;
    const fileName = 'Never Gonna Give You Up';

    cy.get('textarea[name=lyrics]').focus().type(lyrics);

    cy.get('[data-cy=backgroundOptionsBtn]').click();
    cy.get('[data-cy=backgroundOptionsDropdown]').should('be.visible');
    cy.get('[data-cy^=backgroundOptionValue]').should('have.length', 2);
    cy.get('[data-cy=backgroundOptionValueNONE]').click();

    cy.get('input[name=fileName]').focus().type(fileName);

    cy.get('button').contains('Download').click();

    cy.readFile(`cypress/downloads/${fileName}.pptx`).should('exist');
  });
});
