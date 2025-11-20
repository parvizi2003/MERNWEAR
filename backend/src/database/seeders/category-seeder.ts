import { Category } from "@/models";
import { ICategory } from "@/models/category";
import { IGender } from "@/models/gender";

interface ICategorySeed {
  name: string;
  slug: string;
  genderName: string;
}

const categoryData: ICategorySeed[] = [
  { name: "Tops", slug: "m_tops", genderName: "men" },
  { name: "Bottoms", slug: "m_bottoms", genderName: "men" },
  { name: "Shoes", slug: "m_shoes", genderName: "men" },
  { name: "Dresses", slug: "w_dresses", genderName: "women" },
  { name: "Tops", slug: "w_tops", genderName: "women" },
  { name: "Bottoms", slug: "w_bottoms", genderName: "women" },
  { name: "Shoes", slug: "w_shoes", genderName: "women" },
];

export async function CategorySeeder(genders: IGender[]) {
  await Category.deleteMany({});

  const categoriesToInsert = categoryData.map((cat) => {
    const gender = genders.find((g) => g.name === cat.genderName);
    if (!gender) throw new Error(`Gender not found: ${cat.genderName}`);
    return {
      name: cat.name,
      slug: cat.slug,
      gender: gender._id,
    };
  });

  const categories = await Category.insertMany(categoriesToInsert);
  console.log(
    "Categories seeded:",
    categories.map((c) => c.name)
  );
  return categories as ICategory[];
}
