import { Document, Schema, model, Types } from "mongoose";
import { IProductItem } from "./product-item";

export interface ICartItem {
  productItem: Types.ObjectId | IProductItem;
  count: number;
  total: number;
}

export const CartItemSchema = new Schema<ICartItem>(
  {
    productItem: {
      type: Schema.Types.ObjectId,
      ref: "ProductItem",
      required: true,
    },
    count: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

export const CartItem = model<ICartItem>("CartItem", CartItemSchema);
