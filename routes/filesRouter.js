const { Router } = require("express");
const filesRouter = Router();
const filesController = require("../controllers/filesController");
filesRouter.get("/:fileId", filesController.getFile);
filesRouter.get("/update/:fileId", filesController.getUpdate);
filesRouter.post("/update/:fileId", filesController.postUpdate);
filesRouter.post("/delete/:fileId", filesController.postDelete);
filesRouter.post("/delete/all/:folderId", filesController.postDeleteAll);
filesRouter.post("/download/:fileId", filesController.postDownload);

module.exports = filesRouter;
