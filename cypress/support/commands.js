/*
  Cria um comando customizado para preencher os campos obrigatórios e clicar no botão submit
*/
// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
//   cy.get('#firstName').type('Fulano');
//   cy.get('#lastName').type('da Silva');
//   cy.get('#email').type('fulano@hotmail.com');
//   cy.get('#open-text-area').type('Teste');
//   cy.get('button[type="submit"]').click();
// });

/*
  Cria um comando customizado, passando argumentos, para preencher os campos obrigatórios e clicar no botão submit
*/
// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data) => {
//   cy.get('#firstName').type(data.firstName);
//   cy.get('#lastName').type(data.lastName);
//   cy.get('#email').type(data.email);
//   cy.get('#open-text-area').type(data.textArea);
//   cy.get('button[type="submit"]').click();
// });

/*
  Cria um comando customizado, passando argumentos, com valores default, para preencher os campos obrigatórios e clicar no botão submit
*/
Cypress.Commands.add(
  'fillMandatoryFieldsAndSubmit',
  (
    data = {
      firstName: 'Fulano',
      lastName: 'da Silva',
      email: 'fulano@hotmail.com',
      textArea: 'Teste.',
    }
  ) => {
    cy.get('#firstName').type(data.firstName);
    cy.get('#lastName').type(data.lastName);
    cy.get('#email').type(data.email);
    cy.get('#open-text-area').type(data.textArea);
    cy.get('button[type="submit"]').click();
  }
);
