const Post = require('../models/Post');
const { validatePostTitle, validatePostContent } = require('../utils/validation');

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (category) {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate('author', 'username email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single post
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email');
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create post
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    // Validation
    if (!validatePostTitle(title)) {
      return res.status(400).json({ error: 'Invalid title' });
    }

    if (!validatePostContent(content)) {
      return res.status(400).json({ error: 'Invalid content' });
    }

    // Create slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const post = await Post.create({
      title,
      content,
      slug,
      author: req.user._id,
      category,
      tags,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, content, category, tags } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (tags) post.tags = tags;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
