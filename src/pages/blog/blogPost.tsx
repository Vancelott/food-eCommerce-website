import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { Blog } from './blog';

export interface Blog {
  title: string;
  description: string;
  author: string;
  date: number;
  id: string;
}

export const BlogPost = () => {
  const [blogList, setBlogList] = useState<Blog[] | null>(null);
  const blogsRef = collection(db, 'blogs');

  const getBlogs = async () => {
    const data = await getDocs(blogsRef)
    setBlogList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Blog[]);
    };

    useEffect(() => {
        getBlogs();
    }, [])

  return (
    <div>
      <h1>Blog Post Page</h1>
      {blogList?.map((blog) => <Blog blog={blog} /> )}
    </div>
  );
};