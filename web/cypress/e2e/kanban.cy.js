describe("Kanban Board", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Deve mover uma nova tarefa de Todo para Done e atualizar o board", () => {
    cy.contains("Kanban").click();

    const dataTransfer = new DataTransfer();

    cy.contains("div[draggable=true]", "Documentar API").trigger("dragstart", {
      dataTransfer,
    });

    cy.get(".column-done")
      .trigger("drop", { dataTransfer })
      .find("h3")
      .should("have.text", "Done (4)");

    cy.get(".column-done")
      .should("include.text", "Documentar API")
      .and("include.text", "Criar documentação da API com Swagge");
  });
});
