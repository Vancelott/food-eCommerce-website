import * as yup from 'yup';
import { useForm, SubmitHandler} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { collection, updateDoc, doc, getDocs, getDoc, setDoc, addDoc, increment } from "firebase/firestore";
import { db, auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

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
  const ordersDocRef = doc(ordersRef, user?.uid);
  const cartRef = collection(db, 'cart');
  const cartDocRef = doc(cartRef, user?.uid);
  
  const navigate = useNavigate();
  // const handleOnClick = () => navigate('/orderSubmit');

  const onSubmit: SubmitHandler<FormData> = async data => {

    const cartSnapshot = await getDoc(cartDocRef);
    const cartData = cartSnapshot.data();
    const shippingInfo = data;

    setDoc(ordersDocRef, {
      shippingInfo, cartData
    });
    navigate('/orderSubmit')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>{errors.firstName?.message}</p>
      <input type="text" placeholder="First Name..." {...register('firstName')} />
      <p>{errors.lastName?.message}</p>
      <input type="text" placeholder="Last Name..." {...register('lastName')} />
      <p>{errors.email?.message}</p>
      <input type="email" placeholder="Email..." {...register('email')} />
      <p>{errors.number?.message}</p>
      <input type="number" placeholder="Phone Number..." {...register('number')} />
      <p>{errors.city?.message}</p>
      <input type="text" placeholder="City..." {...register('city')} />
      <p>{errors.address?.message}</p>
      <input type="text" placeholder="Street Address..." {...register('address')} />
      <br></br>
      <input type="submit"/>
    </form>
  );
};
