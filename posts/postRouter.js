const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

async function validatePostId(req, res, next) {
  try {
    const post = await getById(Number(req.params.id));
    if (post) {
      req.post = post;
    } else {
      return res.status(400).json({ message: "Invalid post id" });
    }
    next();
  } catch {
    return res.status(500).json({ message: "Could not validate post id" });
  }
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
