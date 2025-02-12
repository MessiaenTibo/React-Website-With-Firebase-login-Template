// Imports from react
import { useState } from "react";
import { Link } from "react-router-dom"

// Imports from hooks
import useFirebase from "../../hooks/useFirebase";
import Input from "../../components/input";


// Default export
export default () => {

    let [errorUsername, setErrorUsername] = useState(false);
    let [errorEmail, setErrorEmail] = useState(false);
    let [errorPassword, setErrorPassword] = useState(false);
    let [errorPasswordConfirm, setErrorPasswordConfirm] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');


    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [passwordConfirm, setPasswordConfirm] = useState('');

    let [error, setError] = useState('none');

    const { register } = useFirebase();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //cancel the default action of the event
        e.preventDefault();

        //get the data from the form
        name = e.currentTarget.username.value;
        email = e.currentTarget.email.value;
        password = e.currentTarget.password.value;
        passwordConfirm = e.currentTarget.passwordConfirm.value;


        //set the state
        setName(name);
        setEmail(email);
        setPassword(password);
        setPasswordConfirm(passwordConfirm);

        //check if the passwords match
        if (password != passwordConfirm) {
            setError("passwords-dont-match");
            setErrorPassword(true);
            setErrorPasswordConfirm(true);
            setErrorMessage(error);
            return;
        }

        //send data to firebase
        const registerState = register(name, email, password);
        registerState.then(({ errorCode, errorMessage }) => {
            //reset the errors
            setErrorUsername(false);
            setErrorEmail(false);
            setErrorPassword(false);
            setErrorPasswordConfirm(false);
            setErrorMessage(errorMessage);
            if (errorCode == "success") {
                setError("none");
                setErrorMessage(error);
            }
            else if (errorCode == "auth/weak-password") {
                setError("weak-password");
                setErrorPassword(true);
                setErrorMessage(error);
            }
            else if (errorCode == "auth/email-already-in-use") {
                setError("Email already in use");
                setErrorEmail(true);
                setErrorMessage(error);
            }
            else if (errorCode == "auth/invalid-email") {
                setError("Invalid email");
                setErrorEmail(true);
                setErrorMessage(error);
            }
            else if (errorCode == "auth/invalid-display-name") {
                setError("Invalid display name");
                setErrorUsername(true);
                setErrorMessage(error);
            }
            else {
                //reset the form
                setError("unkown")
                setErrorMessage(error);
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className=" flex flex-col items-center text-center px-2 "
        >
            <h1 className=" text-4xl font-bold 3xl:text-5xl">
                Create an account
            </h1>
            <div className=" pt-4 3xl:pt-6 sm:w-96 w-72">
                <Input
                    lable="Naam"
                    placeholder="Jhon doe"
                    id="username"
                    error={errorUsername}
                    errorMessage={errorMessage}
                    maxLength={20}
                />
                <Input
                    lable="E-mail"
                    placeholder="Jhon.doe@gmail.com"
                    type="email"
                    id="email"
                    error={errorEmail}
                    errorMessage={errorMessage}
                    maxLength={40}
                />
                <Input
                    lable="Wachtwoord"
                    placeholder="w@w00rd"
                    type="password"
                    id="password"
                    error={errorPassword}
                    errorMessage={errorMessage}
                    maxLength={30}
                />
                <Input
                    lable="Wachtwoord bevestigen"
                    placeholder="w@w00rd"
                    type="password"
                    id="passwordConfirm"
                    error={errorPasswordConfirm}
                    errorMessage={errorMessage}
                    maxLength={30}
                />
            </div>
            <div className="w-full text-center pt-4 3xl:pt-6 3xl:text-xl">
                <input
                    type="submit"
                    value="Register"
                    className="focus:ring-2 focus:ring-dark-black  w-fit m-auto bg-orange-500 text-white p-1 text-xl rounded-lg text-center py-2 outline-none border-2 border-orange-500 active:bg-orange-400 active:shadow-inner active:translate-y-[3px]"
                />

                <div className="pt-4">
                    <p className="inline-block">Already have a account?</p>
                    <Link to={'/auth/login'} className="text-orange-500 font-bold">
                        {' '}
                        Log in
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