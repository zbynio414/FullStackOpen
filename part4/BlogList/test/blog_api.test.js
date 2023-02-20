const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
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
    test('delete existing blog, expected response 204', async ()=>{
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

afterAll(async ()=> {
    await mongoose.connection.close()
})