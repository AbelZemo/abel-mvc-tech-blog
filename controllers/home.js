const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    
    post.findAll({
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
        const sortedPosts = dbPostData .map(post => post.get({ plain: true }));
        const posts = sortedPosts.sort((a,b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/post/:id', (req, res) => {
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
          res.status(404).json({ message: 'There is post with this id' });
          return;
        }
  
        // serialize the data
        const posts = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', {
            posts,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;