import React from 'react';
import { useParams } from 'react-router-dom';
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

      const cartDocRef = doc(cartRef, user?.uid);
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
