// require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const bodyParser = require('body-parser');
const _ = require('lodash');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const prompt = require('prompt-sync')({ sigint: true });

const app = express();
// app.use('/', routes);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(methodOverride('_method'));

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


// const client = mongoose.connect("mongodb://localhost:27017/quora", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// const conn = mongoose.connection;
// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });
// var storage = new GridFsStorage.GridFsStorage({
//   db: client,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
const mongoURI = "mongodb+srv:tushar-gupta:Tusha_78165@cluster0.rw4bq.mongodb.net/duplicate?retryWrites=true&w=majority";
// mongodb+srv:tushar-gupta:Tusha_78165@cluster0.rw4bq.mongodb.net/duplicate?retryWrites=true&w=majority
const client = mongoose.connect("mongodb+srv://tushar-gupta:Tusha_78165@cluster0.rw4bq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(x => {
            console.log(
                `Connected to Mongo! Database name: "${x.connections[0].name}"`,
            );
        })
        .catch(err => {
            console.error('Error connecting to mongo', err);
        });

const conn = mongoose.connection;
let gfs;

conn.once('open',() => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
const storage = new GridFsStorage.GridFsStorage({
  db: conn,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  detail: {
    FName: String,
    LName: String,
    FullName: String,
    Description: String,
    Education: String,
    State: String,
    City: String
  },
  googleId: String,
  facebookId: String,
  img: String,
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
  questions: [
    String
  ],
  time: String
});

const timeSchema = new mongoose.Schema({
  day: String,
  totaltime: {
    date: Number,
    month: Number,
    year: Number
  },
  entertime: {
    hour: Number,
    minute: Number,
    second: Number
  }
});

const questionSchema = new mongoose.Schema({
  ques: String,
  liked: Number,
  disliked: Number,
  answer: [
    {
      ans: String,
      postedUser: String,
      FullName: String,
      time: String,
      liked: Number,
      disliked: Number
    }
  ],
  userId: String,
  time: String
});


const complainSchema = new mongoose.Schema({
  complain: String,
  user: String,
  time: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("Quora", userSchema);
const User_question = mongoose.model("Question", questionSchema);
const userComplain = mongoose.model("complain", complainSchema);
const usertime = mongoose.model("time", timeSchema);
// const user = require('./models/user');
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: "127381979551-elbiv23larqi9m5tns5mccg8u53iksqk.apps.googleusercontent.com",
  clientSecret: "vYul7iD6YQpKIJ_vFSdNyqsZ",
  callbackURL: "http://localhost:3001/auth/google/quora",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ username: profile.emails[0].value, googleId: profile.id }, function (err, user) {
      user.detail.FName = profile.name.givenName;
      user.detail.LName = profile.name.familyName;
      user.detail.FullName = profile.name.givenName.toString() + " " + profile.name.familyName.toString();
      var d = new Date();
      if (!user.time) {
        var d = new Date();
        const time = new usertime({
          day: d.getDay(),
          totaltime: {
            date: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear()
          },
          entertime: {
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getHours()
          }
        });
        time.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
        user.time = time._id;
      }
      // console.log(d.getMonth());
      user.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
      return cb(err, user);
    });
  }
));




app.get("/auth/google",
  passport.authenticate("google", { scope: ['profile', "email"] })
);

app.get("/auth/google/quora",
  passport.authenticate("google", { failureRedirect: "login" }),
  function (req, res) {
    res.redirect('/');
  }
);

app.post('/upload', upload.single('file'), (req, res) => {
  // console.log(req.file);
  if (req.isAuthenticated()) {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        user.img = req.file.filename;
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            const url = "/profile/" + req.user._id;
            res.redirect(url);
            // res.json({ok: true});
          }
        });
      }
    });
  }
  // res.redirect('/');
});

app.post("/searching", function (req, res) {
  const make = req.body.search;
  var foundusers = [];
  var question = [];
  User.find({ "detail.FullName": { "$regex": req.body.search, "$options": "i" } }, '_id detail', function (err, user) {
    if (err) {
      console.log(err);
    } else {
      User_question.find({ "ques": { "$regex": req.body.search, "$options": "i" } }, '_id ques', function (err, questions) {
        if (err) {
          console.log(err);
        } else {
          if (req.isAuthenticated()) {
            User.findById(req.user._id, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                res.render("searcheduserwithsigned", { user: user, questions: questions, properuser: req.user._id, me: result });
              }
            });
          } else {
            res.render("searcheduserwithoutsigned", { user: user, questions: questions });
          }
        }
      });
    }
  });
});

// app.post("/editdetails", function(req,res){
//   if(req.isAuthenticated()){
//
//   }
// });
app.get('/image/:filename', (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.params.filename), function (err, user) {
    if (err) {
      console.log(err);
    } else {
      gfs.files.findOne({ filename: user.img }, (err, file) => {
        if (!file || file.length == 0) {
          res.sendFile(__dirname + '/public/images/user.png');
        } else {
          if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
          } else {
            res.status(404).json({
              err: 'Not an image'
            });
          }
        }
      });
    }
  });
});


// app.post("/login", function (req, res) {
//   const newUser = new User({
//     username: req.body.username,
//     password: req.body.password
//   });

//   req.login(newUser, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/");
//       });
//     }
//   });
// });
app.post("/login", function(req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  passport.authenticate('local', function (err, user, info) {
    if (! user) {
        res.render("forallfailures",{heading: "Something went wrong", message: "Try again"});
    } else{
      req.login(user, function(err){
          // const token =  jwt.sign({userId : user._id,
          //    username:user.username}, secretkey,
          //       {expiresIn: '24h'})
          //       res.redirect("/");
          res.redirect('/');
      });
    }
      })(req, res);
});

app.post("/askquestion", function (req, res) {
  if (req.isAuthenticated()) {
    var d = new Date();
    const time = new usertime({
      day: d.getDay(),
      totaltime: {
        date: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear()
      },
      entertime: {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getHours()
      }
    });
    time.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    const usd = req.user._id;
    const quest = req.body.question;
    const newUser = new User_question({
      ques: quest,
      userId: usd,
      time: time._id
    });
    newUser.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    const idd = newUser._id;
    User.findById(usd, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          User.updateOne({ _id: usd }, { $push: { questions: idd } }, function (err, success) {
            if (err) {
              console.log(err);
            } else {
              if (success) {
                res.send({ ok: true });
              } else {
                console.log("fail");
              }
            }
          });
        }
      }
    });
  } else {
    res.redirect("/");
  }
});


app.post("/userliked", function (req, res) {
  const data = req.body.data;
  if (req.isAuthenticated()) {
    const usd = mongoose.Types.ObjectId(data);
    User.findById(req.user._id, function (err, user) {
      var tt = false;
      for (let i = 0; i < user.liked.length; i++) {
        // console.log(usd);
        // console.log(user.liked[i]);
        if (usd == user.liked[i]) {
          tt = true;
          break;
        }
      }
      if (tt) {
        User.updateOne({ _id: req.user._id }, { $pull: { liked: usd } }, function (err, success) {
          if (err) {
            console.log(err);
          } else {
            res.json({ ok: true });
          }
        });
      } else {
        User.updateOne({ _id: req.user._id }, { $push: { liked: usd } }, function (err, success) {
          if (err) {
            console.log(err);
          } else {
            User.updateOne({ _id: req.user._id }, { $pull: { disliked: usd } }, function (err, success) {
              if (err) {
                console.log(err);
              } else {
                console.log("success");
              }
            });
          }
        });
      }
    });
  } else {
    res.json({ ok: false });
  }
});


app.post("/getname", (req, res) => {
  User.findById(req.body.data, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        const nt = {
          name: result.detail.FullName,
          id: result._id
        };
        res.json({ ok: nt });
      } else {
        res.json({ ok: false });
      }
    }
  })
});

app.post("/changePassword", function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (user.googleId) {
      res.render("forallfailures", { heading: "This account is linked with google", message: "Can't change the password" });
    } else {
      user.changePassword(req.body.oldpassword, req.body.newpassword, function (err, success) {
        if (err) {
          console.log(err)
        } else {
          const url = "/profile/" + user._id;
          res.redirect(url);
          // console.log("success");
        }
      });
    }
  });
});



app.post("/addmoredetails", async function (req, res) {

  await User.findById(req.user._id, async function (err, user) {
    if (req.body.FName) {
      user.detail.FName = req.body.FName;
      user.detail.FullName = req.body.FName + " " + user.detail.LName;
    }
    if (req.body.LName) {
      user.detail.LName = req.body.LName;
      user.detail.FullName = user.detail.FName + " " + req.body.LName;
    }
    if (req.body.LName && req.body.FName) {
      user.detail.FullName = req.body.FName + " " + req.body.LName;
    }
     user.save().then(function(){
      res.redirect('/profile/'+req.user._id);
    });
  });
});


app.post("/mailing", function (req, res) {
  // console.log(req.body.data);
  const data = JSON.parse(req.body.data);
  if (req.isAuthenticated()) {
    var d = new Date();
    const time = new usertime({
      day: d.getDay(),
      totaltime: {
        date: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear()
      },
      entertime: {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getHours()
      }
    });
    time.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    const newUser = new userComplain({
      complain: data.content,
      user: req.user._id,
      time: time._id
    });
    newUser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.json({ ok: true });
      }
    });
  } else {
    res.json({ ok: false });
    // res.render("forallfailures",{heading: "You are not logged in", message: "Kindly login or signup"});
  }
});


app.post("/answer", function (req, res) {
  if (req.isAuthenticated()) {
    var d = new Date();
    const time = new usertime({
      day: d.getDay(),
      totaltime: {
        date: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear()
      },
      entertime: {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getHours()
      }
    });
    time.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    User.findById(req.user._id, function (err, user) {
      User_question.updateOne({ _id: mongoose.Types.ObjectId(req.body.question) }, { $push: { answer: { ans: req.body.answer, postedUser: req.user._id, FullName: user.detail.FullName, time: time._id } } }, function (err, success) {
        if (err) {
          console.log(err);
        } else {
          const url = "/question/" + mongoose.Types.ObjectId(req.body.question);
          res.redirect(url);
        }
      });
    });
  } else {
    res.render("forallfailures", { heading: "You are not logged in", message: "Kindly login or signup" });
  }
});
app.post("/answered", function (req, res) {
  // console.log(req.body.data);
  const data = JSON.parse(req.body.data);
  console.log(data);
  if (req.isAuthenticated()) {
    var d = new Date();
    const time = new usertime({
      day: d.getDay(),
      totaltime: {
        date: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear()
      },
      entertime: {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getHours()
      }
    });
    time.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    User.findById(req.user._id, function (err, user) {
      User_question.updateOne({ _id: mongoose.Types.ObjectId(data.question) }, { $push: { answer: { ans: data.answer, postedUser: req.user._id, FullName: user.detail.FullName, time: time._id } } }, function (err, success) {
        if (err) {
          console.log(err);
        } else {
          // const url = "/question/"+mongoose.Types.ObjectId(req.body.question);
          res.json({ ok: true });
        }
      });
    });
  } else {
    res.json({ ok: false });
    // res.render("forallfailures",{heading: "You are not logged in", message: "Kindly login or signup"});
  }
});



app.post("/userdisliked", function (req, res) {
  const data = req.body.data;
  if (req.isAuthenticated()) {
    const usd = mongoose.Types.ObjectId(data);
    // console.log(usd);
    User.findById(req.user._id, function (err, user) {
      var tt = false;
      for (let i = 0; i < user.disliked.length; i++) {
        // console.log(usd);
        // console.log(user.liked[i]);
        if (usd == user.disliked[i]) {
          tt = true;
          break;
        }
      }
      if (tt) {
        User.updateOne({ _id: req.user._id }, { $pull: { disliked: usd } }, function (err, success) {
          if (err) {
            console.log(err);
          } else {
            res.json({ ok: true });
          }
        });
      } else {
        User.updateOne({ _id: req.user._id }, { $push: { disliked: usd } }, function (err, success) {
          if (err) {
            console.log(err);
          } else {
            User.updateOne({ _id: req.user._id }, { $pull: { liked: usd } }, function (err, success) {
              if (err) {
                console.log(err);
              } else {
                res.json({ ok: true });
              }
            });
          }
        });
      }
    });
  } else {
    res.render("forallfailures", { heading: "You are not logged in", message: "Please logged in" });
  }
});

app.get("/queries", async function (req, res) {
  await User_question.find({}, 'ques').exec(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      var arr = [];
      for (let i = user.length - 1; i >= 0; i--) {
        arr.push(user[i]);
      }
      if (req.isAuthenticated()) {
        res.render("questionswithsigned", { user: arr, properuser: req.user._id });
      } else {
        res.render("questionswithoutsigned", { user: arr });
      }
    }
  });
});

app.get("/question/:id", function (req, res) {
  User_question.findById(mongoose.Types.ObjectId(req.params.id), function (err, question) {
    if (err) {
      console.log(err);
    } else {
      if (req.isAuthenticated()) {
        User.findById({ _id: req.user._id }, function (err, user) {
          if (err) {
            console.log(err);
          } else {
            User.findById(question.userId, function (err, foundUser) {
              res.render("pageforquesanswithsigned", { user: question, iddd: question._id, likedarray: user.liked, dislikedarray: user.disliked, name: foundUser.detail.FullName, properuser: req.user._id, username: user.detail.FullName });
            });
          }
        });
      } else {
        User.findById(question.userId, function (err, foundUser) {
          res.render("pageforquesanswithoutsigned", { user: question, iddd: question._id, likedarray: [], dislikedarray: [], name: foundUser.detail.FullName });
        });
      }
    }
  });
});

app.post("/gettime", (req, res) => {
  usertime.findById(mongoose.Types.ObjectId(req.body.data), (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        res.json({ ok: result });
      } else {
        res.json({ ok: false });
      }
    }
  });
});


app.get("/profile/:id", async function (req, res) {
await  User.findById(req.params.id, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
    await  User_question.find({ '_id': { $in: result.questions } }, async (err, results) => {
        if (err) {
          console.log(err);
        } else {
        await  User_question.find({ 'answer.postedUser': req.params.id }).populate('answer').exec(async (err, answer) => {
            if (err) {
              console.log(err);
            } else {
            await  User.find({ '_id': { $in: result.followers } }).select('detail.FullName  time').exec(async (err, followers) => {
                if (err) {
                  console.log(err);
                } else {
                await  User.find({ '_id': { $in: result.following } }).select('detail.FullName time').exec(async (err, following) => {
                    if (err) {
                      console.log(err);
                    } else {
                      if (req.isAuthenticated()) {
                        if (req.params.id == req.user._id) {
                          res.render("myprofile", { user: result, question: results, answer: answer, followers: followers, following: following });

                        } else {
                    await      User.findById(req.user._id, async function (err, myUser) {
                            if (err) {
                              console.log(err);
                            } else if (result) {
                              res.render("otherprofilewithsign", { user: result, question: results, answer: answer, followers: followers, following: following, myUser: myUser });
                            } else {
                              console.log("NO");
                            }
                          });
                        }
                      } else {
                        res.render("otherprofilewithoutsign", { user: result, question: results, answer: answer, followers: followers, following: following });
                      }
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



app.post("/follow", function (req, res) {
  let usd = mongoose.Types.ObjectId(req.body.data);
  if (usd == req.user._id) {
    User.findById(usd).select('detail.FullName').exec(function (err, success) {
      if (err) {
        console.log(err);
      } else {
        res.json({ ok: success });
      }
    });
  } else {
    if (req.isAuthenticated()) {
      User.findById(req.user._id, function (err, user) {
        var tt = false;
        for (let i = 0; i < user.following.length; i++) {
          if (usd == user.following[i]) {
            tt = true;
            break;
          }
        }
        if (tt) {
          User.updateOne({ _id: req.user._id }, { $pull: { following: usd } }, function (err, success) {
            if (err) {
              console.log(err);
            }
          });
        } else {
          User.updateOne({ _id: req.user._id }, { $push: { following: usd } }, function (err, success) {
            if (err) {
              console.log(err);
            }
          });
        }
      });
      User.findById(usd, function (err, user) {
        var tt = false;
        for (let i = 0; i < user.followers.length; i++) {
          if (req.user._id == user.followers[i]) {
            tt = true;
            break;
          }
        }
        if (tt) {
          User.updateOne({ _id: usd }, { $pull: { followers: req.user._id } }, function (err, success) {
            if (err) {
              console.log(err);
            } else {
              User.findById(usd).select('detail.FullName').exec(function (err, success) {
                if (err) {
                  console.log(err);
                } else {
                  res.json({ ok: success });
                }
              });
            }
          });
        } else {
          User.updateOne({ _id: usd }, { $push: { followers: req.user._id } }, function (err, success) {
            if (err) {
              console.log(err);
            } else {
              User.findById(usd).select('detail.FullName').exec(function (err, success) {
                if (err) {
                  console.log(err);
                } else {
                  res.json({ ok: success });
                }
              });
            }
          });
        }
      });
    } else {
      res.json({ ok: false });
    }
  }
});



app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  if (req.isAuthenticated()) {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        user.img = req.file.filename;
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            const url = "/profile/" + req.user._id;
            res.redirect(url);
            // res.json({ok: true});
          }
        });
      }
    });
  }
  // res.redirect('/');
});


app.post("/register", async function (requset, response) {
  await User.findOne({ username: requset.body.username }, async function (err, foundUser) {
    if (err) {
      console.log(err);
    } else if (foundUser) {
      response.render("forallfailures", { heading: "Email Already Exists!", message: "Try using different Email or login" });
    } else {
      await User.register({
        username: requset.body.username,
        active: false
      }, requset.body.password, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          var authenticate = User.authenticate();
          authenticate(requset.body.username, requset.body.password, function (err, result) {
            if (err) {
              console.log("no");
            } else {
              result.detail.FName = requset.body.FName;
              result.detail.LName = requset.body.LName;
              result.detail.FullName = requset.body.FName.toString() + " " + requset.body.LName.toString();
              result.save(function (errs) {
                if (errs) {
                  console.log(errs);
                } else {
                  // console.log(result);

                  const newUser = new User({
                    username: requset.body.username,
                    password: requset.body.password
                  });

                  requset.login(newUser, function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      passport.authenticate("local")(requset, response, function () {
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



app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user._id, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.render("signed", { name: user.detail.FName, properuser: user._id });
      }
    });
  }
  else {
    res.render("blog");
  }
});





app.listen(3001, function (req, res) {
  console.log("up and running");
});
