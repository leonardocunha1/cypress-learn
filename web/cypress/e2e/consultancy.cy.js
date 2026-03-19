import { personal, inCompany } from "../fixtures/consultancy.json";

describe("Formulário de Consultoria", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Formulários", "Consultoria");
  });

  it("Deve solicitar consultoria individual", () => {
    cy.fillConsultancyForm(personal);
    cy.submitConsultancyForm();
    cy.validateConsultancyForm();
  });

  it("Deve solicitar consultoria in Company", () => {
    cy.fillConsultancyForm(inCompany);
    cy.submitConsultancyForm();
    cy.validateConsultancyForm();
  });

  it("Deve verificar os campos obrigatórios do formulário", () => {
    // submetendo o formulário sem preencher os campos obrigatórios
    cy.submitConsultancyForm();

    const requiredFields = [
      { label: "Nome Completo", errorMessage: "Campo obrigatório" },
      { label: "Email", errorMessage: "Campo obrigatório" },
      {
        label: "termos de uso",
        errorMessage: "Você precisa aceitar os termos de uso",
      },
    ];

    requiredFields.forEach(({ label, errorMessage }) => {
      cy.contains("label", label)
        .parent()
        .find("p")
        .should("be.visible")
        .should("contain.text", errorMessage)
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)");
    });
  });
});
