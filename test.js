// Assuming you have a function to insert data into your database
function insertHashtagsIntoDatabase(tags) {
  console.log(tags);
}

// Function to extract and store hashtags from a blog post
function extractAndStoreHashtags(postContent) {
  // Regular expression pattern to match hashtags
  const hashtagRegex = /#\w+/g;

  // Extract hashtags from the post content
  const hashtags = postContent.match(hashtagRegex);
  const tags = hashtags.map((item, i) => {
    return { tags: item, content: postContent, postId: i };
  });

  // Store the extracted hashtags in the database
  console.log(hashtags)
}

// Example usage
const postContent = "This is my #first blog post. #Excited #Blogging";
extractAndStoreHashtags(postContent);
