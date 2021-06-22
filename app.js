// require('dotenv').config();
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
// var nodemailer = require('nodemailer');




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
   LName: String,
   FullName: String
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
    liked: [
        String
    ],
    disliked: [
       String
    ],
  questions:   [
    {
      userId: String
    }
  ]
});

const questionSchema = new  mongoose.Schema({
  ques : String,
  liked: Number,
  disliked: Number,
  userId: String
});


const complainSchema = new mongoose.Schema({
  complain: String,
  user: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("Quora", userSchema);
const User_question = mongoose.model("Question", questionSchema);
const userComplain = mongoose.model("complain", complainSchema);
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
    // console.log(profile);
    // console.log("tt");
    User.findOrCreate({ username: profile.emails[0].value,googleId: profile.id }, function (err, user) {
      user.detail.FName= profile.name.givenName;
      user.detail.LName= profile.name.familyName;
       user.detail.FullName= profile.name.givenName.toString()+" "+profile.name.familyName.toString();
       user.save(function (err){
         if(err){
           console.log(err);
         }
       });
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


app.post("/searching",function(req,res){
  const make =req.body.search;
  var foundusers=[];
  var question=[];
  User.find({"detail.FullName": {  "$regex": req.body.search, "$options": "i" }},'_id detail',function(err,user){
    if(err){
      console.log(err);
    }else{
      User_question.find({"ques": {  "$regex": req.body.search, "$options": "i" }},'_id ques',function(err,questions){
        if(err){
          console.log(err);
        }else{
        if(req.isAuthenticated()){
          res.render("searcheduserwithsigned",{user: user, questions: questions});
        }else{
          res.render("searcheduserwithoutsigned",{user: user, questions: questions});
        }
        }
      });
}
  });
});




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

app.post("/askquestion", function(req,res){
  if(req.isAuthenticated()){
    // console.log(req.isAuthenticated());
    // console.log(req.user._id);
    const usd = req.user._id;
     // console.log(req.body.question);
     const quest = req.body.question;
     const newUser = new User_question({
       ques: quest,
       userId: usd
     });
    newUser.save(function(err){
       if(err){
         console.log(err);
       }
     });
    // console.log(newUser);
     const idd = newUser._id;
     // console.log(idd);
     User.findById(usd, function(err, user){
       if(err){
         console.log(err);
       }else{
         if(user){
           User.updateOne({_id: usd},{$push: {questions: {userId: idd}}},function(err,success){
             if(err){
               console.log(err);
             }else{
               if(success){
                 // res.send("done");
                 res.redirect("/queries");
               }else{
                 console.log("fail");
               }
             }
           });
         }
       }
     });
  }else{
    res.redirect("/");
  }
});


app.post("/userliked",function(req,res){
  // User
  User.updateOne({_id: req.user._id},{$push: {liked: req.body.user}},function(err,success){
    if(err){
      console.log(err);
    }else{
      if(success){
        res.send("done");
      }else{
        console.log("fail");
      }
    }
  });
});

app.post("/mailing",function(req,res){
  // console.log(req.body.content);
  if(req.isAuthenticated()){
    const newUser = new userComplain({
      complain: req.body.content,
      user: req.user._id
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.send("successfully submitted");
      }
    });
  }else{
    res.render("forallfailures",{heading: "You are not logged in", message: "Kindly login or signup"});
  }
});




app.post("/userdisliked",function(req,res){
  User.updateOne({_id: req.user._id},{$push: {disliked: req.body.user}},function(err,success){
    if(err){
      console.log(err);
    }else{
      if(success){
        res.send("done");
      }else{
        console.log("fail");
      }
    }
  });
});

app.get("/queries", async function(req,res){
    await   User_question.find({},'ques').exec(function(err,user){
      if(err){
     console.log(err);
      }else{
        if(req.isAuthenticated()){
          res.render("questionswithsigned",{user: user} );
        }else{
          res.render("questionswithoutsigned",{user: user} );
        }
      }
    });
});

app.get("/question/:id",function(req, res){
User_question.findById(req.params.id,function(err,user){
  if(err){
console.log(err);
  }else{
   if(req.isAuthenticated()){
     res.render("pageforquesanswithsigned",{user:user});
   }else{
     res.render("pageforquesquestionwithoutsigned",{user: user});
   }
  }
});
});

app.post("/register", async function(requset, response){
      await  User.findOne({ username: requset.body.username}, async function(err,foundUser){
    if(err){
      console.log(err);
    }else if(foundUser){
        response.render("forallfailures",{heading: "Email Already Exists!", message: "Try using different Email or login"});
    }else{
      await User.register({
        username: requset.body.username,
        active: false
      }, requset.body.password, function(err, user) {
        if (err) {
          console.log(err);
        } else {
          var authenticate = User.authenticate();
   authenticate(requset.body.username, requset.body.password, function(err, result) {
    if (err) {
        console.log("no");
    }else{
      result.detail.FName = requset.body.FName;
        result.detail.LName = requset.body.LName;
        result.detail.FullName = requset.body.FName.toString()+" "+requset.body.LName.toString();
        result.save(function(errs){
            if(errs){
                console.log(errs);
            }else{
              // console.log(result);

              const newUser = new User({
                username: requset.body.username,
                password: requset.body.password
              });

              requset.login(newUser, function(err) {
                if (err) {
                  console.log(err);
                } else {
                  passport.authenticate("local")(requset, response, function() {
                    response.redirect("/");
                  });
                }
              });
            }
        });
    }
  });
        }
      });
    }
  });
});



app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get("/",  function(req, res){
  if(req.isAuthenticated()){
     User.findById(req.user._id, function(err,user){
      if(err){
        console.log(err);
      }else{
        res.render("signed",{name: user.detail.FName});
      }
    });
  }
  else{
    res.render("blog");
  }
});



app.listen(3001, function(req, res){
console.log("up and running");
});
