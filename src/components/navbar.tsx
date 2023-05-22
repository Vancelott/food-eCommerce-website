import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useState } from 'react';

export const NavBar = () => {

    const [user] = useAuthState(auth);

    const logOut = async () => {
        await signOut(auth);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };    

      return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex cursor-pointer items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
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
                <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
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
    // return (
    //     <div className="flex flex-row place-content-center space-x-8 bg-blue-950 text-white py-10 text-base font-semibold font-poppins items-center sticky top-0 w-full drop-shadow-lg"> 
    //         <Link to="/"> Home</Link>
    //         {!user ? (
    //         <Link to="/login"> Login</Link> ) : ("")}
    //         <Link to="/about"> About</Link>
    //         <Link to="/products"> Products</Link>
    //         <Link to="/blog"> Blog</Link>
    //         <Link to="/cart"> Cart</Link>
    //         <div className="flex place-content-end space-x-3 items-center">{user && (
    //             <>
    //             <p className="font-normal"> {auth.currentUser?.displayName} </p>
    //             {/* <img src={auth.currentUser?.photoURL || ""} width="100" height="100"/> */}
    //             <button onClick={logOut} className="bg-sky-900/100 rounded-xl shadow-lg p-1 px-3 font-normal text-slate-100"> Log Out</button>
    //             </>
    //         )}
    //         </div>
    //     </div>
    // );
    //     return (
    //       <div className="flex items-center justify-between sticky bg-blue-950 py-8 px-16 text-white">
    //         <a href="/">
    //           <img src="https://designbygio.it/images/logo.png" alt="logo" />
    //         </a>
    //         <nav>
    //           <section className="MOBILE-MENU flex lg:hidden">
    //             <div
    //               className="HAMBURGER-ICON space-y-2"
    //               onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
    //             >
    //               <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
    //               <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
    //               <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
    //             </div>
      
    //             <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> // toggle class based on isNavOpen state
    //               <div
    //                 className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
    //                 onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
    //               >
    //                 <svg
    //                   className="h-8 w-8 text-gray-600"
    //                   viewBox="0 0 24 24"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   strokeWidth="2"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 >
    //                   <line x1="18" y1="6" x2="6" y2="18" />
    //                   <line x1="6" y1="6" x2="18" y2="18" />
    //                 </svg>
    //               </div>
    //               <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
    //                 <li className="border-b border-gray-400 my-8 uppercase">
    //                 <Link to="/"> Home</Link>
    //                 </li>
    //                 <li className="border-b border-gray-400 my-8 uppercase">
    //                 <Link to="/products"> Products</Link>
    //                 </li>
    //                 <li className="border-b border-gray-400 my-8 uppercase">
    //                 <Link to="/blog"> Blog</Link>
    //                 </li>
    //                 <li className="border-b border-gray-400 my-8 uppercase">
    //                 <Link to="/cart"> Cart</Link>
    //                 </li>
    //                 <li className="border-b border-gray-400 my-8 uppercase">
    //                 {!user ? (
    //                 <Link to="/login"> Login</Link> ) : ("")}
    //                 </li>
    //                 <li className="border-b border-gray-400 my-8 uppercase">
    //                 <div className="flex place-content-end space-x-3 items-center">{user && (
    //                     <>
    //                         <p className="font-normal"> {auth.currentUser?.displayName} </p>
    //                         <button onClick={logOut} className="bg-sky-900/100 rounded-xl shadow-lg p-1 px-3 font-normal text-slate-100"> Log Out</button>
    //                     </>
    //                     )}
    //                 </div>
    //                 </li>
    //               </ul>
    //             </div>
    //           </section>
      
    //           <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
    //             <li>
    //             <Link to="/"> Home</Link>
    //             </li>
    //             <li>
    //             <Link to="/products"> Products</Link>
    //             </li>
    //             <li>
    //             {!user ? (
    //             <Link to="/login"> Login</Link> ) : ("")}
    //             </li>
    //             <li>
    //             <Link to="/blog"> Blog</Link>
    //             </li>
    //             <li>
    //             <Link to="/cart"> Cart</Link>
    //             </li>
    //             <li>
    //             <div className="flex place-content-end space-x-3 items-center">{user && (
    //                     <>
    //                         <p className="font-normal"> {auth.currentUser?.displayName} </p>
    //                         <button onClick={logOut} className="bg-sky-900/100 rounded-xl shadow-lg p-1 px-3 font-normal text-slate-100"> Log Out</button>
    //                     </>
    //                     )}
    //                 </div>
    //             </li>
    //           </ul>
    //         </nav>
    //         <style>{`
    //         .hideMenuNav {
    //           display: none;
    //         }
    //         .showMenuNav {
    //           display: block;
    //           position: absolute;
    //           width: 100%;
    //           height: 100vh;
    //           top: 0;
    //           left: 0;
    //           background: white;
    //           z-index: 10;
    //           display: flex;
    //           flex-direction: column;
    //           justify-content: space-evenly;
    //           align-items: center;
    //         }
    //       `}</style>
    //       </div>
    //     );
    //   }