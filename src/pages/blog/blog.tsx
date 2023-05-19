import React from 'react';
import { Blog as InterfaceBlog } from './blogPost';
import { Link } from 'react-router-dom';

interface Props {
  blog?: InterfaceBlog;
}

export const Blog = (props: Props) => {
  const { blog } = props;

  console.log(blog)
  return (
    <div>
      <Link to={`/blog/${blog?.id}`}>
      <h2>Title: {blog?.title}</h2>
      <p>Content: {blog?.content}</p>
      <p>Author: {blog?.author}</p>
      <p>Date: {blog?.date}</p>
      </Link>
    </div>
  );
};
