import { Product } from "@/models";
import { ICategory } from "@/models/category";
import { IProduct } from "@/models/product";

interface IProductSeed {
  name: string;
  description: string;
  price: number;
  categorySlug: string;
  brand: string;
}

const productData: IProductSeed[] = [
  {
    name: "Shirt",
    description: "Nice shirt",
    price: 20,
    categorySlug: "m_tops",
    brand: "BrandA",
  },
  {
    name: "Dress",
    description: "Beautiful dress",
    price: 50,
    categorySlug: "w_dresses",
    brand: "BrandB",
  },
  {
    name: "Pants",
    description: "Comfortable pants",
    price: 35,
    categorySlug: "m_bottoms",
    brand: "BrandC",
  },
];

export async function ProductSeeder(categories: ICategory[]) {
  await Product.deleteMany({});

  const productsToInsert = productData.map((p) => {
    const category = categories.find((c) => c.slug === p.categorySlug);
    if (!category) throw new Error(`Category not found: ${p.categorySlug}`);
    return {
      name: p.name,
      description: p.description,
      price: p.price,
      category: category._id,
      brand: p.brand,
    };
  });

  const products = await Product.insertMany(productsToInsert);
  console.log(
    "Products seeded:",
    products.map((p) => p.name)
  );
  return products as IProduct[];
}
