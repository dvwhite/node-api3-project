const express = require("express");

const router = express.Router();

// Db helpers
const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
} = require("./userDb");
const postDb = require("./../posts/postDb");

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

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await postDb.insert(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({
      message: "There was an error adding the post.",
      error: err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: "No users were found" });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  try {
    const user = await getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "The user wasn't found" });
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const userPosts = await getUserPosts(req.params.id);
    res.status(200).json(userPosts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving the user's posts" });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    await remove(req.params.id)
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Error deleting the user" });
  }
});

router.put("/:id", validateUserId, async (req, res) => {
  try {
    const updatedUser = await update(req.params.id, req.body);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Error updating the user" });
  }
});

//custom middleware

// Validate user id and return 400 if invalid
async function validateUserId(req, res, next) {
  const user = await getById(Number(req.params.id));
  if (user) {
    req.user = user;
  } else {
    return res.status(400).json({ message: "Invalid user id" });
  }
  next();
}

function validateUser(req, res, next) {
  if (req.body) {
    if (!req.body.name) {
      return res.status(400).json({ message: "Missing required name field" });
    }
  } else {
    return res.status(400).json({ message: "Missing user data" });
  }
  next();
}

function validatePost(req, res, next) {
  if (req.body) {
    if (!req.body.text) {
      return res.status(400).json({ message: "Missing required text field" });
    }
  } else {
    return res.status(400).json({ message: "Missing post data" });
  }
  next();
}

module.exports = router;
