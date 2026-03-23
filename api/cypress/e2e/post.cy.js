const runId = Date.now();

const testUsers = {
  newUser: {
    name: "Scott Summers",
    email: `register-new-user.${runId}@xmen.com`,
    password: "senha123",
  },
  existingUser: {
    name: "Jean Grey",
    email: `register-existing-user.${runId}@xmen.com`,
    password: "senha123",
  },
  missingEmail: {
    name: "Ororo Munroe",
    email: "",
    password: "senha123",
  },
  missingPassword: {
    name: "Logan",
    email: `register-missing-password.${runId}@xmen.com`,
    password: "",
  },
  missingName: {
    name: "",
    email: `register-missing-name.${runId}@xmen.com`,
    password: "senha123",
  },
  invalidJson: {
    name: "Kurt Wagner",
    email: `register-invalid-json.${runId}@xmen.com`,
    password: "senha123",
  },
};

const managedEmails = [
  testUsers.newUser.email,
  testUsers.existingUser.email,
  testUsers.missingPassword.email,
  testUsers.missingName.email,
  testUsers.invalidJson.email,
];

describe("POST /api/users/register", () => {
  beforeEach(() => {
    cy.task("deleteUsersByEmails", managedEmails);
  });

  after(() => {
    cy.task("deleteUsersByEmails", managedEmails);
  });

  context("Quando o payload é válido", () => {
    it("Deve cadastrar um novo usuário", () => {
      const user = testUsers.newUser;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq("User registered successfully.");
        expect(response.body.user).to.have.property("id");
        expect(response.body.user.name).to.eq(user.name);
        expect(response.body.user.email).to.eq(user.email);
        expect(response.body.user).to.not.have.property("password");
      });
    });

    it("Não deve cadastrar um usuário existente", () => {
      const user = testUsers.existingUser;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(201);
      });

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(409);
        expect(response.body.message).to.eq("Email is already registered.");
      });
    });
  });

  context("Campos obrigatórios", () => {
    it("Não deve cadastrar um usuário sem email", () => {
      const user = testUsers.missingEmail;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("The 'email' field is required.");
      });
    });

    it("Não deve cadastrar um usuário sem senha", () => {
      const user = testUsers.missingPassword;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(
          "The 'password' field is required.",
        );
      });
    });

    it("Não deve cadastrar um usuário sem nome", () => {
      const user = testUsers.missingName;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("The 'name' field is required.");
      });
    });
  });

  context("Formato do payload", () => {
    it("Não deve passar quando o JSON estiver mal formatado", () => {
      const malformedJson = `{
      "name": "${testUsers.invalidJson.name}",
      "email": "${testUsers.invalidJson.email}"
      "password": "${testUsers.invalidJson.password}"
    `;

      cy.postUserRaw(malformedJson).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("Invalid JSON format.");
      });
    });
  });
});
