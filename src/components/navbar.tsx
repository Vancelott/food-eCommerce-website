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
        <div> 
            <Link to="/"> Home</Link>
            {!user ? (
            <Link to="/login"> Login</Link> ) : ("")}
            <Link to="/about"> About</Link>
            <Link to="/products"> Products</Link>
            <Link to="/blog"> Blog</Link>
            <Link to="/cart"> Cart</Link>
            <div>{user && (
                <>
                <p> {auth.currentUser?.displayName} </p>
                <img src={auth.currentUser?.photoURL || ""} width="100" height="100"/>
                <button onClick={logOut}> Log Out</button>
                </>
            )}
            </div>
        </div>
    );
};