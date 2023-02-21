const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('request to /api/blogs and check JSON format', () => {
    test('JSON form /api/blogs',  async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})
describe('id is defined', () => {
    test('id is defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('POST', () => {
    test('add new blog', async () => {
        const newBlog = {
            title: 'NewBlogTest',
            author: 'Tester',
            url: 'www.test.com',
            likes: 100
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map( b => b.title)
        expect(titles).toContain(
            'NewBlogTest'
        )
    })
})

describe('deletion of blog', () => {
    test('delete existing blog, expected response 204', async () =>{
        const blogsAtStart = await helper.blogsInDB() 
        const blogToDelete = blogsAtStart[1]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDB()
        
        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length -1
            )

        const titles = blogsAtEnd.map(b=>b.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('change blog', () => {
    test('change nb of likes', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blogToChange = blogsAtStart[0]
        //console.log(blogToChange);
        blogToChange.likes += 1
        //console.log(blogToChange);
        await api
            .put(`/api/blogs/${blogToChange.id}`)
            .send(blogToChange)
            .expect(200)
        
        blogsAtEnd = await helper.blogsInDB()

        changedBlog = blogsAtEnd.filter(b => b._id === blogToChange._id)
        //console.log(changedBlog[0])

        expect(changedBlog[0].likes).toBe(blogToChange.likes)

    })
})

describe('when there is initially one user in db', () => {
    beforeEach( async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('sekret', 11)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'zbigniew',
            name: 'Zbiniew',
            password: 'haslo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map( u => u.username)
        expect(usernames).toContain(newUser.username)

    })
})

afterAll(async ()=> {
    await mongoose.connection.close()
})