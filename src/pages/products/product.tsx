import { Product as InterfaceProduct } from './products'
// import { addToCart } from './products'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../../config/firebase';
import { collection, doc, getDocs, setDoc, addDoc, query, where } from "firebase/firestore"; 
import { useState } from 'react';

interface Props {
    product: InterfaceProduct;
}

export const Product = (props: Props) => {
    const { product } = props;
    const cartRef = collection(db, "cart");
    const [user] = useAuthState(auth);

    const [productQuantity, setProductQuantity] = useState<number | null>(null);

    const getCartProducts = async() => {
        const data = await getDocs(cartDoc)
    }

    const cartDoc = query(cartRef, where("productId", "==", product.id), where("userId", "==", user?.uid));

    const addToCart = async () => {
        await addDoc(cartRef, { 
            userId: user?.uid, 
            productId: product.id, 
            productTitle: product.title,
            }
        );
      };

    return (
        <div>
            <div className="title">
                <h1> {product.title}</h1>
            </div>
            <div className="description">
                <p> {product.description}</p>
            </div>
            <div className="price">
                <p> Price: {product.price}</p>
                    <button onClick={addToCart}>Add to cart</button>
            </div>
        </div>
    );
};