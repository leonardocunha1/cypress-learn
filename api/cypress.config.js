const { defineConfig } = require("cypress");

const { deleteUserByEmail } = require("./cypress/support/database");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
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
      });
    },
  },
});
