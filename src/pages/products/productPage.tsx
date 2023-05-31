import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product as InterfaceProduct } from './products';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL, getStorage, StorageReference } from 'firebase/storage';

interface Props {
    product?: InterfaceProduct;
  };  

export const ProductPage = (props: Props) => {
  const { id } = useParams();
  const { product } = props;
  const cartRef = collection(db, 'cart');
  const [user] = useAuthState(auth);

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [alertNum, setAlertNum] = useState(0)

  const [productList, setProductList] = useState<InterfaceProduct[] | null>(null);
  const productRef = collection(db, 'products');

  const getProducts = async () => {
    const data = await getDocs(productRef)
    setProductList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as InterfaceProduct[]);
    };

    useEffect(() => {
      getProducts();
    }, [])

    const selectedProduct = productList?.find((product) => product.id === id);
    
    const addToCart = async () => {
      
      if (!user) {
        setShowLoginAlert(true);
      }

      
      
      if (user) {

        const cartDocRef = doc(cartRef, user.uid);
        const cartSnapshot = await getDoc(cartDocRef!);
        
        if (!cartSnapshot.exists()) {
        await setDoc(cartDocRef!, {
          userId: user?.uid,
          productTitle: selectedProduct?.title,
          productPrice: selectedProduct?.price,
          quantity: 1,
          imageurl: selectedProduct?.imageurl,
        });
      } else {
        const cartData = cartSnapshot.data();
        const productTitle = cartData.productTitle;
        const productPrice = cartData.productPrice;
        const quantity = cartData.quantity;
        const productTitle2 = cartData.productTitle2;
        const productPrice2 = cartData.productPrice2;
        const quantity2 = cartData.quantity2;
    
        if (productTitle === selectedProduct?.title) {
          await updateDoc(cartDocRef!, {
            quantity: increment(1),
          });
        } else if (!productTitle2) {
          await updateDoc(cartDocRef!, {
            productTitle2: selectedProduct?.title,
            productPrice2: selectedProduct?.price,
            quantity2: increment(1),
          });
        } else if (productTitle2 === selectedProduct?.title) {
          await updateDoc(cartDocRef!, {
            quantity2: increment(1),
          });
        } else {
          await updateDoc(cartDocRef!, {
            productTitle: selectedProduct?.title,
            productPrice: selectedProduct?.price,
            quantity: increment(1),
          });
        }
      }
    }
    };     

  const [imageURL, setImageURL] = useState('');
  
  useEffect(() => {
    const fetchImageURL = async () => {
        if (productList && productList.length > 0) {
          const selectedProduct = productList.find((product) => product.id === id);
          const storage = getStorage();
          const imageRef = ref(storage, selectedProduct?.imageurl);

          const downloadURL = await getDownloadURL(imageRef);
          setImageURL(downloadURL);
        };
      };

    fetchImageURL();
  }, [id, productList]);

  return (
    <>
      {!user && showLoginAlert && (
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
      {user && showCartAlert && (
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
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center m-10 sm:m-20 md:m-40 bg-orange-200 rounded-2xl px-5 py-5 sm:px-10 sm:py-10 lg:max-w-4xl xl:flex-row xl:space-x-10">
        <img className="w-96 h-96 sm:w-96 sm:h-80 md:w-80 md:h-96 object-cover mb-5 sm:mb-10" src={imageURL} alt="Product Image" />
        <div className="flex flex-col justify-center">
          <h1 className="mb-3 text-center uppercase text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-extrabold leading-tight text-gray-900 dark:text-gray-900">{selectedProduct?.title}</h1>
          <h2 className="text-center mb-3">{selectedProduct?.description}</h2>
          <p className="text-center mb-3 font-semibold">Price: ${selectedProduct?.price}</p>
          <div className="flex justify-center">
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
    </div>
    </>
  );
};
