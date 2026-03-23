import { faker } from "@faker-js/faker";
import _ from "lodash";

describe("Expert", () => {
  beforeEach(() => {
    cy.start();
  });

  it("Deve manipular os atributos dos elementos", () => {
    cy.get("#email").invoke("val", "papito@teste.com.br");
    cy.get("#password").invoke("attr", "type", "text").type("senha123");

    cy.contains("button", "Entrar").invoke("hide").should("not.be.visible");
    cy.contains("button", "Entrar").invoke("show").should("be.visible");
  });

  it("não deve logar com senha inválida", () => {
    // cy.submitLoginForm("papito@webdojo.com", "senha_errada");
    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("senha_errada{enter}");

    // cy.wait(2500);

    // cy.document().then((doc) => {
    //   cy.writeFile("cypress/logs/document.html", doc.documentElement.outerHTML);
    // });

    cy.get("[data-sonner-toaster=true]").should("be.visible").as("toast");

    cy.get("@toast")
      .find("div[class=title]") // ou .title
      .should("have.text", "Acesso negado! Tente novamente.");

    cy.wait(5000);
    cy.get("@toast").should("not.exist");
  });

  it("Simulando a tecla TAV com cy.press()", () => {
    cy.get("body").press("Tab");
    cy.focused().should("have.id", "email");
    cy.get("#email").press("Tab");
    cy.get("#password").press("Tab");
    cy.focused().should("contain", "Entrar");
  });

  it("Deve realizar uma carga de dados fakes", () => {
    _.times(5, () => {
      const fakeUser = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: "pwd123",
      };
    });
  });
});
