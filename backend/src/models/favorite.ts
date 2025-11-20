import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user";
import { IProductItem } from "./product-item";

export interface IFavorite extends Document {
  user: Types.ObjectId | IUser;
  productItem: Types.ObjectId | IProductItem;
  createdAt?: Date;
  updatedAt?: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productItem: {
      type: Schema.Types.ObjectId,
      ref: "ProductItem",
      required: true,
    },
  },
  { timestamps: true }
);

export const Favorite = model<IFavorite>("Favorite", FavoriteSchema);
