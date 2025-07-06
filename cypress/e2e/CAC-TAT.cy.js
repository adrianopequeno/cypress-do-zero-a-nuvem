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

  it('exibe mensagem de error ao submeter o formuário com um email com formatação enválida', () => {
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    /** email com  formação inválida */
    cy.get('#email').type('fulano.hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone').type('abcdefghij').should('have.value', '');
  });

  it('exibe a mensagem de error quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    cy.get('#email').type('fulano@hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 10 });
    // Marca o checkbox
    cy.get('#phone-checkbox').click();
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });

  it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Fulano')
      .should('have.value', 'Fulano')
      .clear()
      .should('have.value', '');
    cy.get('#lastName')
      .type('da Silva')
      .should('have.value', 'da Silva')
      .clear()
      .should('have.value', '');
    cy.get('#email')
      .type('fulano@gmail.com')
      .should('have.value', 'fulano@gmail.com')
      .clear()
      .should('have.value', '');
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '');
  });
});
