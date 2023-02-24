import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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
  }

  const loginForm = () => (
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
        <button type='submit'>login</button>
      </form>
    </div>
  )

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

  const createBlogForm = () => (
    <div>
      <h2>Create new Blog entry</h2>
      <form onSubmit={handleSendNewBlog}>
        <div>
          Title:
          <input type='text' value={newTitle} name='Title' onChange={({target}) => setNewTitle(target.value)}/>
        </div>
        <div>
          Author:
          <input type='text' value={newAuthor} name='Author' onChange={({target}) => setNewAuthor(target.value)}/>
        </div> 
        <div>
          Url:
          <input type='text' value={newUrl} name='Url' onChange={({target}) => setNewUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>

  )

  return (
    <div>
      <h1>Blog List</h1>
      
      {user === null && loginForm()}
      {user !== null && userInfo()}
      {user !== null && createBlogForm()}
      {user !== null && blogsList()}

    </div>
  )
}

export default App