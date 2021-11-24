const mongoose = require("mongoose");

// define schemas
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
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

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let genreSchema = mongoose.Schema({
  Genre: { type: String, required: true },
  Password: { type: String, required: true },
  Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

// creation of the models
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Genre = mongoose.model("Genre", genreSchema);

// export the models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
