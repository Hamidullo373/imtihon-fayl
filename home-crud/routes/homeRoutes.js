const express = require("express");
const {
  getAllHomes,
  getHomeById,
  createHome,
  deleteHome,
  patchHome,
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", getAllHomes);
router.get("/:id", getHomeById);
router.post("/", createHome);
router.delete("/:id", deleteHome);
router.patch("/:id", patchHome);
module.exports = router;
