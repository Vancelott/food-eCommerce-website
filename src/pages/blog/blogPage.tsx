import React from 'react';
import { useParams } from 'react-router-dom';
import { Blog as InterfaceBlog } from './blogPost';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';

interface Props {
    blog?: InterfaceBlog;
  };  

export const BlogPage = (props: Props) => {
  const { id } = useParams();
  const { blog } = props;

  const [blogList, setBlogList] = useState<InterfaceBlog[] | null>(null);
  const blogsRef = collection(db, 'blogs');

  const getBlogs = async () => {
    const data = await getDocs(blogsRef)
    setBlogList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as InterfaceBlog[]);
    };

    useEffect(() => {
        getBlogs();
    }, [])

    const selectedBlog = blogList?.find((blog) => blog.id === id);

  return (
    <div>
      <h1>Blog Page</h1>
      <h2>Title: {selectedBlog?.title}</h2>
      <p >Content: {selectedBlog?.content}</p>
      <p>Author: {selectedBlog?.author}</p>
      <p>Date: {selectedBlog?.date}</p>
    </div>
  );
};
