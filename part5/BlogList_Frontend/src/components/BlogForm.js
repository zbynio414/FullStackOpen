  const BlogForm = ({ handleSendNewBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange }) => (
    <div>
      <h2>Create new Blog entry</h2>
      <form onSubmit={handleSendNewBlog}>
        <div>
          Title:
          <input type='text' value={newTitle} name='Title' onChange={handleTitleChange}/>
        </div>
        <div>
          Author:
          <input type='text' value={newAuthor} name='Author' onChange={handleAuthorChange}/>
        </div> 
        <div>
          Url:
          <input type='text' value={newUrl} name='Url' onChange={handleUrlChange}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>

  )

export default BlogForm