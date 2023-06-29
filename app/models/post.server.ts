import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPosts(userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return posts;
}

export async function getTags() {
  const tagCounts = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          Post: true,
        },
      },
    },
    orderBy: {
      Post: {
        _count: "desc",
      },
    },
  });
  
  return tagCounts;
}

export async function createPostExample() {
  const postData = {
    userId: "user_2QzqvY68b0uUm8VZnx81vISJvGQ", // Replace with the actual user ID
    content: "Lorem ipsum dolor sit amet",
    authorId: "cljfxazyy0000v510syzfdh37", // Replace with the actual author ID
  };

  const tagNames = ["happy", "holiday"]; // Replace with the desired tag names

  const createdPost = await prisma.post.create({
    data: {
      ...postData,
      Tag: {
        connectOrCreate: tagNames.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
    include: {
      Tag: true,
    },
  });

  console.log("Created Post:", createdPost);
  return createdPost;
}

export async function createPost({
  userId,
  content,
  authorId,
}: {
  userId: string;
  content: string;
  authorId: string;
}) {
  const hashtagRegex = /#\w+/g;

  // Extract hashtags from the post content
  const hashtags = content.match(hashtagRegex);
  if (hashtags) {
    const createdPost = await prisma.post.create({
      data: {
        userId,
        authorId,
        content,
        Tag: {
          connectOrCreate: hashtags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: {
        Tag: true,
      },
    });

    return createdPost;
  }

  const createdPost = await prisma.post.create({
    data: {
      userId,
      authorId,
      content,
    },
    include: {
      Tag: true,
    },
  });

  return createdPost;
}
