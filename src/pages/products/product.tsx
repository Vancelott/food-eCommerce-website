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
  const cartDocRef = doc(cartRef, user?.uid);
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
    const cartDocRef = doc(cartRef, user?.uid);
  
    const cartSnapshot = await getDoc(cartDocRef);
    if (!cartSnapshot.exists()) {
      await setDoc(cartDocRef, {
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
      const productTitle2 = cartData.productTitle2;
      const productPrice2 = cartData.productPrice2;

      if (!productTitle) {
        await updateDoc(cartDocRef, {
          productTitle: product.title,
          productPrice: product.price,
          quantity: increment(1),
        });
      } else if (!productTitle2) {
        await updateDoc(cartDocRef, {
          productTitle2: product.title,
          productPrice2: product.price,
          quantity2: increment(1),
        });
      } else {
        if (productTitle === product.title) {
          await updateDoc(cartDocRef, {
            quantity: increment(1),
          });
        } else if (productTitle2 === product.title) {
          await updateDoc(cartDocRef, {
            quantity2: increment(1),
          });
        }
      }
    }
  };  
  
  return (
    <Link to={`/product/${product?.id}`}>
      <div className="flex flex-col items-center justify-center bg-amber-50 min-w-full min-h-full	rounded-xl space-y-8 mt-20 px-10 py-6">
        <img className="flex-auto w-64 h-64 object-cover"src={imageURL} alt="Product Image" />
        <h1 className="text-2xl font-bold">{product.title}</h1>
        {/* <p className="">{product.description}</p> */}
        <p>Price: {product.price}</p>
        <button className="bg-stone-900 text-white rounded-lg px-4 py-2 mt-4" onClick={addToCart}>Add to cart</button>
      </div>
    </Link>
  );
};
