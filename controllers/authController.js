const { validateSignup, validationResult } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const User = require("../service/userService");

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

    await User.create(email, hashedPassword);

    res.redirect("/auth/login");
  },
];
