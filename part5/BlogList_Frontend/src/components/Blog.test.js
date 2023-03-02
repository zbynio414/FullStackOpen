import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render blog content', () => {
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

  render(<Blog blog={blog} />)

  const element = screen.getByText('TestTitle')
  expect(element).toBeDefined
})