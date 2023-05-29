import { auth, provider } from '../config/firebase'
import { signInWithPopup, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            navigate("/login");
          });
    };
    
    const signInWithTestAccount = async () => {
        const email = 'gutenburgertest@test.com';
        const password = 'testaccount123';
        const displayName = "Test Account"
    
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          const displayName = "Test Name";
          await updateProfile(user, { displayName });    
          navigate("/");
        } catch (error) {
          console.log("Error signing in with test account:", error);
        }
      };
    
    return (
    <div className="flex justify-center items-center bg-slate-100 w-screen h-screen">
    <div className="max-w-lg mx-auto px-32 py-60 bg-white rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Login</h1>
            <div className="my-5">
                <button onClick={signInWithGoogle} className="w-full text-center py-3 px-1 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> <span>Login with Google</span>
                </button>
                <button onClick={signInWithTestAccount} className="w-full text-center py-3 px-1 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    Login with a Test Account
                </button>
        </div>
    </div>
    </div>
)};