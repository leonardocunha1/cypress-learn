const defaultJsonHeaders = {
  "Content-Type": "application/json",
};

function apiRequest({ method, url, body, headers = defaultJsonHeaders }) {
  return cy.api({
    method,
    url,
    body,
    headers,
    failOnStatusCode: false,
  });
}

Cypress.Commands.add("postUser", (user) => {
  return apiRequest({
    method: "POST",
    url: "/api/users/register",
    body: user,
  });
});

Cypress.Commands.add("postUserRaw", (rawBody) => {
  return apiRequest({
    method: "POST",
    url: "/api/users/register",
    body: rawBody,
    headers: defaultJsonHeaders,
  });
});

Cypress.Commands.add("getUsers", () => {
  return apiRequest({
    method: "GET",
    url: "/api/users",
  });
});

Cypress.Commands.add("putUser", (id, user) => {
  return apiRequest({
    method: "PUT",
    url: `/api/users/${id}`,
    body: user,
  });
});

Cypress.Commands.add("deleteUser", (id) => {
  return apiRequest({
    method: "DELETE",
    url: `/api/users/${id}`,
  });
});
