const express = require("express");
const authController = require("../controllers/authController");
const AuthenWithPassportJWT = require("../passportJwt");

const router = express.Router();

router.post("/register", authController.register);
// ใช้ post เพราะต้องส่งข้อมูลที่กรอกไปเป็น body
router.post("/login", authController.login);
// ไม่ใช้ passport
// router.patch("/update", authController.authenticate, authController.updateUser);

// ใช้ passport
router.patch("/update", AuthenWithPassportJWT, authController.updateUser);

module.exports = router;
