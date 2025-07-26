const { Router } = require("express");

const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/{folders}", indexController.getHome);

module.exports = indexRouter;
