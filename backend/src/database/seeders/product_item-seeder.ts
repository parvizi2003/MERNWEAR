import { ProductItem } from "@/models";
import { IProduct } from "@/models/product";

interface IProductItemSeed {
  productName: string;
  color: string;
  image_url: string;
  sizes: { size: string; stock: number }[];
}

const productItemsData: IProductItemSeed[] = [
  {
    productName: "Shirt",
    color: "#000000",
    image_url: "public/images/products/shirt_black.webp",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
    ],
  },
  {
    productName: "Shirt",
    color: "#694a34",
    image_url: "public/images/products/shirt_brown.webp",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
    ],
  },
  {
    productName: "Shirt",
    color: "#870f11",
    image_url: "public/images/products/shirt_burundy.webp",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
    ],
  },
  {
    productName: "Dress",
    color: "Red",
    image_url: "https://example.com/red-dress.jpg",
    sizes: [
      { size: "M", stock: 5 },
      { size: "L", stock: 7 },
    ],
  },
];

export async function ProductItemSeeder(products: IProduct[]) {
  await ProductItem.deleteMany({});

  const itemsToInsert = productItemsData.map((item) => {
    const product = products.find((p) => p.name === item.productName);
    if (!product) throw new Error(`Product not found: ${item.productName}`);
    return {
      product: product._id,
      color: item.color,
      image_url: item.image_url,
      sizes: item.sizes,
      stock: item.sizes.reduce((sum, s) => sum + s.stock, 0),
    };
  });

  const productItems = await ProductItem.insertMany(itemsToInsert);
  console.log(
    "ProductItems seeded:",
    productItems.map((i) => `${i.color} ${i.product}`)
  );
  return productItems;
}
