describe("Login", () => {
  function getTodayFormattedDate() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  beforeEach(() => {
    cy.start();
  });

  it("deve realizar login com sucesso", () => {
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );

    cy.getCookie("login_date").should("exist");

    cy.getCookie("login_date").should((cookie) => {
      expect(cookie.value).to.eq(getTodayFormattedDate());
    });
  });

  it("não deve logar com senha inválida", () => {
    cy.submitLoginForm("papito@webdojo.com", "senha_errada");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("não deve logar com email inválido", () => {
    cy.submitLoginForm("email_invalido@webdojo.com", "katana123");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
