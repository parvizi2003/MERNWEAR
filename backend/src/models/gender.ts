import { Document, Schema, model } from "mongoose";

export interface IGender extends Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GenderSchema = new Schema<IGender>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Gender = model<IGender>("Gender", GenderSchema);
