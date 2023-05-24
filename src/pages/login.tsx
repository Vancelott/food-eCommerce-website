import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        navigate("/");
    };

    return (
    <div className="flex justify-center items-center bg-slate-100 w-screen h-screen">
        {/* <h1> Login Page </h1>
        <p>Sign in with Google</p>
        <button onClick={signInWithGoogle}> Sign In With Google</button> */}
        <div className="max-w-lg mx-auto px-32 py-60 bg-white rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Login</h1>
        <div className="my-5">
            <button onClick={signInWithGoogle} className="w-full text-center py-3 px-1 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> <span>Login with Google</span>
            </button>
            </div>
            </div>
        </div>
)};