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

interface ProductTitleState {
  productTitle: string;
}

export const Product = (props: Props) => {
  const { product } = props;
  const cartRef = collection(db, 'cart');
  const [user] = useAuthState(auth);
  const [productTitle, setProductTItle] = useState<ProductTitleState>({
    productTitle: "",
  })
  
  const cartDocRef = doc(cartRef, user?.uid);
  const cartSnapshot = getDoc(cartDocRef);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // setProductTItle(cartDocRef, productTitle: product.title);
  };

  const addToCart = async () => {
    const cartDocRef = doc(cartRef, user?.uid);

    const cartSnapshot = await getDoc(cartDocRef);
    if (!cartSnapshot.exists()) {
      await setDoc(cartDocRef, {
        userId: user?.uid,
        productId: product.id,
        // productTitle: product.title,
        productPrice: product.price,
        quantity: 1,
      });
    } else {
      await updateDoc(cartDocRef, {
        quantity: increment(1),
        productTitle: product.title,
      });
    }
      await updateDoc(cartDocRef, {
        productTitle2: product.title,
      })
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
        <button onClick={() => {addToCart();
          //  handleChange()
           }}>Add to cart</button>
      </div>
    </div>
  );
};