import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "models";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const CheckAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const unauthorized = () => res.status(401).json({ message: "Unauthorized" });

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return unauthorized();
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user || !user.sessionTokens.includes(token)) return unauthorized();

    req.user = user;
    req.authToken = token;

    return next();
  } catch (err) {
    return unauthorized();
  }
};
