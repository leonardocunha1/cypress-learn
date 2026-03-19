Cypress.Commands.add("fillConsultancyForm", (data) => {
  cy.get('input[placeholder="Digite seu nome completo"]').type(data.fullName);
  cy.get('input[placeholder="Digite seu email"]').type(data.email);
  cy.get('input[placeholder="(00) 00000-0000"]')
    .type(data.phone)
    .should("have.value", "(11) 99999-9999");
  cy.contains("label", "Tipo de Consultoria")
    .parent()
    .find("select")
    .select(data.consultancyType);

  if (data.personType === "cpf") {
    // preenchendo o campo de CPF e verificando a formatação automática
    cy.contains("label", "Pessoa Física")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("not.be.checked");
    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type(data.document)
      .should("have.value", "123.456.789-00");
  }

  if (data.personType === "cnpj") {
    // selecionando um radio button através do label
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "Pessoa Física")
      .find("input")
      .should("not.be.checked");
    cy.contains("label", "CNPJ")
      .parent()
      .find("input")
      .type(data.document)
      .should("have.value", "12.345.678/0001-00");
  }

  data.discoveryChannels.forEach((channel) => {
    cy.contains("label", channel).find("input").check().should("be.checked");
  });

  // preenchendo campo file
  cy.get('input[type="file"]').selectFile(data.file, {
    force: true,
  });

  // preenchendo campo textarea
  cy.get(
    'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
  ).type(data.description);

  data.techs.forEach((tech) => {
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(tech)
      .type("{enter}");

    cy.contains("label", "Tecnologias")
      .parent()
      .contains("span", tech)
      .should("be.visible");
  });

  if (data.terms) {
    // submetendo o formulário
    cy.contains("label", "termos de uso")
      .find("input")
      .check()
      .should("be.checked");
  }
});

Cypress.Commands.add("submitConsultancyForm", () => {
  cy.contains("button", "Enviar formulário").click();
});

Cypress.Commands.add("validateConsultancyForm", () => {
  cy.get(".modal", { timeout: 10000 })
    .should("be.visible")
    .find(".modal-content")
    .should("be.visible")
    .and(
      "have.text",
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
    );
});
