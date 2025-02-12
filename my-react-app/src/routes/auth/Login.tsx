// Imports from react
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

// Imports from hooks
import useFirebase from "../../hooks/useFirebase";
import { onAuthStateChanged } from "firebase/auth";
import Input from "../../components/input";


// Default export
export default () => {
    // Navigation
    const navigate = useNavigate();

    //Firebase
    const { auth } = useFirebase();
    // Check if the user is already logged-in in the cache
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    console.log("User is signed in and verified")
                    navigate('/');
                } else {
                    console.log("User is signed in but not verified")
                }

            } else {
                console.log("User is signed out")
            }
        });
    }, [])


    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [errorEmail, setErrorEmail] = useState(false);
    let [errorPassword, setErrorPassword] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    const { login } = useFirebase();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //cancel the default action of the event
        e.preventDefault();


        //get the data from the form
        email = e.currentTarget.email.value;
        password = e.currentTarget.password.value;

        //set the state
        setEmail(email);
        setPassword(password);
        //send data to firebase
        const loginState = login(email, password);
        loginState.then((value) => {
            console.log(value);
            setErrorEmail(false);
            setErrorPassword(false);
            if (value == "success") {
                console.log("Logged in");
                errorMessage = "";
                setErrorMessage(errorMessage);
                setErrorEmail(false);
                setErrorPassword(false);
            }
            else if (value == "auth/weak-password") {
                errorMessage = "Weak-password"
                setErrorMessage(errorMessage);
                setErrorPassword(true);
            }
            else if (value == "auth/wrong-password") {
                // Display email or password error for security reasons
                errorMessage = "Wrong email or password"
                setErrorMessage(errorMessage);
                setErrorEmail(true);
                setErrorPassword(true);
            }
            else if (value == "auth/invalid-email") {
                //Give email input focus and red border
                errorMessage = "Invalid email"
                setErrorMessage(errorMessage);
                setErrorEmail(true);
            }
            else if (value == "auth/invalid-credential") {
                // Display email or password error for security reasons
                errorMessage = "Wrong email or password"
                setErrorMessage(errorMessage);
                setErrorEmail(true);
                setErrorPassword(true);
            }
            else if (value == "auth/user-not-found") {
                // Display email or password error for security reasons
                errorMessage = "Wrong email or password"
                setErrorMessage(errorMessage);
                setErrorEmail(true);
                setErrorPassword(true);
            }
            else if (value == "auth/missing-password") {
                // Display email or password error for security reasons
                errorMessage = "Missing password"
                setErrorMessage(errorMessage);
                setErrorPassword(true);
            }
            else {
                //reset the form
                errorMessage = "unkown"
                setErrorMessage(errorMessage);
                setErrorEmail(true);
                setErrorPassword(true);
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className=" flex flex-col items-center text-center px-2"
        >
            <h1 className=" text-4xl font-bold 3xl:text-5xl">Login</h1>
            <div className=" pt-4 3xl:pt-6  sm:w-96 w-72">
                <Input
                    lable="E-mail"
                    placeholder="Jhon.doe@gmail.com"
                    id="email"
                    error={errorEmail}
                    errorMessage={errorMessage}
                    type="email"
                    maxLength={40}
                />
                <Input
                    lable="Wachtwoord"
                    placeholder="w@w00rd"
                    id="password"
                    error={errorPassword}
                    errorMessage={errorMessage}
                    type="password"
                    maxLength={30}
                />
            </div>
            <div className="w-full text-center pt-4 3xl:pt-6 3xl:text-xl">
                <input
                    type="submit"
                    value="Login"
                    className="focus:ring-2 focus:ring-dark-black lg:w-1/4 m-auto sm:w-1/2 w-32 bg-orange-500 text-white p-1 text-xl rounded-lg text-center py-2 outline-none border-2 active:bg-orange-400 active:shadow-inner active:translate-y-[3px]"
                />
                <div className="pt-4">
                    <p className="inline-block">Already have an account?</p>
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
        </form>
    );
}