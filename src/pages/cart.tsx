import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { CartProduct } from './cartProduct';
import { useAuthState } from 'react-firebase-hooks/auth'

interface Product {
  productPrice: number;
  productTitle: string;
  id: string;
  userId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  products: Product[];
  productPrice: number;
  productTitle: string;
  userId: string;
  quantity: number;
}

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Cart[]>([]);
  
  const cartRef = collection(db, "cart");
  const [user] = useAuthState(auth);
  // const cartOfUser = user?.uid == cartRef.id;

  const getCartProducts = async () => {
    if (!user) {
      return; // Do nothing if there's no user
    }
    const q = query(cartRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    setCartProducts(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Cart[]
    );
  };  

  useEffect(() => {
    getCartProducts()
  }, []);
  
  console.log("cartProducts:", cartProducts); // Check the value of cartProducts

  return (
    <div>
      <h1>Cart Page</h1>
      {cartProducts &&
        cartProducts.map((cart) => <CartProduct key={cart.id} {...cart} />)
      }
    </div>
  );
  
};