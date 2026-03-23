describe("PUT /api/users/:id", () => {
  let userId;
  const runId = Date.now();

  const originalUser = {
    name: "Peter Parker",
    email: `peter.parker.${runId}@example.com`,
    password: "spiderman123",
  };

  const updatedUser = {
    name: "Peter B. Parker",
    email: `peter.b.parker.${runId}@example.com`,
    password: "spiderman123",
  };
  const managedEmails = [originalUser.email, updatedUser.email];

  beforeEach(() => {
    cy.task("deleteUsersByEmails", managedEmails);

    cy.postUser(originalUser).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.user.id;
    });
  });

  after(() => {
    cy.task("deleteUsersByEmails", managedEmails);
  });

  context("Atualização por id", () => {
    it("Deve atualizar um usuário existente", () => {
      cy.putUser(userId, updatedUser).then((response) => {
        expect(response.status).to.eq(204);
      });

      cy.getUsers().then((response) => {
        const updatedUserInDb = response.body.find(
          (user) => user.id === userId,
        );
        expect(updatedUserInDb).to.exist;
        expect(updatedUserInDb.name).to.eq(updatedUser.name);
        expect(updatedUserInDb.email).to.eq(updatedUser.email);
      });
    });
  });

  context("Validação do parâmetro id", () => {
    it("Não deve atualizar um usuário inexistente", () => {
      cy.putUser(999999, updatedUser).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq("User not found.");
      });
    });

    it("Não deve atualizar quando id for inválido", () => {
      cy.putUser("abc", updatedUser).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(
          "The 'id' parameter must be a positive integer.",
        );
      });
    });
  });

  context("Campos obrigatórios", () => {
    it("Não deve atualizar sem o campo 'name'", () => {
      cy.putUser(userId, { ...updatedUser, name: "" }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("The 'name' field is required.");
      });
    });

    it("Não deve atualizar sem o campo 'email'", () => {
      cy.putUser(userId, { ...updatedUser, email: "" }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("The 'email' field is required.");
      });
    });

    it("Não deve atualizar sem o campo 'password'", () => {
      cy.putUser(userId, { ...updatedUser, password: "" }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(
          "The 'password' field is required.",
        );
      });
    });
  });
});
