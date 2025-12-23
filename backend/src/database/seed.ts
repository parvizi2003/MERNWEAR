import { connectDB } from "./connect";
import { GenderSeeder } from "./seeders/gender-seeder";
import { CategorySeeder } from "./seeders/category-seeder";
import { ProductSeeder } from "./seeders/product-seeder";
import { ProductItemSeeder } from "./seeders/product_item-seeder";
import { AdminSeeder } from "./seeders/admin-seeder";

async function seedAll() {
  connectDB();
  const admin = await AdminSeeder();
  const genders = await GenderSeeder();
  const categories = await CategorySeeder(genders);
  const products = await ProductSeeder(categories);
  await ProductItemSeeder(products);

  console.log("All seeders finished!");
  process.exit();
}

seedAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
