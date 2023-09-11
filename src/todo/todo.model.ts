import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
      unique: false,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true },
);

export interface Todo extends mongoose.Document {
  _id: string;
  ownerId: string;
  title: string;
  description: string;
}
