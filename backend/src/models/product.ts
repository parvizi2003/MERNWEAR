import { Document, Schema, model, Types } from "mongoose";
import { ICategory } from "./category";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId | ICategory;
  reviewsCount?: number;
  purchasedCount?: number;
  brand: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    reviewsCount: { type: Number, default: 0 },
    purchasedCount: { type: Number, default: 0 },
    brand: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);
