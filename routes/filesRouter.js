const { Router } = require("express");
const { file } = require("../config/prismaClient");
const filesRouter = Router();
const filesController = require("../controllers/filesController");
filesRouter.get("/:fileId", filesController.getFile);
filesRouter.get("/update/:fileId", filesController.getUpdate);
filesRouter.post("/update/:fileId", filesController.postUpdate);

module.exports = filesRouter;
