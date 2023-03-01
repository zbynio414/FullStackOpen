import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop:10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none'}
  
  const toggleVisibility = () => {
    setVisible(!visible)
  } 

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view' }</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} 
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.author}</div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog