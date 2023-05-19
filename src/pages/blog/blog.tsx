// blog.tsx
import React from 'react';
import { Blog as InterfaceBlog } from './blogPost';

interface Props {
  blog: InterfaceBlog;
}

export const Blog = (props: Props) => {
  const { blog } = props;

  return (
    <div>
      <h2>Title: {blog.title}</h2>
      <p>Short description: {blog.description}</p>
      <p>Author: {blog.author}</p>
      <p>Date: {blog.date}</p>
    </div>
  );
};
