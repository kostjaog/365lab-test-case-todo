import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
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

export interface Post extends mongoose.Document {
  _id: string;
  ownerId: string;
  title: string;
  description: string;
}
