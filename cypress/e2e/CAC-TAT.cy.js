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
    cy.clock();

    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    cy.get('#email').type('fulano@hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');

    cy.tick(3000);

    cy.get('.success').should('not.be.visible');
  });

  it('exibe mensagem de error ao submeter o formuário com um email com formatação enválida', () => {
    cy.clock();

    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    /** email com  formação inválida */
    cy.get('#email').type('fulano.hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');

    cy.tick(3000);

    cy.get('.error').should('not.be.visible');
  });

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone').type('abcdefghij').should('have.value', '');
  });

  it('exibe a mensagem de error quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock();

    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('da Silva');
    cy.get('#email').type('fulano@hotmail.com');
    cy.get('#open-text-area').type(longText, { delay: 10 });
    // Marca o checkbox
    cy.get('#phone-checkbox').check();
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');

    cy.tick(3000);

    cy.get('.error').should('not.be.visible');
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
    cy.clock();

    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');

    cy.tick(3000);

    cy.get('.error').should('not.be.visible');
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
    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');

    cy.tick(3000);

    cy.get('.success').should('not.be.visible');
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

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        // Verifica se o valor do input é igual ao caminho do arquivo selecionado
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile');
    cy.get('#file-upload')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .should((input) => {
        // Verifica se o valor do input é igual ao caminho do arquivo selecionado
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  /* Este teste verifica se o link "Política de Privacidade":
    1. Possui o atributo href apontando para "privacy.html"
    2. Possui o atributo target="_blank" que faz o link abrir em uma nova aba
    O teste não precisa clicar no link para fazer essa verificação, apenas checa os atributos
 */
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank');
  });

  // Este teste:
  // 1. Encontra o link "Política de Privacidade" na página
  // 2. Remove o atributo target="_blank" do link para que ele abra na mesma aba
  // 3. Clica no link
  // 4. Verifica se o texto "CAC TAT - Política de Privacidade" está visível na nova página
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click();

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
  });

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible');
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible');
  });

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer');
  });

  it('faz uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html',
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(response.body).to.include('CAC TAT');
    });
  });

  it('exibe e oculta o gato com .invoke()', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', '🐈');
    // .invoke('hide')
    // .should('not.be.visible');

    cy.get('#title').invoke('text', 'CAT TAT').should('have.text', 'CAT TAT');
    cy.get('#subtitle').invoke('text', 'Eu 😍 gatos.');
  });
});
