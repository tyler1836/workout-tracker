const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers')
const sequelize = require('./config/connection.js')
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config()



const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
  secret: 'key',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

 // allows use of session. in handlebars such as #if session.loggedIn
 app.use(session(sess));
 app.use(function (req, res, next) {
     res.locals.session = req.session;
     next();
 });



const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
