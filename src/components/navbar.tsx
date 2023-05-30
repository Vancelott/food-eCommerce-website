import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { ComponentPropsWithRef, useEffect, useState } from 'react';
import { CartProduct } from '../pages/cart/cartProduct';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { Cart as InterfaceCart } from '../pages/cart/cart';

interface Props {
  cart?: InterfaceCart;
}

export const NavBar = (props: Props) => {
  const [user] = useAuthState(auth);
  const cartRef = collection(db, 'cart');
  const { cart } = props;
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (user && user.uid) {
      const cartDocRef = doc(cartRef, user.uid);
  
      const unsubscribe = onSnapshot(cartDocRef, (doc) => {
        const cartData = doc.data();
        if (cartData && 'quantity' in cartData && 'quantity2' in cartData) {
          const { quantity, quantity2 } = cartData;
          const total = quantity + quantity2;
          setCartTotal(total);
        } else if (cartData && 'quantity' in cartData) {
          const { quantity } = cartData;
          setCartTotal(quantity);
        } else if (cartData && 'quantity2' in cartData) {
          const { quantity2 } = cartData;
          setCartTotal(quantity2);
        } else {
          setCartTotal(0);
        }
      });
  
      return () => unsubscribe();
    }
  
  }, [cartRef, user]);

  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate("/")
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };    
            
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex cursor-pointer items-center">
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Early</span>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Link to="/">Home</Link>
            </li>
            {!user ? (
              <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Link to="/login">Login</Link>
              </li>
            ) : null}
            <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Link to="/about">About</Link>
            </li>
            <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Link to="/products">Products</Link>
            </li>
            <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Link to="/blog">Blog</Link>
            </li>
            {user ? (
              <li className="flex flex-wrap block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Link to="/cart" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <p className="ml-2">{cartTotal}</p> {/* Added ml-2 to add left margin */}
                </Link>
              </li>
          ) : null}
            <li className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent">
              <div className="flex place-content-end space-x-3 items-center">
                {user && (
                  <>
                    <p className="font-normal"> {auth.currentUser?.displayName} </p>
                    <button
                      onClick={logOut}
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-normal rounded-lg text-sm px-1 py-1 dark:bg-gray-800 text-sm dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};