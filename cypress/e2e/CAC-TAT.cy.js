describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.visit('./src/index.html');
    // verifica se o titule da página é igual a 'Central de Atendimento ao Cliente TAT'
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    // verifica se o titulo da página não é igual a 'Central de Atendimento ao Cliente TAT'
    cy.title().should('not.be.equal', 'Central de Atendimento ao Cliente TAT');
  });
});
