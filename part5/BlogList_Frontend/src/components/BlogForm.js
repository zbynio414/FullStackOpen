import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(newBlog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return (
    <div>
      <h2>Create new Blog entry</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input type='text' value={newTitle} name='Title' onChange={({ target }) => setNewTitle(target.value)}/>
        </div>
        <div>
          Author:
          <input type='text' value={newAuthor} name='Author' onChange={({ target }) => setNewAuthor(target.value)}/>
        </div>
        <div>
          Url:
          <input type='text' value={newUrl} name='Url' onChange={({ target }) => setNewUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
