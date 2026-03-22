const testUsers = {
  newUser: {
    name: "Scott Summers",
    email: "register-new-user@xmen.com",
    password: "senha123",
  },
  existingUser: {
    name: "Jean Grey",
    email: "register-existing-user@xmen.com",
    password: "senha123",
  },
  missingEmail: {
    name: "Ororo Munroe",
    email: "",
    password: "senha123",
  },
  missingPassword: {
    name: "Logan",
    email: "register-missing-password@xmen.com",
    password: "",
  },
  missingName: {
    name: "",
    email: "register-missing-name@xmen.com",
    password: "senha123",
  },
  invalidJson: {
    name: "Kurt Wagner",
    email: "register-invalid-json@xmen.com",
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
    managedEmails.forEach((email) => {
      cy.task("deleteUserByEmail", email);
    });
  });

  it("Deve cadastrar um novo usuário", () => {
    const user = testUsers.newUser;

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("User registered successfully.");
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
      expect(response.body.message).to.eq("The 'password' field is required.");
    });
  });

  it("Não deve cadastrar um usuário sem nome", () => {
    const user = testUsers.missingName;

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("The 'name' field is required.");
    });
  });

  it("Não deve passar quando o JSON estiver mal formatado", () => {
    const user = `{
      "name": "${testUsers.invalidJson.name}",
      "email": "${testUsers.invalidJson.email}"
      "password": "${testUsers.invalidJson.password}"
    `; // JSON mal formatado (falta a chave de fechamento)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Invalid JSON format.");
    });
  });
});
