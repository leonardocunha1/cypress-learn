describe('Login', () => {
  it('deve realizar login com sucesso', () => {
    cy.start();
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
    .should('be.visible')
    .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
    .should('be.visible')
    .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('não deve logar com senha inválida', () => { 
    cy.start();
    cy.submitLoginForm('papito@webdojo.com', 'invalidpassword')

    cy.contains('Acesso negado! Tente novamente.')
    .should('be.visible')
  })

  it('não deve logar com email inválido', () => {
    cy.start();
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
    .should('be.visible')
  })

})