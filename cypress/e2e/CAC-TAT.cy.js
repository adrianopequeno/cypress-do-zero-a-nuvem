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
    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de error ao submeter o formuário com um email com formatação enválida', () => {
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    /** email com  formação inválida */
    cy.get('#email').type('fulano.hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.contains('button', 'Enviar').click();

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
    cy.get('#phone-checkbox').check();
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
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

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  // it('envia o formulário com sucesso usando um comando customizado', () => {
  //   cy.fillMandatoryFieldsAndSubmit();
  //   cy.get('.success').should('be.visible');
  // });

  // it('envia o formulário com sucesso usando um comando customizado', () => {
  //   const data = {
  //     firstName: 'Beltrano',
  //     lastName: 'Freitas',
  //     email: 'bel.freitas@hotmail.com',
  //     textArea: 'Teste',
  //   };
  //   cy.fillMandatoryFieldsAndSubmit(data);
  //   cy.get('.success').should('be.visible');
  // });

  it('envia o formulário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'Beltrano',
    //   lastName: 'Freitas',
    //   email: 'bel.freitas@hotmail.com',
    //   textArea: 'Teste',
    // };
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    // Seleciona todos os inputs do tipo radio na página
    cy.get('input[type="radio"]')
      // Verifica se existem exatamente 3 radio buttons
      .should('have.length', 3)
      // Itera sobre cada radio button encontrado
      .each(($radio) => {
        // Marca o radio button atual
        cy.wrap($radio).check();
        // Verifica se o radio button atual está marcado
        cy.wrap($radio).should('be.checked');
      });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        // Verifica se o valor do input é igual ao caminho do arquivo selecionado
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it.only('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        // Verifica se o valor do input é igual ao caminho do arquivo selecionado
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });
});
