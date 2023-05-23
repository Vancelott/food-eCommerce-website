import { Product as InterfaceProduct } from './products';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, increment, addDoc } from "firebase/firestore"; 
import { useState, ChangeEvent, useEffect } from 'react';
import firebase from 'firebase/compat/app';
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


  const addToCart = async () => {
    const cartSnapshot = await getDoc(cartDocRef!);
    if (!cartSnapshot.exists()) {
      await setDoc(cartDocRef!, {
        userId: user?.uid,
        productTitle: product.title,
        productPrice: product.price,
        quantity: 1,
        imageurl: product.imageurl,
      });
    } else {
      const cartData = cartSnapshot.data();
      const productTitle = cartData.productTitle;
      const productPrice = cartData.productPrice;
      const quantity = cartData.quantity;
      const productTitle2 = cartData.productTitle2;
      const productPrice2 = cartData.productPrice2;
      const quantity2 = cartData.quantity2;
      const imageurl2 = cartData.imageurl2;
  
      if (productTitle === product.title) {
        await updateDoc(cartDocRef!, {
          quantity: increment(1),
        });
      } else if (!productTitle2) {
        await updateDoc(cartDocRef!, {
          productTitle2: product.title,
          productPrice2: product.price,
          imageurl2: product.imageurl,
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
    }
  };
    
  return (
    <Link to={`/product/${product?.id}`}>
      <div className="flex flex-col items-center justify-center bg-slate-200 min-w-full min-h-full rounded-xl space-y-6 mt-10 px-6 py-4">
        <img className="flex w-64 h-64 object-cover"src={imageURL} alt="Product Image" />
        <h1 className="text-2xl font-extrabold dark:text-black">{product.title}</h1>
        <p className="font-semibold text-gray-500 dark:text-gray-700">Price: ${product.price}</p>
        <button className="bg-amber-500 text-white rounded-lg px-4 py-2 mt-4" onClick={addToCart}>Add to cart</button>
      </div>
    </Link>
  );
};