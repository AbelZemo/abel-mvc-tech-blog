const { comment } = require('../models');

const comments = [
    {
        user_id: 1,
        post_id: 5,
        comment: " comment for post 1"
    },
    {
        user_id: 4,
        post_id: 4,
        comment: " comment for post 2"
    },
    {
        user_id: 1,
        post_id: 4,
        comment: " comment for post 3"
    },
    {
        user_id: 3,
        post_id: 5,
        comment: " comment for post 4"
    },
    {
        user_id: 3,
        post_id: 2,
        comment: " comment for post 5"
    },
    {
        user_id: 3,
        post_id: 4,
        comment: " comment for post 6"
    },
    {
        user_id: 5,
        post_id: 3,
        comment:" comment for post 7"
    },
    {
        user_id: 2,
        post_id: 1,
        comment: " comment for post 8"
    }
]

const seedComments = () => comment.bulkCreate(comments);

module.exports = seedComments;