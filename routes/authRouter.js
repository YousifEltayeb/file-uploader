const { Router } = require("express");

const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.postSignup);
module.exports = authRouter;
