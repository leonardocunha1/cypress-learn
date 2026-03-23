import { faker } from "@faker-js/faker";
import _ from "lodash";

describe("Cadastro", () => {
  beforeEach(() => {
    cy.goToSignup();

    cy.intercept("POST", "http://localhost:3333/api/users/register", {
      statuscode: 201,
      body: {
        message: "Usuário cadastrado com sucesso",
      },
    }).as("postSignup");
  });

  _.times(5, () => {
    it("Deve cadastrar um novo usuário", () => {
      const fakeUser = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: "pwd123",
      };

      cy.get("#name").type(fakeUser.name);
      cy.get("#email").type(fakeUser.email);
      cy.get("#password").type(fakeUser.password);

      cy.contains("button", "Criar conta").click();

      cy.wait("@postSignup");

      cy.contains("Conta criada com sucesso").should("be.visible");
    });
  });
});
