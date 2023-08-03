const express = require("express");

const router = express.Router();
const noteController = require("../controllers/notes.controller");

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Post a note
 *     tags: [Note]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *             required:
 *               - title
 *               - description
 *               - userId
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 note_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/notes", noteController.createNote);
/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   note_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *       500:
 *         description: Internal Server Error
 */
router.get("/notes", noteController.getNotes);
/**
 * @swagger
 * /notes/userId:
 *   get:
 *     summary: Get all notes by user
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   note_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *       500:
 *         description: Internal Server Error
 */
router.get("/notes/:userId", noteController.getNoteByUserId);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the note to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   note_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/notes/:id", noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete an note by ID
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the note to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   note_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
