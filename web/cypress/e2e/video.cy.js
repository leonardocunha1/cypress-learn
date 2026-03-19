describe("Trocar o vídeo", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Deve poder tocar o vídeo de exemplo", () => {
    const getPlayerBody = () =>
      cy
        .get('iframe[title="Video Player"]')
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap);

    cy.contains("Video").click();

    cy.wait(3000); // Aguarda o carregamento do vídeo

    getPlayerBody().find(".play-button").click();

    getPlayerBody().find(".pause-button").should("be.visible");
  });
});
