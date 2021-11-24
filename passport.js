const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(username + " " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }

        if (!user) {
          console.log("Incorrect username.");
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
        }

        if (!user.validatePassword(password)) {
          console.log("Incorrect Password");
          return callback(null, false, { message: "Incorrect password." });
        }

        console.log("Finished.");
        return callback(null, user);
      });
    }
  )
);

// authenticate users based on the JWT submitted alongside their request
passport.use(
  new JWTStrategy(
    {
      // bearer token
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      // "secret" key to verify the signature of the JWT
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
