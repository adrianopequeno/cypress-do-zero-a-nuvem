/*
  Cria um comando customizado para preencher os campos obrigatórios e clicar no botão submit
*/
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Fulano');
  cy.get('#lastName').type('da Silva');
  cy.get('#email').type('fulano@hotmail.com');
  cy.get('#open-text-area').type('Teste');
  cy.get('button[type="submit"]').click();
});
