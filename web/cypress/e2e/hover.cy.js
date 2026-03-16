describe("Simulando Mouseover", () => {
  it("Deve exibir tooltip ao passar o mouse sobre o elemento", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.contains("Isso é Mouseover!").should("not.exist");
    cy.get('[data-cy="instagram-link"]').realHover();
    cy.contains("Isso é Mouseover!").should("be.visible");
  });
});
