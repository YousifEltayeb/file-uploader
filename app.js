const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./config/prismaClient");
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const foldersRouter = require("./routes/foldersRouter");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.session());

// auth config
require("./config/passport");

//  access currentUser in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// TODO add routes

app.use("/{folders}", indexRouter);
app.use("/auth", authRouter);
app.use("/folders", foldersRouter);
app.all("/{*splat}", (req, res) => {
  res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => console.log("Server running on port: " + PORT));
