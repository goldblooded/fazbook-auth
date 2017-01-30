const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

// function to compare passwords (entered v in database).
// bcrypt is password hashing function
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
