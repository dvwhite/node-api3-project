const express = require("express");
const cors = require("cors");
const server = express();

// Add middleware
server.use(express.json());
server.use(cors());
server.use(logger);

// Routes
const userRoutes = require('./users/userRouter.js');
server.use('/users', userRoutes);

//custom middleware

// Logger
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
