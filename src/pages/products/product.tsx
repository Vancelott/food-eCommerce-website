import { Product as InterfaceProduct } from './products';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, increment, addDoc } from "firebase/firestore"; 
import { useState, ChangeEvent } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

interface Props {
  product: InterfaceProduct;
}

export const Product = (props: Props) => {
  const { product } = props;
  const cartRef = collection(db, 'cart');
  const [user] = useAuthState(auth);

  const addToCart = async () => {
    const cartDocRef = doc(cartRef, user?.uid);
  
    const cartSnapshot = await getDoc(cartDocRef);
    if (!cartSnapshot.exists()) {
      await setDoc(cartDocRef, {
        userId: user?.uid,
        productTitle: product.title,
        productPrice: product.price,
        quantity: 1,
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
    <div>
      <div className="title">
        <h1>{product.title}</h1>
      </div>
      <div className="description">
        <p>{product.description}</p>
      </div>
      <div className="price">
        <p>Price: {product.price}</p>
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
};
