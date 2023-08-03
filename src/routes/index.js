const express = require("express");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     parameters:
 *       - in: body
 *         name: item
 *         description: The item to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: The created item
 *       500:
 *         description: Internal Server Error
 */
router.get("/api", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "Hello to note app",
  });
});

module.exports = router;
