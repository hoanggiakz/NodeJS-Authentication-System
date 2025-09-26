const express = require("express"); // Importing express for the web framework
const bodyParser = require("body-parser"); // Importing bodyParser for parsing request bodies
const ejsLayouts = require("express-ejs-layouts"); // Importing express-ejs-layouts for layout support
const path = require("path"); // Importing path for file paths
const dotenv = require("dotenv"); // Importing dotenv to load environment variables
const session = require("express-session"); // Importing express-session for session management
const passport = require("passport"); // Importing passport for authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Importing Google OAuth 2.0 strategy for passport
const studentInfo = require('./config/student'); // Import student information

const { connectUsingMongoose } = require("./config/mongodb.js"); // Importing MongoDB connection function
const router = require("./routes/routes.js"); // Importing main application routes
const authrouter = require("./routes/authRoutes.js"); // Importing authentication routes

dotenv.config(); // Loading environment variables from .env file
const app = express(); // Initializing express application

//SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware để pass thông tin sinh viên
app.use((req, res, next) => {
    res.locals.studentName = studentInfo.studentName;
    res.locals.studentId = studentInfo.studentId;
    next();
});

//Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Set Templates
app.set("view engine", "ejs"); // Define template engine
app.use(ejsLayouts); // Use base template
app.set("views", path.join(__dirname, "views")); // Define template directory

// Static files
app.use(express.static("public"));

// DB Connection
connectUsingMongoose();

//ROUTES
app.get("/", (req, res) => {
  res.render("index", { 
    title: "NodeJS Authentication System",
    message: "Welcome! Go to /user/signin for the login page."
  });
});

app.use("/user", router);
app.use("/auth", authrouter);


//LISTEN
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Student: ${studentInfo.studentName} - ID: ${studentInfo.studentId}`);
});
