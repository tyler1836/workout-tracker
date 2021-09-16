const express = require('express');
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require(routes))

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
