const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookies: {
    maxAge: 3600 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
};

// Handlebars
app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
  })
);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
