const dummy = (blogs) => {
    return 1
  }

const totalLikes = (listOfBlogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return listOfBlogs.reduce(reducer, 0)
}  




  module.exports = {
    dummy,
    totalLikes
  }

