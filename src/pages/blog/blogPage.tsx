import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Blog as InterfaceBlog } from './blogPost';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

interface Props {
    blog?: InterfaceBlog;
  };  

export const BlogPage = (props: Props) => {
  const { id } = useParams();
  const { blog } = props;

  const [imageURL, setImageURL] = useState('');

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

    useEffect(() => {
      const fetchImageURL = async () => {
        try {
          if (blogList && blogList.length > 0) {
            const selectedBlog = blogList.find((blog) => blog.id === id);
            const storage = getStorage();
            const imageRef = ref(storage, selectedBlog?.imageurl);
  
            const downloadURL = await getDownloadURL(imageRef);
            setImageURL(downloadURL);
          }
        } catch (error) {
          console.error('Error retrieving download URL:', error);
        }
      };
  
      fetchImageURL();
    }, [id, blogList]);  

  return (
  <div className="mt-20">
      <Link to="/blog">
        <button className="rotate-180 me-[725px] mb-4">
          <svg aria-hidden="true" className="w-9 h-9 ml-2 -mr-1" fill="currentColor" viewBox="0 00 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </Link>
        <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative h-80">
                <div className="absolute left-0 bottom-0 w-full h-full z-10 bg-gradient-to-b from-transparent to-[rgba(0,0,0,.7)]"></div>
                <img className="absolute left-0 top-0 w-full h-full z-0 object-cover" src={imageURL}/>
                <div className="p-4 absolute bottom-0 left-0 z-20 text-center w-full">
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {selectedBlog?.title}
          </h2>
            <div>
              <p className="font-semibold text-gray-200 text-sm mt-6">{selectedBlog?.author}</p>
              <p className="font-semibold text-gray-400 text-xs">{selectedBlog?.date}</p>
            </div>
          </div>
        </div>
        <div className="text-left px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
          <p className="pb-6">{selectedBlog?.content}</p>
        </div>
  </div>
  )
};
