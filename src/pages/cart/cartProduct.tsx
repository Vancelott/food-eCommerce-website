import { Cart } from "./cart";
import { collection, updateDoc, doc, getDocs, getDoc, setDoc, addDoc, increment, onSnapshot, deleteField } from "firebase/firestore";
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { NavBar } from "../../components/navbar";

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
  const subTotal = ((quantity ? quantity * productPrice : 0) + (quantity2 ? quantity2 * productPrice2 : 0)).toFixed(2);
  const total = ((quantity ? quantity * productPrice : 0) + (quantity2 ? quantity2 * productPrice2 : 0) + 4.99).toFixed(2);
  const cartRef = collection(db, 'cart');
  const [user] = useAuthState(auth);
  const cartDocRef = doc(cartRef, user?.uid);
  const cartTotal = ((quantity ? quantity : 0) + (quantity2 ? quantity2 : 0))
  
  const Increment = async (quantityToUpdate: string) => {
    if (quantityToUpdate === "quantity") {
      await updateDoc(cartDocRef, {
        quantity: increment(1),
      });
    } else if (quantityToUpdate === "quantity2") {
      await updateDoc(cartDocRef, {
        quantity2: increment(1),
      });
    }
  };
  
  const Decrement = async (quantityToUpdate: string) => {
    if (quantityToUpdate === "quantity") {
      await updateDoc(cartDocRef, {
        quantity: increment(-1),
      });
    } else if (quantityToUpdate === "quantity2") {
      await updateDoc(cartDocRef, {
        quantity2: increment(-1),
      });
    }
      
    const docSnapshot = await getDoc(cartDocRef);
    const updatedQuantity = docSnapshot.get("quantity");
    const updatedQuantity2 = docSnapshot.get("quantity2");
  
    if (quantityToUpdate === "quantity" && updatedQuantity === 0) {
      await updateDoc(cartDocRef, {
        quantity: deleteField(),
        productPrice: deleteField(),
        productTitle: deleteField(),
      });
    }
    if (quantityToUpdate === "quantity2" && updatedQuantity2 === 0) {
      await updateDoc(cartDocRef, {
        quantity2: deleteField(),
        productPrice2: deleteField(),
        productTitle2: deleteField(),
      });
    }
    if (updatedQuantity === undefined && updatedQuantity2 === undefined) {
      await updateDoc(cartDocRef, {
        quantity: deleteField(),
        quantity2: deleteField(),
        productPrice: deleteField(),
        productPrice2: deleteField(),
        productTitle: deleteField(),
        productTitle2: deleteField(),
      });
      if (docSnapshot.exists()) {
        await updateDoc(cartDocRef, {
          userId: deleteField(),
          imageurl: deleteField(),
          imageurl2: deleteField(),
        });
      }
    }
      };
  
  // useEffect(() => {
  // }, [cartDocRef])
    
  const navigate = useNavigate();
  const handleOnClick = () => navigate('/order');
  
  return (
    <>
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
        {productTitle && (
          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{productTitle}</h2>
              </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                <button onClick={() => Decrement("quantity")} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">-</button>
                <p className="p-2">{quantity}</p>
                <button onClick={() => Increment("quantity")} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">+</button>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">${productPrice}</p>
                </div>
              </div>
            </div>
          </div>)}
          {productTitle2 && (
          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{productTitle2}</h2>
              </div>
              <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                <button onClick={() => Decrement("quantity2")} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">-</button>
                <p className="pt-0.5 h-8 w-8 border bg-white text-center text-m outline-none">{quantity2}</p>
                <button onClick={() => Increment("quantity2")} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">+</button>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">${productPrice2}</p>
                </div>
              </div>
            </div>
          </div>)}
        </div>
        {/* <!-- Sub total --> */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${subTotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="ml-8 mb-1 text-lg font-bold">${total}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button onClick={handleOnClick} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </div>
      </div>
    </div>
    </>
)};