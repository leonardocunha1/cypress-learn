// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-real-events";
import "./actions/consultancy.actions";
import { getTodayFormattedDate } from "./utils";

Cypress.Commands.add("start", () => {
  cy.visit("/");
});

Cypress.Commands.add("goToSignup", () => {
  cy.start();
  cy.get('a[href="/register"]').click();
  cy.contains("h2", "Crie sua conta").should("be.visible");
});

Cypress.Commands.add("submitLoginForm", (email, password) => {
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.contains("button", "Entrar").click();
});

Cypress.Commands.add("goTo", (buttonName, pageTittle) => {
  cy.contains("button", buttonName).should("be.visible").click();

  cy.contains("h1", pageTittle).should("be.visible");
});
// Helpers
Cypress.Commands.add("login", (ui = false) => {
  if (ui) {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
  } else {
    const token = "e1033d63a53fe66c0fd3451c7fd8f617";
    const loginDate = getTodayFormattedDate();

    cy.setCookie("login_date", loginDate);
    cy.visit("/dashboard", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", token);
      },
    });
  }
});
