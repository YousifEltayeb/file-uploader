const { Router } = require("express");
const { file } = require("../config/prismaClient");
const filesRouter = Router();
const filesController = require("../controllers/filesController");
filesRouter.get("/:fileId", filesController.getFile);

module.exports = filesRouter;
