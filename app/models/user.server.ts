import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

type UpdatedUser = Omit<User, "id" | "createdAt" | "updatedAt"> &
  Partial<Pick<User, "id">>;

export async function createUser(user: UpdatedUser) {
  const userData = await prisma.user.upsert({
    where: { clerkUserId: user.clerkUserId },
    create: user,
    update: user,
  });

  return userData;
}

export async function findUser(clerkUserId?: string) {
  const data = await prisma.user.findUnique({
    where: { clerkUserId },
    include: {
      followers: true,
      following: true,
    },
  });
  const followerCount = data?.followers.length;
  const followingCount = data?.following.length;
  const userData = {
    ...data,
    followerCount,
    followingCount,
  };

  return userData;
}

export async function getClerkUser(clerkUserId: string) {
  const url = "https://api.clerk.com/v1";
  const bearerToken = process.env.CLERK_SECRET_KEY;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    }
  };

  try {
    const response = await fetch(`${url}/users/${clerkUserId}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


export async function updateUserClerk({
  clerkUserId,
  profileId,
  about,
}: {
  clerkUserId: string | null;
  profileId: string | null;
  about: string | null;
}) {
  const url = "https://api.clerk.com/v1";
  const bearerToken = process.env.CLERK_SECRET_KEY;
  const body = {
    public_metadata: {
      profileId,
      about,
    },
  };
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(body),
  };

  fetch(`${url}/users/${clerkUserId}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return "Update User metadata is successful";
      } else {
        console.error(`Error: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
