const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');
const Auth = require('../utils/auth');

router.get('/', Auth, (req, res) => {
  post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post'
    ],
    include: [
      {
        model: comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: user,
          attributes: ['username','email','id']
        }
      },
      {
        model: user,
        attributes: ['username','email','id']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const sortedPosts = dbPostData.map(post => post.get({ plain: true }));
      const posts = sortedPosts.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', Auth, (req, res) => {
  post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post'
    ],
    include: [
      {
        model: comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: user,
          attributes: ['username','email','id']
        }
      },
      {
        model: user,
        attributes: ['username','email','id']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'There is No post with this id' });
        return;
      }

      // serialize the data
      const posts = dbPostData.get({ plain: true });

      res.render('edit-post', {
        posts,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/editcomment/:id', Auth, (req, res) => {
  comment.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'comment',
      'created_at',
      'post_id',
      'user_id'
    ]
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'There is No comment with this id' });
      return;
    }

    // serialize the data
    const comments = dbCommentData.get({ plain: true });

    res.render('edit-comment', {
      comments,
      loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/create/', Auth, (req, res) => {
  post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post'
    ],
    include: [
      {
        model: comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: user,
          attributes: ['username','email','id']
        }
      },
      {
        model: user,
        attributes: ['username','email','id']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('create-post', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;