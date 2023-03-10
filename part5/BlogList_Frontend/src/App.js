import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.clear()
  }

  const fillUndifinedLikes = (blog) => {
    if (blog.likes === undefined) {
      blog.likes=0
    }
    return blog
  }

  const sortedBlogs = [...blogs]
    .map(fillUndifinedLikes)
    .sort((a, b) => b.likes - a.likes)

  const blogsList = () => (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLike(blog.id)}
          remove={() => removeBlog(blog.id)}
          username={ user.username }
        />

      )}
    </div>
  )

  const userInfo = () => (
    <div>
      {user.name} logged in.
      <button onClick={() => handleLogOut()}>Logout</button>
    </div>
  )

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(newBlog)
    const newUserField = {
      id: returnedBlog.user,
      name: user.name,
      username: user.username,
    }
    returnedBlog.user = newUserField
    setBlogs(blogs.concat(returnedBlog))

    setMessage(`a new blog: ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => setMessage(null), 5000)
  }

  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)

    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes) === undefined ? 1 : blog.likes + 1,
      user: blog.user.id,
    }
    const returnedBlog =  await blogService.update(id, changedBlog)

    setBlogs(blogs.map( blog => blog.id === returnedBlog.id ? returnedBlog : blog))


    setMessage(`added like to: ${returnedBlog.title} by ${returnedBlog.author}`)
    setTimeout(() => setMessage(null), 5000)
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog: ${blog.title}?`)) {
      blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blog List</h1>

      <Notification message={message}/>
      {user === null &&
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      }
      {user !== null && userInfo()}
      {user !== null &&
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>
      }
      {user !== null && blogsList()}

    </div>
  )
}

export default App