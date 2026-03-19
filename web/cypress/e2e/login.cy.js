import { getTodayFormattedDate } from "../support/utils";

describe("Login", () => {
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

    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.match(/^[a-fA-F0-9]{32}$/);
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
