// const Sequelize = require('sequelize');
// require('dotenv').config();

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );
// }

// module.exports = sequelize;






// const Sequelize = require('sequelize');
// const pg= require("pg")
// require('dotenv').config();

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DATABASE_URL,
//     {
//       dialectModule: pg
//     }
//   );
// }

// module.exports = sequelize;


const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    "dem1rb4i9frv2t",
    "fpieikcplgttnx",
    "2e5bc1733fdc7cb7c38d7e5c54b2c1399f0230f00e22589062474c0eacdf8a19",
    {
      host: "ec2-34-226-11-94.compute-1.amazonaws.com",
      dialect:"postgres",
      protocol:"postgres",
      port: 5432,
    }
  );
}

module.exports = sequelize;
