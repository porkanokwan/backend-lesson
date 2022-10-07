const express = require("express");
const supplierController = require("../controllers/supplierController");

const router = express.Router();

router.post("/", supplierController.createSupplier);
router.get("/", supplierController.getAllSupplier);
router.get("/:id", supplierController.getBySupplierId);
router.put("/:id", supplierController.updateSupplier);
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
