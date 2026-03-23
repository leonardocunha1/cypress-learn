const pgp = require("pg-promise")();
const dbConnection =
  process.env.CYPRESS_DATABASE_URL ||
  process.env.DATABASE_URL ||
  "postgresql://dba:dba@localhost:5432/UserDB?schema=public";

const db = pgp(dbConnection);

function deleteUserByEmail(email) {
  return db.none('DELETE FROM "User" WHERE email = $1', [email]);
}

function deleteUsersByEmails(emails = []) {
  if (!Array.isArray(emails) || emails.length === 0) {
    return Promise.resolve();
  }

  return db.none('DELETE FROM "User" WHERE email IN ($1:csv)', [emails]);
}

module.exports = {
  deleteUserByEmail,
  deleteUsersByEmails,
};
