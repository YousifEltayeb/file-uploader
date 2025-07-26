const { Router } = require("express");

const foldersRouter = Router();

const foldersController = require("../controllers/folderController");

foldersRouter.post("/create", foldersController.postCreate);
foldersRouter.get("/:folderId", foldersController.getRead);
foldersRouter.post("/upload/:folderId", foldersController.postUploadFile);

module.exports = foldersRouter;
