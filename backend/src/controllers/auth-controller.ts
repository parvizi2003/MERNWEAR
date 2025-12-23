import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "models";
import { getUserByEmail } from "models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      newUser.sessionTokens.push(token);

      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully.",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Credentials are invalid" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credentials are invalid" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      user.sessionTokens.push(token);
      await user.save();

      return res.status(200).json({
        message: "User logged in successfully.",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const token = req.authToken;
      user.sessionTokens = user.sessionTokens.filter(
        (t: string) => t !== token
      );
      await user.save();

      return res.status(200).json({ message: "Logged out successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  getUserByToken: async (req: Request, res: Response) => {
    try {
      const user = req.user;

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },
};
