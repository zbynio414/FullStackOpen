import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
  }
  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}
            />
          </div>
        </form>
      </div>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App