const { Router } = require("express");

const foldersRouter = Router();

const foldersController = require("../controllers/folderController");

foldersRouter.post("/create", foldersController.postCreate);
foldersRouter.get("/:folderId", foldersController.getRead);
foldersRouter.post("/upload/:folderId", foldersController.postUploadFile);
foldersRouter.get("/update/:folderId", foldersController.getUpdate);
foldersRouter.post("/update/:folderId", foldersController.postUpdate);
foldersRouter.post("/delete/:folderId", foldersController.postDelete);

module.exports = foldersRouter;
