import React from 'react';
import { Blog as InterfaceBlog } from './blogPost';
import { Link } from 'react-router-dom';

interface Props {
  blog?: InterfaceBlog;
}

export const Blog = (props: Props) => {
  const { blog } = props;

  return (
    <div className="flex flex-row justify-center mx-auto">
      <div className="flex justify-start bg-white shadow-md border border-gray-200 rounded-lg max-w-4xl mb-5 text-left">
        <div className="p-5">
          <a href={`/blog/${blog?.id}`}>
            <h1 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{blog?.title}</h1>
          </a>
          <h2 className="font-normal text-gray-700 mb-3">
            {blog?.content && blog?.content.split('.').slice(0, 2).join('.') + "..."}
          </h2>
          <Link to={`/blog/${blog?.id}`}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
