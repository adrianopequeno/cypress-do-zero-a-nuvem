describe('Testa a página de Política de Privacidade de forma independente', () => {
  beforeEach(() => {
    cy.visit('./src/privacy.html');
  });

  it('testa se o título da página Política de Privacidade esta visível', () => {
    cy.contains('h1[id=title]', 'CAC TAT - Política de Privacidade').should(
      'be.visible'
    );
  });

  it('verifica se exite uma tag p com o texto "Talking About Testing"', () => {
    cy.contains('p', 'Talking About Testing').should('be.visible');
  });
});
