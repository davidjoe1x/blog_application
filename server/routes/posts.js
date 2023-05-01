const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { findByIdAndDelete } = require("../models/User");

//Добавить пост
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Обновить пост

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Вы можете обновлять только свои посты");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Удалить пост
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Пост успешно удален");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Вы можете удалять только свои посты");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Получить пост

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Все посты

router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
