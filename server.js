const express = require('express');
const app = express()
const path = require('path');
// const fileURLToPath = require('url').fileURLToPath;
// const __fileName = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__fileName)
const logger = require('morgan');
const mySecret = require('./config/config.js').mySecret;
const passport = require('passport');
const session = require('express-session');

const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const capsRoutes = require('./api/caps/routes.js').capsRoutes;





app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'))
const bodyParserJSON = bodyParser.json()
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true })
const router = express.Router()
const routerRoot = express.Router()
app.use(express.static('public/images'))
//app.use(express.static(path.join(__dirname, 'public/images')))
app.use(express.static('public/images'))
app.use(bodyParserJSON)
app.use(bodyParserURLEncoded)


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).json({status: false, error: 'Enter valid json body'}); // Bad request
  }
  next();
});


app.use(session({
  secret: mySecret,
  resave: false,
  saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)
app.use(routerRoot)
capsRoutes(router)

//routerRoot.use(express.static(path.join(__dirname, 'public/images')))

routerRoot.get('/', (req, res) => {
  res.render('pages/about.ejs');
});

app.listen(process.env.PORT || 4000)