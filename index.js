const express = require("express"),
  morgan = require("morgan"),
  uuid = require("uuid"),
  bodyParser = require("body-parser");

const app = express();

//log requests to terminal
app.use(morgan("common"));

app.use(bodyParser.json());
//''top'' movies
let films = [
  {
    title: "Sharknado",
    description:
      "Sharknado is a 2013 American made-for-television sci-fi disaster film about a waterspout that lifts sharks out of the ocean and deposits them in Los Angeles. It is the first installment in the Sharknado film series.",
    director: "Anthony C. Ferrante",
    genres: "Sharks",
    image:
      "https://m.media-amazon.com/images/M/MV5BODcwZWFiNTEtNDgzMC00ZmE2LWExMzYtNzZhZDgzNDc5NDkyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  },
  {
    title: "Sharknado 2: The Second One",
    description:
      "A sequel to the 2013 television film Sharknado and the second installment in the Sharknado film series.",
    director: "Anthony C. Ferrante",
    genres: "Sharks",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjA0MTIxMDEwNF5BMl5BanBnXkFtZTgwMDk3ODIxMjE@._V1_UY1200_CR113,0,630,1200_AL_.jpg",
  },
  {
    title: "Empire of the Sharks",
    description:
      "A lone warlord and his army of hyper-intelligent sharks control all the land in a future world of water.",
    director: "Mark Atkins",
    genres: "Sharks",
    image:
      "https://m.media-amazon.com/images/M/MV5BNjYxYjhiOGQtY2Y0OC00ZDlkLWEwNTAtZjA3OGYwZWQ5YTBmXkEyXkFqcGdeQXVyMzA1MjMyNTY@._V1_.jpg",
  },
  {
    title: "Animal",
    description:
      "When plans for a weekend vacation hit a dead end, a group of close-knit friends find themselves stranded in unfamiliar territory, pursued by a menacing, blood thirsty predator.",
    director: "Brett Simmons",
    genres: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzU1MjAyOTYwMl5BMl5BanBnXkFtZTgwODQyOTQ2MTE@._V1_.jpg",
  },
  {
    title: "Mega Shark Versus Mecha Shark",
    description:
      "The film is a sequel to Mega Shark Versus Giant Octopus and Mega Shark Versus Crocosaurus, and is the third installment in the Mega Shark film series.",
    director: "Emile Edwin Smith",
    genres: "Sharks",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTQzMDIyMjgxMF5BMl5BanBnXkFtZTgwODYzNjg4MDE@._V1_.jpg",
  },
  {
    title: "Mega Shark Versus Kolossus",
    description:
      "Some time after the events of the previous film, the world's governments institute preparation plans in case another Mega Shark appears; another shark is awakened by Russian miners drilling underwater for red mercury.",
    director: "Christopher Douglas-Olen Ray",
    genres: "Sharks",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/91aKXO9TDLL._SL1500_.jpg",
  },
  {
    title: "3-Headed Shark Attack",
    description:
      "As a mutated, three-headed, great white shark eats its way from one end of the ship to the next, the passengers have to fight the deadly predator using anything they can find.",
    director: "Christopher Douglas-Olen Ray",
    genres: "Sharks",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTg2NDA5MjA4NF5BMl5BanBnXkFtZTgwOTA5NTY0NjE@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Pride and Prejudice and Zombies",
    description:
      "In 19th-century England, a martial-arts master unites with a zombie killer to battle the undead.",
    director: "Burr Steers",
    genres: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjE1MzA3NzYxMl5BMl5BanBnXkFtZTgwMzQ0NDA5NzE@._V1_.jpg",
  },
  {
    title: "Beneath",
    description:
      "Teenage boaters become fish food for a giant underwater predator.",
    director: "Larry Fessenden",
    genres: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjIxNjk3MTAxMV5BMl5BanBnXkFtZTcwMzMyODY1OQ@@._V1_.jpg",
  },
  {
    title: "Mothman",
    description:
      "A group of friends band together to hide the truth about a mutual friend's tragic death. They soon discover that an evil entity is in pursuit of them.",
    director: "Sheldon Wilson",
    genres: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BNjM5OTcwMTcwOV5BMl5BanBnXkFtZTgwNDUwMjU5MDE@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Truth Or Dare",
    description:
      "Eight friends head to a 'Haunted Rental' for Halloween. But when they play Truth or Dare, their lives are taken one by one by an evil spirit who wants to play a more deadly version of the game.",
    director: "Jeff Wadlow",
    genres: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BNTk2ODQ1NDcwOV5BMl5BanBnXkFtZTgwOTY4NDk0NDM@._V1_.jpg",
  },
  {
    title: "Night of the Living Dead",
    description:
      "A ragtag group of Pennsylvanians barricade themselves in an old farmhouse to remain safe from a horde of flesh-eating ghouls that are ravaging the East Coast of the United States.",
    director: "George A. Romero",
    genres: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BMzRmN2E1ZDUtZDc2ZC00ZmI3LTkwOTctNzE2ZDIzMGJiMTYzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  },
  {
    title: "Day of Reckoning",
    description:
      "Some years ago the world experienced a 'day of reckoning' where creatures came up from below and purged humanity of evil... now it is happening again.",
    director: "Joel Novoa",
    genres: "Horror",
    image:
      "https://m.media-amazon.com/images/M/MV5BOTFlYTE5MmMtMDEyZC00OGQxLTg1YjQtZDM3MjY0NmRhOTUwL2ltYWdlXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_.jpg",
  },
  {
    title: "Reign of the Gargoyles",
    description:
      "When a WW2 bomber goes down behind enemy lines, a crew of young American fliers face the Nazis' latest secret weapon - stone gargoyles that have been brought to life.",
    director: "Ayton Davis",
    genres: "Creature Features",
    image:
      "https://m.media-amazon.com/images/M/MV5BYjJkYTU3ZmItMzVlZS00NGMxLTg3MGYtODVmYjE5M2YzOTdkXkEyXkFqcGdeQXVyNDUxNjc5NjY@._V1_.jpg",
  },
  {
    title: "Locusts: The 8th Plague",
    description:
      "Top-secret lab experiments have resulted in genetically-engineered locusts that devour the flesh from any humans in their path. When the swarm escapes, a determined researcher heads a team to stop the menace before it consumes the world.",
    director: "Ian Gilmour",
    genres: "Creature Features",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTk1Mzc5MDg5NF5BMl5BanBnXkFtZTcwMzI5ODY3Mw@@._V1_.jpg",
  },
  {
    title: "Rock Monster",
    description:
      "A group of friends on a backpacking trip through Europe discover a stone with a sword embedded in it. When they remove the sword an ancient rock monster is unleashed.",
    director: "Declan O'Brien",
    genres: "Creature Features",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjMzMzcwYmMtMmJkZS00MTljLWEzZmItODQzNTY4ZGZiMDE4XkEyXkFqcGdeQXVyNDUxNjc5NjY@._V1_.jpg",
  },
];
//directors
let directors = [
  {
    name: "Anthony C. Ferrante",
    biography:
      "Anthony C. Ferrante is an American film director, producer, and writer, known for directing the Sharknado series, the 2017 thriller Forgotten Evil and the 2005 ghost story Boo, which was his feature film writing and directing debut.",
    birthday: "July 30, 1969",
  },
  {
    name: "Declan O'Brien",
    biography:
      "Declan O'Brien is an American writer and director. O'Brien is known as the director of three films in the Wrong Turn series (2009–2012). O'Brien is the president of Utopia Pictures & Television",
    birthday: "January 01, 1962",
  },
];
//genres
let genres = [
  {
    genre: "Creature Features",
    description:
      "A horror film in which one or more monsters plays a prominent role. 'Godzilla' is one of the classic creature features.",
  },
  {
    genre: "Horror",
    description:
      "A horror film is one that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films additionally aim to evoke viewers' nightmares, revulsions and terror of the unknown or the macabre. Horror genre contains a lot of subgenres such as comedy horror, folk horror, found-footage horror, psychological horror, etc.",
  },
  {
    genre: "Sharks",
    description: "A movie with a lot of sharks.",
  },
];

let filmStars = [
  {
    name: "Tara Reid",
    bio: "Tara Donna Reid is an American actress. She played Vicky in the films American Pie (1999), American Pie 2 (2001), and American Reunion (2012), and Bunny Lebowski in The Big Lebowski (1998). In 2013, she starred as April Wexler in the television film Sharknado, and went on to reprise the role in five sequels (2013–2018).",
    birthday: "November 8, 1975",
    movies: [
      "American Pie",
      "American Pie 2",
      "American Reunion",
      "The Big Lebowski",
      "Sharknado",
      "Sharknado 2: The Second One",
      "Sharknado 3: Oh Hell No!",
      "Sharknado: The 4th Awakens!",
      "Sharknado 5: Global Swarming!",
    ],
  },
  {
    name: "Ian Ziering",
    bio: "Ian Ziering is an American actor and voice actor best known for his role as Steve Sanders on the television series Beverly Hills, 90210, which he played from 1990 to 2000. He is also the voice of Vinnie on Biker Mice from Mars. From 2013 to 2018, he starred as Fin Shepard in the Sharknado film series. In 2019, he played the DC Comics character Blue Devil on the series Swamp Thing.",
    birthday: "March 30, 1964",
    movies: [
      "Sharknado",
      "Sharknado 2: The Second One",
      "Sharknado 3: Oh Hell No!",
      "Sharknado: The 4th Awakens!",
      "Sharknado 5: Global Swarming!",
    ],
  },
];

// GET requests

//express route located at the endpoint "/"
app.get("/", (req, res) => {
  res.send("Welcome to the Syfy database!");
});

//return list of all movies
app.get("/movies", (req, res) => {
  res.json(films);
});

//return data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(
    films.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

//Return data about all genres
app.get("/genres", (req, res) => {
  res.json(genres);
});

//Return data about a specific genre by name
app.get("/genres/:genre", (req, res) => {
  res.json(
    genres.find((category) => {
      return category.genre === req.params.genre;
    })
  );
});

// Return data about all directors
app.get("/directors", (req, res) => {
  res.json(directors);
});

//Return data about a director by name
app.get("/directors/:name", (req, res) => {
  res.json(
    directors.find((director) => {
      return director.name === req.params.name;
    })
  );
});

//allow new users to register
app.post("/users", (req, res) => {
  res.send("successful POST request allowing a new user to register.");
});

//Allow users to update their user info (username)
app.put("/users/:username", (req, res) => {
  res.send("successful PUT request to let users update their user-info.");
});

//Allow existing users to deregister
app.delete("/users/:username", (req, res) => {
  res.send("User has been successfully deleted.");
});

//allow users to add a movie to their favorites
app.post("/users/:username/favorites", (req, res) => {
  res.send("Movie has been added to your favorites.");
});

//Allow users to remove a movie from their list of favorites
app.delete("/users/:username/favorites/:title", (req, res) => {
  res.send("Movie has been deleted from your favorites.");
});

//allow users to view information about the cast
app.get("/filmstars", (req, res) => {
  res.json(filmStars);
});

//allow users to see information about specific cast member
app.get("/filmstars/:name", (req, res) => {
  res.json(
    filmStars.find((star) => {
      return star.name === req.params.name;
    })
  );
});

//serve "documentation.html" from "/public" folder
app.use(express.static("public"));

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
