import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controller/NotesController"; // Adjust the path as needed

import { NotesZodSchema } from "../schemas/Notes.schema";
import verifyJWT from "../middleware/verifyJWT";
import verifyRole from "../middleware/verifyRoles";
import { Roles } from "../config/roleList";
import { validateSchmea } from "../middleware/validateSchema";

const notesRouter = express.Router();

// POST /notes - Create a new note
notesRouter.post("/", validateSchmea(NotesZodSchema), verifyJWT, verifyRole(Roles.Teacher),  createNote);

// GET /notes - Get all notes
notesRouter.get("/", getAllNotes);

// GET /notes/:id - Get a single note by ID
notesRouter.get("/:id", getNoteById);

// PUT /notes/:id - Update a note by ID
notesRouter.put("/:id", verifyJWT, verifyRole(Roles.Teacher), updateNote);

// DELETE /notes/:id - Delete a note by ID
notesRouter.delete("/:id", verifyJWT,  verifyRole(Roles.Teacher), deleteNote);

export default notesRouter;
