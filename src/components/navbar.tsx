import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

export const NavBar = () => {

    const [user] = useAuthState(auth);

    const logOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="flex flex-row place-content-center space-x-8 bg-blue-950 text-white py-10 text-base font-semibold items-center sticky top-0 drop-shadow-lg"> 
            <Link to="/"> Home</Link>
            {!user ? (
            <Link to="/login"> Login</Link> ) : ("")}
            <Link to="/about"> About</Link>
            <Link to="/products"> Products</Link>
            <Link to="/blog"> Blog</Link>
            <Link to="/cart"> Cart</Link>
            <div className="flex place-content-end space-x-3 items-center">{user && (
                <>
                <p className="font-normal"> {auth.currentUser?.displayName} </p>
                {/* <img src={auth.currentUser?.photoURL || ""} width="100" height="100"/> */}
                <button onClick={logOut} className="bg-sky-900/100 rounded-xl shadow-lg p-1 px-3 font-normal text-slate-100"> Log Out</button>
                </>
            )}
            </div>
        </div>
    );
};