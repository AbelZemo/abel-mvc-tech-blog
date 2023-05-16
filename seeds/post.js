const { post } = require('../models');

const posts = [
    {
        title: "Tutor",
        post: "keep up the good job. an amazing tutor",
        user_id: 3
    },
    {
        title: "youtube channel",
        post: "I have never seen such a beautiful youtube channel ",
        user_id: 1
    },
    {
        title: "facebook",
        post: "This is my facebook page",
        user_id: 2

    },
    {
        title: "upwork",
        post: "upwork is great frelancer website",
        user_id: 5
    },
    {
        title: "home",
        post: "I love my home",
        user_id: 4
    }
]

const seedPosts = () => post.bulkCreate(posts);

module.exports = seedPosts;