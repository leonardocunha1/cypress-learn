describe("Gerenciamento de Perfis no Github", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Tabela", "Perfis do GitHub");
  });

  it("Deve poder cadastrar um novo perfil no github", () => {
    cy.get("#name").type("Fernando Papito");
    cy.get("#username").type("qapapito");
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.get("#name").type("Fernando Papito");
    cy.get("#username").type("papitodev");
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", "papitodev")
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").contains("Fernando Papito").should("be.visible");

    cy.get("@trProfile").contains("QA").should("be.visible");
  });

  it("Deve poder remover um perfil no github", () => {
    const profile = {
      name: "Fernando Papito",
      username: "papito123",
      profile: "QA",
    };

    cy.get("#name").type("Fernando Papito");
    cy.get("#username").type(profile.username);
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").find("button[title='Remover perfil']").click();

    cy.contains("table tbody tr", profile.username).should("not.exist");
  });

  it.skip("Deve validar o link do GitHub", () => {
    const profile = {
      name: "Fernando Papito",
      username: "papitodev",
      profile: "QA",
    };

    cy.get("#name").type("Fernando Papito");
    cy.get("#username").type(profile.username);
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile")
      .find("a[href='https://github.com/papitodev']")
      .should("have.attr", "href", "https://github.com/" + profile.username)
      .and("have.attr", "target", "_blank");
  });
});
