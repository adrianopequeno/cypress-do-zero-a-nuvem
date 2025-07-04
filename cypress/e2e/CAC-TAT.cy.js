describe('Central de Atendimento ao Cliente TAT', () => {
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
    // pega um input com id=firstName e digita "Gustavo", depois verifica se o que foi digitado é igual a "gustavo"
    cy.get('#firstName').type('Gustavo').should('have.value', 'Gustavo');

    // pega um input com o id=lastName e digita "Silva", depois verifica se o que foi digitado é igual a "Silva"
    cy.get('#lastName').type('Silva').should('have.value', 'Silva');

    // pega um input com o id=email e digita "gustavo.silva@gmail.com", depois verifica se o que foi digitado é igual a "gustavo.silva@gmail.com"
    cy.get('#email')
      .type('gustavo.silva@gmail.com')
      .should('have.value', 'gustavo.silva@gmail.com');

    // pega o textarea com id=open-text-area, digita "Teste", no segundo paramentro do type passa um delay, verifica se o que foi digitado é igual a "Teste"
    cy.get('#open-text-area')
      .type('Teste', { delay: 5 })
      .should('have.value', 'Teste');

    // Pega um botão com o type=submit e clica nele.
    cy.get('button[type="submit"]').click();

    // Verifica se, após o click, aparece a mensagem de sucesso
    cy.get('.success').should('be.visible');
  });
});
