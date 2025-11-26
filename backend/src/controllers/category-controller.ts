import { Request, Response } from "express";
import { Category, Gender, Product } from "@/models";
import { IGender } from "@/models/gender";

function generateSlug(name: string, genderName: string) {
  return (genderName[0] + "_" + name.replace(/\s+/g, "-")).toLowerCase();
}

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
      const { slug } = req.params;

      const category = await Category.findOne({ slug: slug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const products = await Product.find({ category: category.id });

      return res.status(200).json(products);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  store: async (req: Request, res: Response) => {
    try {
      const { name, genderId } = req.body;
      if (!name || !genderId) {
        return res
          .status(400)
          .json({ message: "Name and genderId are required" });
      }

      const gender = await Gender.findById(genderId);
      if (!gender) {
        return res.status(404).json({ message: "Gender not found" });
      }

      const slug = generateSlug(name, gender.name);

      const existingCategory = await Category.findOne({
        slug,
      });
      if (existingCategory) {
        return res
          .status(409)
          .json({ message: "Category with this name already exists" });
      }

      const newCategory = new Category({ name, slug, gender: gender.id });
      await newCategory.save();
      return res.status(201).json(newCategory);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const { name, genderId } = req.body;

      const category = await Category.findOne({ slug }).populate("gender");
      if (!category)
        return res.status(404).json({ message: "Category not found" });

      let gender = category.gender as IGender;
      let slugChanged = false;

      if (genderId && genderId.toString() !== category.gender.id.toString()) {
        const g = await Gender.findById<IGender>(genderId);
        if (!g) return res.status(404).json({ message: "Gender not found" });
        category.gender = g.id;
        gender = g;
        slugChanged = true;
      }

      if (name?.trim() && name.trim() !== category.name) {
        category.name = name.trim();
        slugChanged = true;
      }

      if (slugChanged) {
        const newSlug = generateSlug(category.name, gender.name);

        const existing = await Category.findOne({
          slug: newSlug,
        });
        if (existing)
          return res.status(409).json({
            message: "Category with this name and gender already exists",
          });

        category.slug = newSlug;
      }

      await category.save();
      return res.status(200).json(category);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      if (!slug?.trim())
        return res.status(400).json({ message: "Slug is required" });

      const category = await Category.findOne({ slug });
      if (!category)
        return res.status(404).json({ message: "Category not found" });

      const hasProducts = await Product.exists({ category: category.id });
      if (hasProducts) {
        return res.status(400).json({
          message:
            "Cannot delete category with associated products. Remove products first.",
        });
      }

      await category.deleteOne();
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err });
    }
  },
};
