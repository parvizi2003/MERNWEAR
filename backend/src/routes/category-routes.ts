import { Router } from "express";
import { CategoryController } from "@/controllers";

const router = Router();

router.get("/", CategoryController.getCategoriesByGender);

router.get("/:categorySlug", CategoryController.show);

export const CategoryRoutes = router;
