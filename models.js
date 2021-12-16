const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Define database schema for movies
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  TrailerUrl: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
  },
  ReleaseYear: Number,
  Image: String,
});
/**
 * Defines database schema for users
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * hashPassword function - does the actual hashing of submitted passwords
 * @param  {string} password
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * validatePassword function - compares hashed password in database to the password user enters on login
 * @param  {string} password
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

// creation of the models
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

// export the models
module.exports.Movie = Movie;
module.exports.User = User;
