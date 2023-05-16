const { user } = require('../models');

const users = [
    {
        username: "papa",
        email: "papa@gmail.com",
        password: "papa123"
    },
    {
        username: "gb",
        email: "gb@gmail.com",
        password: "gb123"
    },
    {
        username: "sol",
        email: "sol@gmail.com",
        password: "sol123"
    },
    {
        username: "abel",
        email: "abel@gmail.com",
        password: "abel123"
    },
    {
        username: "john",
        email: "john@gmail.com",
        password: "john123"
    },
    {
        username: "sami",
        email: "sami@gmail.com",
        password: "v123"
    }
]

const seedUsers = () => user.bulkCreate(users);

module.exports = seedUsers;