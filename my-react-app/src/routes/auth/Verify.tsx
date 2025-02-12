// Imports from react
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

// Imports from hooks
import useFirebase from "../../hooks/useFirebase";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";


// Default export
export default () => {
    // Navigation
    const navigate = useNavigate();

    //Firebase
    const { auth } = useFirebase();
    // Check if the user is already logged-in in the cache
    useEffect(() => {
        // Add a listener to the firebase auth object
        onAuthStateChanged(auth, (user) => {
            if (user?.emailVerified) {
                console.log("User is signed in")
                navigate('/');

            } else {
                console.log("User email is not verified")
            }
        });

        // Add timer the checks every 2 seconds if the user is verified
        const interval = setInterval(() => {
            auth.currentUser?.reload();
            if (auth.currentUser?.emailVerified) {
                console.log("User is verified")
                navigate('/');
            } else {
                console.log("User is not verified")
            }
        }
            , 2000);

        // Clear interval on unmount
        return () => clearInterval(interval);

    }, [])

    const SendEmailVerification = () => {
        if (auth.currentUser) sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Email sent")
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div className=" flex flex-col items-center text-center px-2">
            <h1 className=" text-4xl font-bold 3xl:text-5xl pb-2">
                Verificatie e-mail send!
            </h1>
            <h2 className=" text-xl pb-2">Dit kan even duren.</h2>
            <p className=" text-sm 3xl:text-base w-10/12 m-auto text-center pb-4">
                (Don't forget to check your spam folder)
            </p>
            <div className="w-full text-center pt-4 3xl:pt-6 3xl:text-xl">
                <input
                    onClick={SendEmailVerification}
                    type="submit"
                    value="Herstuur email!"
                    className="focus:ring-2 w-fit focus:ring-dark-black m-auto bg-orange-500 text-white p-1 text-xl rounded-lg text-center py-2 outline-none border-2 border-orange-500 active:bg-orange-400 active:shadow-inner active:translate-y-[3px]"
                />
                <div className="pt-4">
                    <p className="inline-block">No account yet?</p>
                    <Link to={'/auth/register'} className="text-orange-500 font-bold">
                        {' '}
                        Register here
                    </Link>
                </div>
                <Link
                    to={'/auth/password-reset'}
                    className=" text-orange-500 font-bold"
                >
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}