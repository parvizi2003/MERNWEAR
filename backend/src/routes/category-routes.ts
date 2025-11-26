import { Router } from "express";
import { CategoryController } from "@/controllers";
import { CheckAuth, CheckAdmin } from "@/middlewares";

const router = Router();

router.get("/", CategoryController.getCategoriesByGender);
router.get("/:slug", CategoryController.show);
router.post("/store", CheckAuth, CheckAdmin, CategoryController.store);
router.post("/update/:slug", CheckAuth, CheckAdmin, CategoryController.update);
router.delete(
  "/delete/:slug",
  CheckAuth,
  CheckAdmin,
  CategoryController.delete
);

export const CategoryRoutes = router;
