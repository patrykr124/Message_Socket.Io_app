const express = require("express"); 
const { protectRoutes } = require("../middleware/auth.middleware");
const { getUsersForSidebar } = require("../controllers/message.controller");
const router = express.Router();

// router.get('/user', protectRoutes, getUsersForSidebar )
// router.get("/:id", protectRoutes,getMessage)
// router.post("/send/:id", protectRoutes, sendMessage)

module.exports = router;