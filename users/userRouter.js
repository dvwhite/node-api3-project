const express = require("express");

const router = express.Router();

const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
} = require("./userDb");

// Routing
router.post("/", validateUser, async (req, res) => {
  try {
    const newUser = await insert({ name: req.body.name });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      message: "There was an error adding the user.",
      error: err,
    });
  }
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", async (req, res) => {
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: "No users were found", error: err });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  try {
    const user = await getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "The user wasn't found", error: err });
  }
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

// Validate user id and return 400 if invalid
async function validateUserId(req, res, next) {
  const user = await getById(Number(req.params.id));
  if (user) {
    req.user = user;
  } else {
    res.status(400).json({ message: "Invalid user id" });
  }
  next();
}

function validateUser(req, res, next) {
  if (req.body) {
    if (!req.body.name) {
      res.status(400).json({ message: "Missing required name field" });
    }
  } else {
    res.status(400).json({ message: "Missing user data" });
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
