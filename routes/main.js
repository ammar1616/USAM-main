const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/:page?", mainController.getTeams, mainController.index);
router.get("/teams-img/:img", mainController.getImage);


router.post("/applyform", mainController.applyform);
router.post("/contactus", mainController.contactus);


router.post("/addmember", mainController.addMemberTeam);
// router.get("/getteammembers", mainController.getTeamMembers);
router.put("/updatemember", mainController.updateMemberTeam);
router.delete("/deletemember",mainController.deleteMemberTeam)


module.exports = router;