const express = require('express');
const app = express();
const PORT = 4000;

const middlewares = require('./middlewares');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes');
const dotenv = require('dotenv');

middlewares.setupAPP(app);

dotenv.config();

app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));

app.use(bodyParser.urlencoded({ extended: true }));

routes.setup(app);

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/');
    });
  });

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });