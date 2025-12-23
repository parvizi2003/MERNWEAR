import { User } from "@/models";
import bcrypt from "bcryptjs";

export async function AdminSeeder() {
  // Удаляем предыдущего админа (если был)
  await User.deleteOne({ isAdmin: true });

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await User.create({
    username: "admin",
    password: hashedPassword,
    email: "admin@example.com",
    isAdmin: true,
  });

  console.log("Admin seeded:", admin.username);
  return admin;
}
