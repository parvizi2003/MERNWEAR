import { Request, Response } from "express";
import { Category, Product } from "@/models";

export const CategoryController = {
  getCategoriesByGender: async (req: Request, res: Response) => {
    try {
      const { genderId } = req.query;

      if (!genderId) {
        return res
          .status(400)
          .json({ message: "Gender query parameter is required" });
      }

      const categories = await Category.find({ gender: genderId }).sort({
        name: 1,
      });

      return res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      const { categorySlug } = req.params;

      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const products = await Product.find({
        category: category._id,
        isActive: true,
      });

      return res.status(200).json({
        products,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },
};
