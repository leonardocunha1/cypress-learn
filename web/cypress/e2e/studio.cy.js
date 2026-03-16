describe("Studio", () => {
  it("Exemplo do Cypress Studio", () => {
    cy.visit("https://example.cypress.io");
    cy.get("h1").should("be.visible").and("have.text", "Kitchen Sink");
  });

  it("Deve logar com sucesso", function () {
    cy.visit("http://localhost:3000");

    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("katana123");
    cy.contains("button", "Entrar").click();
    cy.get('[data-cy="user-name"]').should("have.text", "Fernando Papito");
  });
});
