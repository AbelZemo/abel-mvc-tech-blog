const router = require('express').Router();
const { comment } = require('../../models');
const Auth = require('../../utils/auth');

router.get('/', (req, res) => {
    comment.findAll({})
      .then(comments => 
        {
          res.json(comments)
        }
        )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
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
    .then(comments => {
      if (!comments) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(comments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', Auth, (req, res) => {
  // check the session
  if (req.session) {
    comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(comments => res.json(comments))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put('/:id', Auth, (req, res) => {
  comment.update({
      comment: req.body.comment
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(comment => {
      if (!comment) {
        res.status(404).json({ message: ' There is No comment with this id' });
        return;
      }
      res.json(comment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', Auth, (req, res) => {
    comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(comments => {
          if (!comments) {
            res.status(404).json({ message: ' There is No comment with this id' });
            return;
          }
          res.json(comments);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;