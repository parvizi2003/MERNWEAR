import { Document, Schema, model, Types } from "mongoose";
import { IProduct } from "./product";

interface ISize {
  size: string;
  stock: number;
  isActive: boolean;
}

export interface IProductItem extends Document {
  product: Types.ObjectId | IProduct;
  image_url: string;
  color: string;
  sizes: ISize[];
  stock: number;

  createdAt?: Date;
  updatedAt?: Date;
}

const SizeSchema = new Schema<ISize>(
  {
    size: { type: String, required: true },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const ProductItemSchema = new Schema<IProductItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    image_url: { type: String, required: true },
    color: { type: String, required: true },
    sizes: { type: [SizeSchema], default: [] },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProductItem = model<IProductItem>(
  "ProductItem",
  ProductItemSchema
);
