describe("GET /api/users", () => {
  const runId = Date.now();
  const heroes = [
    {
      name: "Superman",
      email: `clark.kent.${runId}@example.com`,
      password: "superpassword",
    },
    {
      name: "Batman",
      email: `bruce.wayne.${runId}@example.com`,
      password: "batpassword",
    },
    {
      name: "Spider-Man",
      email: `peter.parker.${runId}@example.com`,
      password: "spiderpassword",
    },
    {
      name: "Wonder Woman",
      email: `diana.prince.${runId}@example.com`,
      password: "wonderpassword",
    },
    {
      name: "Iron Man",
      email: `tony.stark.${runId}@example.com`,
      password: "ironpassword",
    },
  ];
  const heroEmails = heroes.map((hero) => hero.email);

  before(() => {
    cy.task("deleteUsersByEmails", heroEmails);

    heroes.forEach((hero) => {
      cy.postUser(hero);
    });
  });

  after(() => {
    cy.task("deleteUsersByEmails", heroEmails);
  });

  context("Com usuários previamente cadastrados", () => {
    it("Deve retornar uma lista de usuário", () => {
      cy.getUsers().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.gte(heroes.length);

        heroes.forEach((hero) => {
          const foundUser = response.body.find(
            (user) => user.email === hero.email,
          );

          expect(foundUser).to.exist;
          expect(foundUser.id).to.be.a("number");
          expect(foundUser.name).to.eq(hero.name);
          expect(foundUser.email).to.eq(hero.email);
          expect(foundUser).to.not.have.property("password");
        });
      });
    });
  });
});
