import { useState, useEffect } from 'react'
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
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
    setUser(null)
    window.localStorage.clear()
  }

  const handleSendNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')    
    
    setMessage(`a new blog: ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => setMessage(null), 5000)
  }



  const blogsList = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const userInfo = () => (
    <div>
      {user.name} logged in. 
      <button onClick={() => handleLogOut()}>Logout</button>
    </div>
  )


  return (
    <div>
      <h1>Blog List</h1>
      
      <Notification message={message}/>
      {user === null && 
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      }
      {user !== null && userInfo()}
      {user !== null && 
        <Togglable buttonLabel="New blog">
          <BlogForm
            handleSendNewBlog={handleSendNewBlog}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleTitleChange={({target}) => setNewTitle(target.value)}
            handleAuthorChange={({target}) => setNewAuthor(target.value)}
            handleUrlChange={({target}) => setNewUrl(target.value)}
            />
        </Togglable>
      }
      {user !== null && blogsList()}

    </div>
  )
}

export default App