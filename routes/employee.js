const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const EmployeeController = require("../controllers/EmployeeController");
const authenticateToken = require("../middleware/authentication");

const userLogin = require("../controllers/authController");
router.post("/post", EmployeeController.post);
router.post("/signup", EmployeeController.signUp);
router.post("/login", userLogin);
router.get("/", authenticateToken, EmployeeController.index);
router.post("/show", EmployeeController.show);
//router.post("/store", upload.array("avatar[]"), EmployeeController.store); if you want to upload list of images use array()method instead of single()
router.post("/store", upload.single("avatar"), EmployeeController.store);
router.post("/update", EmployeeController.update);
router.delete("/delete", EmployeeController.destroy);

module.exports = router;
