import { Request, Response } from "express";
import { NotesType } from "../schemas/Notes.schema";
import NoteModel from "../model/Notes";
import { ApiResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";

export const createNote = async (req: Request, res: Response) => {
    try {
        const noteData: NotesType = req.body;
        const newNote = await NoteModel.create(noteData);
        if (!newNote) {
             ApiResponse.error(res, "Failed to create note", StatusCodes.BAD_REQUEST);
             return;
        }
        ApiResponse.success(res, "Note created successfully", newNote, StatusCodes.CREATED);
    } catch (error) {
        console.error("Error creating note:", error);
        ApiResponse.error(res, "Failed to create note", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await NoteModel.find();
        if (!notes || notes.length === 0) {
             ApiResponse.notFound(res, "No notes found");
             return
        }
        ApiResponse.success(res, "Notes fetched successfully", notes, StatusCodes.OK);
    } catch (error) {
        console.error("Error fetching notes:", error);
        ApiResponse.error(res, "Failed to fetch notes", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const getNoteById = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const note = await NoteModel.findById(noteId);
        if (!note) {
             ApiResponse.notFound(res, "Note not found");
             return;
        }
        ApiResponse.success(res, "Note fetched successfully", note, StatusCodes.OK);
    } catch (error) {
        console.error("Error fetching note:", error);
        ApiResponse.error(res, "Failed to fetch note", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const updatedData: NotesType = req.body;
        const updatedNote = await NoteModel.findByIdAndUpdate(noteId, updatedData, { new: true });
        if (!updatedNote) {
             ApiResponse.notFound(res, "Note not found");
             return;
        }
        ApiResponse.success(res, "Note updated successfully", updatedNote, StatusCodes.OK);
    } catch (error) {
        console.error("Error updating note:", error);
        ApiResponse.error(res, "Failed to update note", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const deletedNote = await NoteModel.findByIdAndDelete(noteId);
        if (!deletedNote) {
             ApiResponse.notFound(res, "Note not found");
             return;
        }
        ApiResponse.success(res, "Note deleted successfully", deletedNote, StatusCodes.OK);
    } catch (error) {
        console.error("Error deleting note:", error);
        ApiResponse.error(res, "Failed to delete note", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}