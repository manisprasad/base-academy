// src/models/Notes.model.ts
import { Document, model, Schema, Types } from "mongoose";
import { NotesType } from "../schemas/Notes.schema";

export interface INote extends NotesType, Document {
  _id: Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const NotesMongooseSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    des: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: [String], required: true },
    subject: { type: String },
    class: { type: String },
    isFree: { type: Boolean, required: true },
    price: { type: Number, min: 0 },
    thumbnail: { type: String },
    tags: { type: [String] , default: [] },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const NoteModel = model<INote>("Note", NotesMongooseSchema);

export default NoteModel;
