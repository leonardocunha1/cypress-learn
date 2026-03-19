describe("Simulando Mouseover", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Deve exibir tooltip ao passar o mouse sobre o elemento", () => {
    cy.contains("Isso é Mouseover!").should("not.exist");
    cy.get('[data-cy="instagram-link"]').realHover();
    cy.contains("Isso é Mouseover!").should("be.visible");
  });
});
