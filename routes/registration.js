const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration/registration");
const VRegisteration = require("../validators/registeration.validator");
router.get("/Registeration", registrationController.getRegistration);
router.post(
  "/Registeration",
  VRegisteration.VRegisteration,
  VRegisteration.VQ5Counter,
  registrationController.postRegistration
);

module.exports = router;
