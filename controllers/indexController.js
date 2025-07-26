const Folder = require("../service/folderService");

exports.getHome = async (req, res) => {
  if (req.user) {
    const id = req.user.id;
    const folders = await Folder.findById(id);
    res.render("home", { folders: folders });
  } else res.render("notLoggedIn");
};
