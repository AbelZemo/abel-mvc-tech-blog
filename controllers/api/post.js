const router = require('express').Router();
const { post, user, comment } = require('../../models');
const sequelize = require('../../config/connection');
const Auth = require('../../utils/auth');

// get all users 
router.get('/', (req, res) => {
  post.findAll({
    attributes: [
      'id',
      'title',
      'created_at',
      'post'
    ],
    order: [['created_at', 'DESC']],
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
      },
    ]
  })
    .then(posts => {
      console.log("wwwwwwwwwwwwwww", posts)
      res.json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// get single post
router.get('/:id', (req, res) => {
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
      // include the Comment model here:
      {
        model: user,
        attributes: ['username','email','id']
      },
      {
        model: comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: user,
          attributes: ['username','email','id']
        }
      }
    ]
  })
    .then(posts => {
      if (!posts) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//   create post
router.post('/', Auth, (req, res) => {
  post.create({
    title: req.body.title,
    post: req.body.post,
    user_id: req.session.user_id
  })
    .then(posts => res.json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  update post
router.put('/:id', Auth, (req, res) => {
  post.update({
    title: req.body.title,
    post: req.body.post
  },
    {
      where: {
        id: req.params.id
      }
    })
    .then(posts => {
      if (!posts) {
        res.status(404).json({ message: ' There is No post with this id' });
        return;
      }
      res.json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//    delete post
router.delete('/:id', Auth, (req, res) => {
  post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(posts => {
      if (!posts) {
        res.status(404).json({ message: 'There is No post with this id' });
        return;
      }
      res.json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;