import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

type UpdatedUser = Omit<User, "id"> & Partial<Pick<User, "id">>;
export async function createUser(user: UpdatedUser) {
  const userData = await prisma.user.upsert({
    where: { clerkUserId: user.clerkUserId },
    create: user,
    update: user,
  });

  return userData;
}

export async function findUser(clerkUserId: string) {
  const data = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  return data;
}
