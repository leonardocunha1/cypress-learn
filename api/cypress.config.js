const { defineConfig } = require("cypress");

const {
  deleteUserByEmail,
  deleteUsersByEmails,
} = require("./cypress/support/database");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3333",
    setupNodeEvents(on, config) {
      on("task", {
        deleteUserByEmail: (email) => {
          return deleteUserByEmail(email)
            .then(() => {
              return null;
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
              throw error;
            });
        },
        deleteUsersByEmails: (emails) => {
          return deleteUsersByEmails(emails)
            .then(() => {
              return null;
            })
            .catch((error) => {
              console.error("Error deleting users:", error);
              throw error;
            });
        },
      });

      return config;
    },
  },
});
