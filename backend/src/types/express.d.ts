import { UserDocument } from "@/models/user"; // тип твоей модели User
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument;
    authToken: string;
  }
}
