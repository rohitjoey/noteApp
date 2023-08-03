const express = require("express");

const router = express.Router();
const noteController = require("../controllers/notes.controller");

router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getNotes);
router.get("/notes/:userId", noteController.getNoteByUserId);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
