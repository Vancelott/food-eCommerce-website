import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebase';
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
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  const cartRef = collection(db, "cart");
  const [user] = useAuthState(auth);

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
    setIsLoading(false); // Set loading state to false
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading state while fetching data
  }

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      {cartProducts &&
        cartProducts.map((cart) => <CartProduct key={cart.id} {...cart} />)
      }
    </div>
  );
};