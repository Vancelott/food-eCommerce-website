import React from 'react';
import { useParams } from 'react-router-dom';
import { Product as InterfaceProduct } from './products';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL, getStorage, StorageReference } from 'firebase/storage';

interface Props {
    product?: InterfaceProduct;
  };  

export const ProductPage = (props: Props) => {
  const { id } = useParams();
  const { product } = props;
  const cartRef = collection(db, 'cart');
  const [user] = useAuthState(auth);

  const [productList, setProductList] = useState<InterfaceProduct[] | null>(null);
  const productRef = collection(db, 'products');

  const getProducts = async () => {
    const data = await getDocs(productRef)
    setProductList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as InterfaceProduct[]);
    };

    useEffect(() => {
      getProducts();
    }, [])

    const selectedProduct = productList?.find((product) => product.id === id);
    
    const addToCart = async () => {

      const cartDocRef = doc(cartRef, user?.uid);
      const cartSnapshot = await getDoc(cartDocRef!);

      if (!cartSnapshot.exists()) {
        await setDoc(cartDocRef!, {
          userId: user?.uid,
          productTitle: selectedProduct?.title,
          productPrice: selectedProduct?.price,
          quantity: 1,
          imageurl: selectedProduct?.imageurl,
        });
      } else {
        const cartData = cartSnapshot.data();
        const productTitle = cartData.productTitle;
        const productPrice = cartData.productPrice;
        const quantity = cartData.quantity;
        const productTitle2 = cartData.productTitle2;
        const productPrice2 = cartData.productPrice2;
        const quantity2 = cartData.quantity2;
    
        if (productTitle === selectedProduct?.title) {
          await updateDoc(cartDocRef!, {
            quantity: increment(1),
          });
        } else if (!productTitle2) {
          await updateDoc(cartDocRef!, {
            productTitle2: selectedProduct?.title,
            productPrice2: selectedProduct?.price,
            quantity2: increment(1),
          });
        } else if (productTitle2 === selectedProduct?.title) {
          await updateDoc(cartDocRef!, {
            quantity2: increment(1),
          });
        } else {
          await updateDoc(cartDocRef!, {
            productTitle: selectedProduct?.title,
            productPrice: selectedProduct?.price,
            quantity: increment(1),
          });
        }
      }
    };      

  const [imageURL, setImageURL] = useState('');
  
  useEffect(() => {
    const fetchImageURL = async () => {
        if (productList && productList.length > 0) {
          const selectedProduct = productList.find((product) => product.id === id);
          const storage = getStorage();
          const imageRef = ref(storage, selectedProduct?.imageurl);

          const downloadURL = await getDownloadURL(imageRef);
          setImageURL(downloadURL);
        };
      };

    fetchImageURL();
  }, [id, productList]);

  return (
    <div className="flex justify-center items-center bg-orange-100 h-screen">
      <div className="flex justify-center m-80 bg-orange-200 rounded-2xl px-10 py-10">
        <img className="w-96 h-96 object-cover mr-20" src={imageURL} alt="Product Image" />
        <div className="flex flex-col justify-center">
          <h1 className="text-left mb-6 font-bold uppercase text-4xl px-52">{selectedProduct?.title}</h1>
          <h2 className="text-left mb-6 px-52">{selectedProduct?.description}</h2>
          <p className="text-left mb-6 px-52">Price: ${selectedProduct?.price}</p>
          <div className="justify-center">
            <button className="bg-amber-500 text-white rounded-lg px-4 py-2 mt-4" onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
  };
