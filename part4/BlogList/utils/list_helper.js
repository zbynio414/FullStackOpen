const dummy = (blogs) => 1

const totalLikes = (listOfBlogs) => {
  const reducer = (sum, item) => sum + item.likes

  return listOfBlogs.reduce(reducer, 0)
}

const favoriteBlog = (listOfBlogs) => {
  const likesOnly = listOfBlogs.map((blog) => blog.likes)
  const { title, author, likes } = listOfBlogs[likesOnly.indexOf(Math.max(...likesOnly))]
  return { title, author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
