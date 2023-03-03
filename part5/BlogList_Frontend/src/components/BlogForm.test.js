import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls of event of BlogForm', async () => {
  const mockCreateBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const title = inputs[0]
  const author = inputs[1]
  const url = inputs[2]
  //   const author = screen.getAllByText('author:')

  // eslint-disable-next-line testing-library/no-debugging-utils
  //   screen.debug(author)

  //   const url = screen.getByText('url:')

  const creatButton = screen.getByText('create')

  await user.type(title, 'LEW')
  await user.type(author, 'PAW')
  await user.type(url, 'AAA')

  await user.click(creatButton)

  expect(mockCreateBlog.mock.calls[0][0].title).toBe('LEW')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('PAW')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('AAA')

})