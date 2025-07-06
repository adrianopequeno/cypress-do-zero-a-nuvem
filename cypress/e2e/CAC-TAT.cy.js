describe('Central de Atendimento ao Cliente TAT', () => {
  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10);
  // antes de cada teste esse bloco de código vai ser executado
  beforeEach(() => {
    // visita uma página local
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', () => {
    // verifica se o titule da página é igual a 'Central de Atendimento ao Cliente TAT'
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    // verifica se o titulo da página não é igual a 'Central de Atendimento ao Cliente TAT'
    // cy.title().should('not.be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    // Código refatorado
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    cy.get('#email').type('fulano@hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get('.success').should('be.visible');
  });

  it.only('exibe mensagem de error ao submeter o formuário com um email com formatação enválida', () => {
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    /** email com  formação inválida */
    cy.get('#email').type('fulano.hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });
});
