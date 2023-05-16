const router = require('express').Router();
const { user, post, comment } = require('../../models');
const Auth = require('../../utils/auth');

// GET /api/users
router.get('/', (req, res) => {
    // Access our user model and run .findAll() method
    user.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    user.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: post,
                attributes: ['id', 'title', 'post', 'created_at']
            },
            {
                model: comment,
                attributes: ['id', 'comment', 'created_at'],
                include: {
                    model: post,
                    attributes: ['title']
                }
            }
        ]

    })
        .then(users => {
            if (!users) {
                res.status(404).json({ message: 'There is No user with this id' });
                return;
            }
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// post /api/users
router.post('/register', (req, res) => {
    user.create({
        password: req.body.password,
        username: req.body.username,
        email: req.body.email,
    })
        .then(users => {
            req.session.save(() => {
                req.session.user_id = users.id;
                req.session.username = users.username;
                req.session.loggedIn = true;
                res.json(users);
            });
        });
});

// LOGIN
router.post('/login', (req, res) => {
    user.findOne({
        where: {
            email: req.body.email
        }
    }).then(users => {
        if (!users) {
            res.status(400).json({ message: 'There is No user with this email address!' });
            return;
        }
        console.log("comming password is ...............", req.body.password)
        const validPassword = users.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = users.id;
            req.session.username = users.username;
            req.session.loggedIn = true;

            res.json({ user: users, message: 'You are now logged in!' });
        });
    });
});


router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/1
router.put('/:id', Auth, (req, res) => {
    user.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(users => {
            if (!users[0]) {
                res.status(404).json({ message: 'There is No user with this id' });
                return;
            }
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', Auth, (req, res) => {
    user.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(users => {
            if (!users) {
                res.status(404).json({ message: 'There is No user with this id' });
                return;
            }
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;