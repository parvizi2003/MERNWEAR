import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  sessionTokens: string[];
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sessionTokens: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);

export const getUserByEmail = async (email: string) =>
  await User.findOne({ email: email });
