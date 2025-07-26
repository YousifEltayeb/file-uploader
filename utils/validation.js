const { body, validationResult } = require("express-validator");
const prisma = require("../config/prismaClient");
const emailErr = "must be a valid email";
const passwordErr = "must be at least 8 characters";
const emptyErr = "cannot be empty";
const existErr = "field must exist";

const validateSignup = [
  body("email")
    .exists()
    .withMessage(`Email ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyErr}`)
    .bail()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        throw new Error("Email is already used");
      }
    }),

  body("password")
    .exists()
    .withMessage(`Password ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage(`Password ${passwordErr}`),
  body("confirmPassword")
    .exists()
    .withMessage(`Password Confimation ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password Confimation ${emptyErr}`)
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords must match`),
];

const validateLogin = [
  body("email")
    .exists()
    .withMessage(`Email ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyErr}`)
    .bail()
    .isEmail()
    .withMessage(`Email ${emailErr}`),
  body("password")
    .exists()
    .withMessage(`Password ${existErr}`)
    .bail()
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage(`Password ${passwordErr}`),
];
module.exports = { validateLogin, validateSignup, validationResult };
