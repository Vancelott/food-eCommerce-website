import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, doc, getDocs, setDoc, addDoc, query, where } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';

export interface CartProduct {
    price: number,
    productTitle: string,
    id: string,
}

export const Cart = () => {
    const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null); 
    const cartRef = collection(db, "cart");
    
    const getCartProducts = async () => {
        const data = await getDocs(cartRef)
        setCartProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as CartProduct[]);
    };

    useEffect(() => {
        getCartProducts();
    }, [])

    return <div> 
        <h1> Cart Page </h1>
        {/* {cartProducts?.map((cart) => <CartProduct cart={cart}/>)} */}
        </div>
};