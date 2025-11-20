import { Document, Schema, model, Types } from "mongoose";
import { IGender } from "./gender";

export interface ICategory extends Document {
  name: string;
  slug: string;
  gender: Types.ObjectId | IGender;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    gender: { type: Schema.Types.ObjectId, ref: "Gender", required: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);
