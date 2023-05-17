import { Cart } from "./cart";
import { collection, updateDoc, doc, getDocs, getDoc, setDoc, addDoc, increment } from "firebase/firestore";
import { db, auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface Props extends Cart {
  productPrice: number;
  productPrice2: number;
  productTitle: string;
  productTitle2: string;
  id: string;
  userId: string;
  quantity: number;
  quantity2: number;
}

export const CartProduct = (props: Props) => {
  const { productPrice, productTitle, id, quantity, productTitle2, quantity2, productPrice2 } = props;
  // const total = (quantity * productPrice).toFixed(2);
  const total = ((quantity * productPrice) + (quantity2 * productPrice2)).toFixed(2);
  const cartRef = collection(db, 'cart');
  const [user] = useAuthState(auth);
  const cartDocRef = doc(cartRef, user?.uid);

  const Increment = async () => {
    if (productTitle === productTitle) {
      await updateDoc(cartDocRef, {
        quantity2: increment(1),
      });
    } else if (productTitle2 === productTitle2) {
      await updateDoc(cartDocRef, {
        quantity: increment(1),
      });
    }
  };

  const Decrement = async () => {
    if (productTitle === productTitle) {
      await updateDoc(cartDocRef, {
        quantity2: increment(-1),
      });
    } else if (productTitle2 === productTitle2) {
      await updateDoc(cartDocRef, {
        quantity: increment(-1),
      });
    }
  };

  const navigate = useNavigate();
  const handleOnClick = () => navigate('/order');
  
  return (
    <>
      <div>
        <h1>{productTitle}</h1>
        <p>Price: {productPrice}</p>
        <p>Quantity: {quantity}</p>
        <button onClick={Decrement}>-</button>
        <button onClick={Increment}>+</button>      
      </div>
      {productTitle2 && (
      <div>
        <h1>{productTitle2}</h1>
        <p>Price: {productPrice2}</p> {/* Display productPrice2 here */}
        <p>Quantity: {quantity2}</p>
        <button onClick={Decrement}>-</button>
        <button onClick={Increment}>+</button>
      </div>
      )}
      <h3>Total: {total} </h3>
      <button onClick={handleOnClick}>Order</button>
    </>
  );
};
