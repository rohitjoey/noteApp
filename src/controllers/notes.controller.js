const db = require("../config/database");

const createNote = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO notes (title, description, user_id) VALUES ($1, $2, $3)",
      [title, description, userId]
    );

    res.status(201).send({
      message: "Note added successfully!",
      body: {
        note: { title, description },
      },
    });
  } catch (err) {
    console.error("Error creating note", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNotes = async (req, res) => {
  try {
    const allItems = await db.query("SELECT * FROM notes");
    res.status(200).json(allItems.rows);
  } catch (err) {
    console.error("Error retrieving items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNoteByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await db.query("SELECT * FROM notes WHERE user_id=$1", [
      userId,
    ]);
    if (notes.rows.length === 0) {
      return res.status(404).json({ error: "No Notes found for this user" });
    }

    res.status(200).json(notes.rows);
  } catch (err) {
    console.error("Error retrieving note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNoteById = async (noteId) => {
  try {
    const note = await db.query("SELECT * FROM notes WHERE note_id=$1", [
      noteId,
    ]);
    return note.rows;
  } catch (err) {
    console.error("Error retrieving note:", err);
    return;
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, description } = req.body;

    const note = await getNoteById(id);
    if (note.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (!title) {
      title = note[0].title;
    }

    if (!description) {
      description = note[0].description;
    }

    const updatedItem = await db.query(
      "UPDATE notes SET title = $1, description = $2 WHERE note_id = $3 RETURNING *",
      [title, description, id]
    );

    if (updatedItem.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(updatedItem.rows[0]);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await db.query(
      "DELETE FROM notes WHERE note_id = $1 RETURNING *",
      [id]
    );

    if (deletedItem.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(deletedItem.rows[0]);
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteByUserId,
  updateNote,
  deleteNote,
};
