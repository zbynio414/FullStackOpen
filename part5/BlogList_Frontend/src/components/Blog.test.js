/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'TestTitle',
  author: 'Tester',
  url: 'www.co.pl',
  likes: 6,
  user: {
    username: 'root',
    name: 'Superuser',
    id: '63f4d191b814057ef556d358'
  },
  id: '63f76497852d7462fce98a75'
}

test('render blog content', () => {

  const { container } = render(<Blog blog={blog} isMine={true} />)

  const title = screen.getByText('TestTitle')
  expect(title).toBeDefined()

  const author = screen.getByText('Tester')
  expect(author).toBeDefined()

  const url_likes = container.querySelector('.url_likes')

  expect(url_likes).toHaveStyle('display: none')
  expect(url_likes).toHaveStyle('display: none')
})

test('clicking the button show the url and author', async () => {

  const mockHandler = jest.fn()

  const user = userEvent.setup()

  const { container } = render(
    <Blog blog={blog} isMine={true} togggleVisibility={mockHandler} />
  )

  const button = screen.getByText('view')

  await user.click(button)

  const url_likes = container.querySelector('.url_likes')

  expect(url_likes).not.toHaveStyle('display: none')
  expect(url_likes).not.toHaveStyle('display: none')
})

test('dubble like click call fn twice', async () => {
  const mockAddLike = jest.fn()
  const user = userEvent.setup()

  render(
    <Blog blog={blog} addLike={mockAddLike} isMine={true} />
  )

  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockAddLike.mock.calls).toHaveLength(2)
})