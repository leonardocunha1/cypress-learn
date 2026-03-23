describe("DELETE /api/users/:id", () => {
  let userId;
  const runId = Date.now();

  const userToDelete = {
    name: "Steve Rogers",
    email: `steve.rogers.${runId}@example.com`,
    password: "captain123",
  };
  const managedEmails = [userToDelete.email];

  before(() => {
    cy.task("deleteUsersByEmails", managedEmails);
  });

  after(() => {
    cy.task("deleteUsersByEmails", managedEmails);
  });

  context("Quando o usuário existe", () => {
    beforeEach(() => {
      cy.task("deleteUsersByEmails", managedEmails);

      cy.postUser(userToDelete).then((response) => {
        expect(response.status).to.eq(201);
        userId = response.body.user.id;
      });
    });

    it("Deve excluir um usuário existente", () => {
      cy.deleteUser(userId).then((response) => {
        expect(response.status).to.eq(204);
        expect(response.body).to.be.undefined;
      });

      cy.getUsers().then((response) => {
        const deletedUserInDb = response.body.find(
          (user) => user.id === userId,
        );
        expect(deletedUserInDb).to.not.exist;
      });
    });
  });

  context("Quando o id é inválido ou inexistente", () => {
    it("Não deve excluir um usuário inexistente", () => {
      cy.deleteUser(999999).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq("User not found.");
      });
    });

    it("Não deve excluir quando id for inválido", () => {
      cy.deleteUser("abc").then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(
          "The 'id' parameter must be a positive integer.",
        );
      });
    });
  });
});
