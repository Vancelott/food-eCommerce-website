import { Product as InterfaceProduct } from './products';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, increment, addDoc } from "firebase/firestore"; 
import { useState, ChangeEvent, useEffect } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';


interface Props {
  product: InterfaceProduct;
}

export const Product = (props: Props) => {
  const { product } = props;
  const cartRef = collection(db, 'cart');
  const [user] = useAuthState(auth);
  const cartDocRef = user ? doc(cartRef, user.uid) : null;
  const [imageURL, setImageURL] = useState('');
  
  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, product.imageurl);

        const downloadURL = await getDownloadURL(imageRef);
        setImageURL(downloadURL);
      } catch (error) {
        console.error('Error retrieving download URL:', error);
      }
    };

    fetchImageURL();
  }, []);

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [alertNum, setAlertNum] = useState(0)

  const addToCart = async () => {
    if (user) {
    const cartSnapshot = await getDoc(cartDocRef!);
    if (!cartSnapshot.exists()) {
      await setDoc(cartDocRef!, {
        userId: user?.uid,
        productTitle: product.title,
        productPrice: product.price,
        quantity: 1,
        // imageurl: product.imageurl,
      });
    } else {
      const cartData = cartSnapshot.data();
      const productTitle = cartData.productTitle;
      const productPrice = cartData.productPrice;
      const quantity = cartData.quantity;
      const productTitle2 = cartData.productTitle2;
      const productPrice2 = cartData.productPrice2;
      const quantity2 = cartData.quantity2;
      // const imageurl2 = cartData.imageurl2;
  
      if (productTitle === product.title) {
        await updateDoc(cartDocRef!, {
          quantity: increment(1),
        });
      } else if (!productTitle2) {
        await updateDoc(cartDocRef!, {
          productTitle2: product.title,
          productPrice2: product.price,
          // imageurl2: product.imageurl,
          quantity2: increment(1),
        });
      } else if (productTitle2 === product.title) {
        await updateDoc(cartDocRef!, {
          quantity2: increment(1),
        });
      } else {
        await updateDoc(cartDocRef!, {
          productTitle: product.title,
          productPrice: product.price,
          quantity: increment(1),
        });
      }
    }} else {
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {showLoginAlert && (
        <div className="fixed top-4 right-4 z-10">
          <div className="flex flex-col items-end">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Login error</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Please log in to add the product to your cart.</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <Link to="/login">
                        <button
                          type="button"
                          className="bg-yellow-200 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-700 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
                        >
                          Login
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="ml-3 bg-yellow-200 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-700 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
                        onClick={() => setShowLoginAlert(false)}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    {showCartAlert && (
    <div className="fixed top-20 right-24 z-9 rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" /> */}
        </div>
        <div className="flex flex-wrap ml-3 space-x-1">
          <p className="text-sm font-medium text-green-800">Product added to cart</p>
          <p className="text-sm font-medium text-green-800">({alertNum})</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
            >
              <span className="sr-only">Dismiss</span>
              {/* <XIcon className="h-5 w-5" aria-hidden="true" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>)}
      <div className="relative">
      <div>
          <Link to={`/product/${product?.id}`}>
            <div className="flex flex-col items-center justify-center bg-slate-200 min-w-full min-h-full rounded-tl-xl rounded-tr-xl space-y-6 mt-10 px-6 py-4">
              <img className="flex w-64 h-64 object-cover" src={imageURL} alt="Product Image" />
              <h1 className="text-2xl font-extrabold dark:text-black">{product.title}</h1>
              <p className="font-semibold text-gray-500 dark:text-gray-700">Price: ${product.price}</p>
            </div>
          </Link>
          <div className="bg-slate-200 pb-6 rounded-b-xl">
            <button className="bg-amber-500 text-white rounded-lg px-4 py-2 mt-4"
             onClick={() => {
              addToCart();
              setShowCartAlert(true)
              setAlertNum(alertNum + 1)
              setTimeout(() =>{
                setShowCartAlert(false)
                }, 2000);    
            }}
              >Add to cart</button>
          </div>
        </div>
      </div>
    </>
    );
  };