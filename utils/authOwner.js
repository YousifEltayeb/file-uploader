const prisma = require("../config/prismaClient");

exports.authOwner = async (req, res, next, entity) => {
  if (req.user) {
    if (entity.folderId) {
      const userId = req.user.id;
      const foldersList = await prisma.folder.findMany({ where: { userId } });
      const foundFolder = foldersList.find(
        (folder) => folder.id === entity.folderId,
      );
      foundFolder ? next() : res.send("this ain't your forlder dawg");
    } else if (entity.fileId) {
      const userId = req.user.id;
      const fileList = await prisma.file.findMany({ where: { userId } });
      const foundFile = fileList.find((file) => file.id === entity.fileId);
      foundFile ? next() : res.send("this ain't your file dawg");
    }
  } else res.redirect("/");
};
