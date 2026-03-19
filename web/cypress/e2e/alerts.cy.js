describe("Validações de Alertas em Javascript", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Alertas JS", "JavaScript Alerts");
  });

  it("Deve validar a mensagem de alerta", () => {
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Olá QA, eu sou um Alert Box!");
    });
    cy.contains("button", "Mostrar Alert").click();
  });

  it("Deve confirmar um diálogo e validar a resposta positiva", () => {
    cy.on("window:confirm", (msg) => {
      expect(msg).to.equal("Aperte um botão!");
      return true; // Simula o clique no botão "OK"
    });
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Você clicou em Ok!");
    });
    cy.contains("button", "Mostrar Confirm").click();
  });

  it("Deve cancelar um diálogo e validar a resposta negativa", () => {
    cy.on("window:confirm", (msg) => {
      expect(msg).to.equal("Aperte um botão!");
      return false; // Simula o clique no botão "Cancelar"
    });
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Você cancelou!");
    });
    cy.contains("button", "Mostrar Confirm").click();
  });

  it("Deve interagir com um prompt, inserir um texto e validar a resposta", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Leonardo");
    });
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Olá Leonardo! Boas-vindas ao WebDojo!");
    });
    cy.contains("button", "Mostrar Prompt").click();
  });
});
