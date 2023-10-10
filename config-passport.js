const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./sequelize.js').User;
const bcrypt = require('bcrypt');
const hash = require('bcrypt').hash;
const FACEBOOK_CLIENT_ID = require('./config/config.js').FACEBOOK_CLIENT_ID;
const FACEBOOK_SECRET_KEY = require('./config/config.js').FACEBOOK_SECRET_KEY;
const FACEBOOK_CALLBACK_URL = require('./config/config.js').FACEBOOK_CALLBACK_URL;


passport.serializeUser((user, done) => {
  //done(null, user.DISPLAYNAME);
  done(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// passport.deserializeUser( (user, done) => {
//   done(null, DISPLAYNAME);
// });


const chechAuth = async (hash, pass) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, (err, data) => {
      if (err) {
        return reject(err)
      }
      //console.log("chechAuth data : ", data)
      return resolve(data)
    })
  })
    .catch(err => {
      console.log("chechAuth error : ", err)
    })
}

passport.use(
  new LocalStrategy({ usernameField: 'login' }, async (login, password, done) => {
    const user = await User.findOne({ where: { DISPLAYNAME: login.toLowerCase() } })

    if (user && login.toLowerCase() === user.DISPLAYNAME) {
      chechAuth(user.PASSWORDHASH, password)
        .then(data => {
          if (data) {
            let userCut = {}
            userCut.DISPLAYNAME = user.DISPLAYNAME.trim()
            userCut.TYPELOGIN = user.TYPELOGIN.trim()
            userCut.LAST_RES = user.LAST_RES.trim()
            userCut.BESTSCORE = user.BESTSCORE
            return done(null, userCut);
          } else {
            return done(null, false);
          }

        })

    } else {
      return done(null, false);
    }

  })
);


passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_SECRET_KEY,
      callbackURL: FACEBOOK_CALLBACK_URL,
      //profileFields: ['id', 'displayName', 'photos', 'email']
      profileFields: ['id', 'displayName', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);


exports.postLogin = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json('CODE LOGIN_USER_02 Wrong login or password !');
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({user : user});
    });
  })(req, res, next);
}



exports.getLoginFacebook = async (req, res, next) => {
  console.log("0")
  passport.authenticate('facebook', (err, user) => {
    console.log("1")
    if (err) {
      console.log("2")
      return next(err);
    }
    if (!user) {
      console.log("3")
      return res.json('CODE LOGIN_USER_02 Wrong login or password !');
    }
    req.login(user, (err) => {
      console.log("4")
      if (err) {
        console.log("5")
        return next(err);
      }
      return res.json({user : user});
    });
  })(req, res, next);
}

exports.getLoginFB_CB = async (req, res, next) => {
  passport.authenticate('facebook', {
    successRedirect: '/api/profile',
    failureRedirect: '/api/error'
  }),
  function(req, res) {
      // Successful authentication, redirect home.
      return res.json({user : req.user});
  }  
} 




