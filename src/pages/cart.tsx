import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { CartProduct } from './cartProduct';
import { useAuthState } from 'react-firebase-hooks/auth'

interface Product {
  productPrice: number;
  productTitle: string;
  productTitle2: string;
  id: string;
  userId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  products: Product[];
  productPrice: number;
  productPrice2: number;
  productTitle: string;
  productTitle2: string;
  userId: string;
  quantity: number;
  quantity2: number;
}

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Cart[]>([]);
  
  const cartRef = collection(db, "cart");
  const [user] = useAuthState(auth);
  // const cartOfUser = user?.uid == cartRef.id;

  const getCartProducts = async () => {
    if (!user) {
      return;
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
  
  return (
    <div>
      <h1>Cart Page</h1>
      {cartProducts &&
        cartProducts.map((cart) => <CartProduct key={cart.id} {...cart} />)
      }
    </div>
  );
};