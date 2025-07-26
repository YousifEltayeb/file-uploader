const {
  validateSignup,
  validateLogin,
  validationResult,
} = require("../utils/validation");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaClient");
const passport = require("passport");

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postSignup = [
  validateSignup,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        validationError: errors.array(),
      });
    }
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    res.redirect("/auth/login");
  },
];

exports.getLogin = (req, res) => {
  if (req.session.messages) {
    const err = req.session.messages.pop();
    return res.render("login", { loginError: err });
  }
  res.render("login");
};

exports.postLogin = [
  async (req, res, next) => {
    // to prevent the request from going further if the user is already logged in
    if (req.user) {
      res.status(200).redirect("/");
    } else next();
  },
  validateLogin,
  async (req, res, next) => {
    console.log("what");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        validationError: errors.array(),
      });
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
];

exports.postLogout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
