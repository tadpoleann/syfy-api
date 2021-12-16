const jwtSecret = "my_secret"; //must be the same key used in JWTStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");
require("./passport");

/**
 * Function to generate authentication token with expiration and algorithm settings
 * @param  {string} user
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //jtw encodes username
    expiresIn: "7d", //token will expire in 7 days
    algorithm: "HS256", //the algorithm used to "sign" or encode the values of the JWT
  });
};

/**
 * API call to login endpoint, authenticates user after entering login credentials
 */
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
