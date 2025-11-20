import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user";
import { CartItemSchema, ICartItem } from "./cart-item";

export interface ICart extends Document {
  user: Types.ObjectId | IUser;
  items: ICartItem[];
  total: number;
  items_count: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: { type: [CartItemSchema], default: [] },
    items_count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Cart = model<ICart>("Cart", CartSchema);
