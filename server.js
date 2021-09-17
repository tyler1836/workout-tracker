const express = require('express');
const routes = require('./controllers')
const sequelize = require('./config/connection.js')
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.store)

const sess = {
  secret: 'key',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })

};

app.use(session(sess));


const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on ${PORT}'));
});
