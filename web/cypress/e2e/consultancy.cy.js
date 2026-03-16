describe("Formulário de Consultoria", () => {
  it.only("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Fernando Papito",
    );
    cy.get('input[placeholder="Digite seu email"]').type("papito@teste.com.br");

    // preenchendo o campo de telefone e verificando a formatação automática
    // A maneira do CPF logo abaixo tem o mesmo objetivo, porém foram realizadas de formas diferentes para exemplificar as possibilidades de seleção de elementos no Cypress. A do CPF é mais robusta, pois não depende do placeholder, que pode ser alterado sem impactar a funcionalidade do teste.
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-9999")
      .should("have.value", "(11) 99999-9999");

    // selecionando um campo select através do label
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");

    // selecionando um radio button através do label
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "Pessoa Física")
      .find("input")
      .should("not.be.checked");

    // preenchendo o campo de CPF e verificando a formatação automática
    cy.contains("label", "Pessoa Física")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("12345678900")
      .should("have.value", "123.456.789-00");

    // preenchendo campo checkbox
    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    // preenchendo campo file
    cy.get('input[type="file"]').selectFile("./cypress/fixtures/Lorem.pdf", {
      force: true,
    });

    // preenchendo campo textarea
    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      "Estou buscando uma consultoria para melhorar minhas habilidades em Cypress e automação de testes.",
    );

    // preenchendo input que aceita múltiplas tags
    const techs = ["JavaScript", "Cypress", "Test Automation", "Playwright"];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    // submetendo o formulário
    cy.contains("label", "termos de uso")
      .find("input")
      .check()
      .should("be.checked");

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 10000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );
  });

  it("Deve verificar os campos obrigatórios do formulário", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    // submetendo o formulário sem preencher os campos obrigatórios
    cy.contains("button", "Enviar formulário").click();

    // verificando se os campos obrigatórios estão marcados como inválidos
    cy.contains("label", "Nome Completo")
      .parent()
      .find("p")
      .should("be.visible")
      .should("contain.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Email")
      .parent()
      .find("p")
      .should("be.visible")
      .should("contain.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .should("contain.text", "Você precisa aceitar os termos de uso")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});
