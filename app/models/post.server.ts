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
  const tags = await prisma.tags.groupBy({
    by: ["tags"],
    _count: {
      tags: true,
    },
    orderBy: {
      _count: {
        tags: "desc",
      },
    },
  });

  return tags;
}

export async function createPost(post: { userId: string; content: string }) {
  const hashtagRegex = /#\w+/g;

  // Extract hashtags from the post content
  const hashtags = post.content.match(hashtagRegex);
  const postData = await prisma.post.create({
    data: post,
  });

  const tags = hashtags?.map(async (item, i) => {
    return await prisma.tags.create({
      data: {
        postId: postData.id,
        userId: post.userId,
        tags: item,
        content: post.content,
      },
    });
  });

  return tags;
}
