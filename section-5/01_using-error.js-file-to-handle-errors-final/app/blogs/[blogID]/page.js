const Blog = async ({ params }) => {
  const { blogID } = await params;

  // if (blogID % 2 === 0) {
  //   throw new Error("BlogId can only be an odd number");
  // }

  const randomNumber = Math.random();
  console.log(randomNumber);

  if (randomNumber > 0.5) {
    throw new Error("Error occurred");
  }

  return (
    <>
      <div>
        <h1>Welcome to Our Blog {blogID}</h1>
        <p>This is blog {blogID} page.</p>
      </div>
    </>
  );
};

export default Blog;
//npm start > server.log       for standard output
//npm start > server.log 2>&1  for error
//npm start >> server.log 2>&1 for persistent error in log
