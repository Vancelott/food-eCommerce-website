import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { collection, updateDoc, doc, deleteDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  number: number;
  city: string;
  address: string;
}

export const Order = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your First Name."),
    lastName: yup.string().required("Please enter your Last Name."),
    email: yup.string().email().required("Please enter your email address."),
    number: yup.number().required().integer().typeError("Please enter your phone number."),
    city: yup.string().required("Please enter your city of delivery."),
    address: yup.string().required("Please enter your street address of delivery."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [user] = useAuthState(auth);
  const ordersRef = collection(db, 'orders');
  const cartRef = collection(db, 'cart');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const cartDocRef = doc(cartRef, user?.uid);
    const cartSnapshot = await getDoc(cartDocRef);
    const cartData = cartSnapshot.data();
    const shippingInfo = data;
    const orderInfo = { cartData, shippingInfo };
    const ordersDocRef = doc(ordersRef, `${user?.displayName}_${user?.uid}`);

    const newDoc = await addDoc(collection(ordersDocRef, 'orders'), orderInfo);

    const updateTimestamp = await updateDoc(newDoc, {
      timestamp: serverTimestamp()
    });

    navigate('/orderSubmit');

    await deleteDoc(cartDocRef);
  };

  return (
    <div className="flex items-center justify-center h-screen border-solid border-black bg-gray-200">
      <form className="max-w-2xl"onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-20 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-3xl dark:text-black">Shipping information</h1>
        <div className="relative z-0 w-full mb-6 group m">
        <p className="mb-2 text-red-600">{errors.firstName?.message}</p>
          <input type="text" placeholder="First Name..." {...register('firstName')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
          <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <p className="mb-2 text-red-600">{errors.lastName?.message}</p>
          <input type="text" placeholder="Last Name..." {...register('lastName')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
          <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <p className="mb-2 text-red-600">{errors.email?.message}</p>
          <input type="email" placeholder="Email..." {...register('email')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <p className="mb-2 text-red-600">{errors.number?.message}</p>
          <input type="number" placeholder="Phone Number..." {...register('number')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <p className="mb-2 text-red-600">{errors.city?.message}</p>
          <input type="text" placeholder="City..." {...register('city')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
          <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <p className="mb-2 text-red-600">{errors.address?.message}</p>
          <input type="text" placeholder="Street Address..." {...register('address')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
          <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
        </div>
        <br></br>
        <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
      </form>
    </div>
  );
}