const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const bodyParser = require('body-parser');
const _ = require('lodash');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const FacebookStrategy  =     require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const prompt = require('prompt-sync')({sigint: true});



const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: false
}));



app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const client = mongoose.connect("mongodb://localhost:27017/quora", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  detail: {
   FName: String,
   LName: String
},
  googleId: String,
  facebookId: String,
  img:
    {
        data: Buffer,
        contentType: String
    },
    followers: [
      String
    ],
    following: [
      String
    ],
  questions:   [
    {
        quetion: String,
        like: Boolean,
        dislike: Boolean,
        field: [
            String
        ],
        answers:[
            {
                answer: String,
                like: Boolean,
                dislike: Boolean
            }
        ]
    }
  ]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("Quora", userSchema);
// const user = require('./models/user');
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(User.createStrategy());

passport.serializeUser(function(user, done){
  done(null,user.id);
});


passport.deserializeUser(function(id,done){
User.findById(id,function(err,user){
  done(err,user);
});
});

passport.use(new GoogleStrategy({
    clientID: "127381979551-elbiv23larqi9m5tns5mccg8u53iksqk.apps.googleusercontent.com",
    clientSecret: "vYul7iD6YQpKIJ_vFSdNyqsZ",
    callbackURL: "http://localhost:3001/auth/google/quora",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    console.log("tt");
    User.findOrCreate({ username: profile.emails[0].value,googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/auth/google",
  passport.authenticate("google",{scope : ['profile',"email"]})
);

app.get("/auth/google/quora",
passport.authenticate("google",{failureRedirect : "login"}),
function(req, res){
  res.redirect('/');
}
);


app.post("/login", function(req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(newUser, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
    }
  });
});


app.post("/register", async function(requset, response){
  if(requset.body.password1 == requset.body.password2){
      await  User.findOne({ username: requset.body.username}, async function(err,foundUser){
    if(err){
      console.log(err);
    }else if(foundUser){
          response.send("user is already found");
    }else{
      await User.register({
        username: requset.body.username,
        active: false
      }, requset.body.password1, function(err, user) {
        if (err) {
          console.log(err);
        } else {
          var authenticate = User.authenticate();
  authenticate(requset.body.username, requset.body.password1, function(err, result) {
    if (err) {
        console.log("no");
    }else{
        result.detail.FName = requset.body.name;
        result.save(function(errs){
            if(errs){
                console.log(errs);
            }else{
                response.send('done');
            }
        })
        // console.log(result);
    }
  });
        }
      });
    }
  });
  }else{
      response.redirect("/register");
  }
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// app.get("/",function(req,res){
//   // res.render("blog");
//   res.render("signed");
// });
app.get("/",function(req,res){
  if(req.isAuthenticated()){
    res.render("signed");
  }
  else{
    res.render("blog");
  }
});


app.listen(3001, function(req, res){
console.log("up and running");
});
