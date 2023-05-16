const express = require('express');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers});
const routes = require('./controllers');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;



const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: '123',
  cookie: {
    // Session will automatically expire in 5 minutes
    expires: 5 * 60 * 1000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(routes);

// start connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
});