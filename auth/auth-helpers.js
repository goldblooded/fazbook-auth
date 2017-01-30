const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

// function to compare passwords (user entry vs in database).
// bcrypt is password hashing function
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in' }
  );

  return next();
}
