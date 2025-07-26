const { Router } = require("express");

const foldersRouter = Router();

const foldersController = require("../controllers/folderController");

foldersRouter.post("/create", foldersController.postCreate);

module.exports = foldersRouter;
