const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const multerConfig = require("../configuration/image")

router.get("/:page?", mainController.getTeams, mainController.index);
router.get("/teams-img/:img", mainController.getImage);


router.post("/applyform", mainController.applyform);
router.post("/contactus", mainController.contactus);


router.post("/addmember", multerConfig.upload.single('image'), mainController.addMemberTeam);
// router.get("/getteammembers", mainController.getTeamMembers);
router.post("/updatemember", multerConfig.upload.single('image'), mainController.updateMemberTeam);
router.post("/deletemember", mainController.deleteMemberTeam)


module.exports = router;