import { collection, doc, getDocs, getDoc, setDoc, addDoc, query, where } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { CartProduct } from './cartProduct';
import { useAuthState, } from 'react-firebase-hooks/auth'

interface CartProductData {
    price: number;
    productTitle: string;
    id: string;
    cart: Cart;
  }  

export interface Cart {
    price: number,
    productTitle: string,
    id: string,
    products: CartProductData[],
}

export const Cart = () => {
    const [cartProducts, setCartProducts] = useState<Cart[] | null>(null); 
    const cartRef = collection(db, "cart");
    const [user] = useAuthState(auth);
    const cartOfUser = user?.uid == cartRef.id;

    const getCartProducts = async () => {
        if (!user) {
          return null;
        }
      
        const cartDocRef = doc(cartRef, user.uid);
        const cartDoc = await getDoc(cartDocRef);
      
        if (cartDoc.exists()) {
          setCartProducts(cartDoc.data()?.products);
        }
      };      

    useEffect(() => {
        getCartProducts();
    }, [])

    return <div> 
        <h1> Cart Page </h1>
        {cartProducts && cartProducts?.map((cart) => <CartProduct cart={cart}/>)}
        </div>
};