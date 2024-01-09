import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return posts;
}

async function fetchNestedComments(comment: any) {
  const nestedComments = await prisma.post.findMany({
    where: {
      parentId: comment.id,
    },
    include: {
      responseFrom: true,
    },
  });

  if (nestedComments.length === 0) {
    return [];
  }

  const nestedCommentsWithReplies: any = await Promise.all(
    nestedComments.map(async (nestedComment) => {
      const replies = await fetchNestedComments(nestedComment);
      return {
        ...nestedComment,
        comments: replies,
      };
    })
  );

  return nestedCommentsWithReplies;
}

export async function getAllPostWithCommentsWithId(userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      userId
    },
    include: {
      comments: {
        include: {
          responseFrom: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  const postsWithNestedComments = await Promise.all(
    posts.map(async (post) => {
      const nestedComments = await fetchNestedComments(post);
      return {
        ...post,
        comments: nestedComments,
      };
    })
  );

  return postsWithNestedComments;
}

export async function getAllPostWithComments() {
  const posts = await prisma.post.findMany({
    where: {
      parentId: null,
    },
    include: {
      comments: {
        include: {
          responseFrom: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  const postsWithNestedComments = await Promise.all(
    posts.map(async (post) => {
      const nestedComments = await fetchNestedComments(post);
      return {
        ...post,
        comments: nestedComments,
      };
    })
  );

  return postsWithNestedComments;
}

// export async function getAllPostWithComments() {
//   const posts = await prisma.post.findMany({
//     include: {
//       comments: {
//         include: {
//           responseFrom: true,
//         },
//       },
//     },
//     orderBy: [
//       {
//         createdAt: "desc",
//       },
//     ],
//   });

//   return posts;
// }

export async function getPosts(clerkUserId: string) {
  const posts = await prisma.post.findMany({
    where: {
      clerkUserId,
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
  clerkUserId,
}: {
  userId: string;
  content: string;
  clerkUserId: string;
}) {
  const hashtagRegex = /#\w+/g;

  // Extract hashtags from the post content
  const hashtags = content.match(hashtagRegex);
  if (hashtags) {
    const createdPost = await prisma.post.create({
      data: {
        userId,
        clerkUserId,
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
      clerkUserId,
      content,
    },
    include: {
      Tag: true,
    },
  });

  return createdPost;
}
