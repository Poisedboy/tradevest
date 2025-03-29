"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ message: string; ok: boolean }> => {
  if (!email || !password) {
    return { message: "Email and password are required", ok: false };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { message: "User already exists", ok: false };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return {
    message: `User with ${user.email} was successfully created!`,
    ok: true,
  };
};
