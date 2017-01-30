const passport = require('passport');
// load passport module
const LocalStrategy = require('passport-local').Strategy;
// local strategy = user logs in with credentials specific to this site/app

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

init();

// new strategy instance passed to to Passport
passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  // same as username: username. find particular username
  models.User.findAll({
    where: {
      username
    }
  })
  .then((user) => {
    if (user[0] === undefined) {
      return done(null, false);
    }
    // if password entered is not equal to password, user doesn't exist end process.
    // otherwise return login was a success.
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
      return done(null, false);
    } else {
      return done(null, user[0].dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;
