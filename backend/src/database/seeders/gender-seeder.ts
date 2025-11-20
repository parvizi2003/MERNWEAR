import { Gender } from "@/models";

export async function GenderSeeder() {
  await Gender.deleteMany({});
  const genders = await Gender.insertMany([{ name: "men" }, { name: "women" }]);
  console.log(
    "Genders seeded:",
    genders.map((g) => g.name)
  );
  return genders;
}
