// Import from react
import { Link, useNavigate } from "react-router-dom"

// Imports from components
import useFirebase from "../../hooks/useFirebase";
import Input from "../../components/input";


// Default export
export default () => {
    // Navigation
    const navigate = useNavigate();

    const { resetPassword } = useFirebase();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //cancel the default action of the event
        e.preventDefault();

        //Send reset password email
        resetPassword(e.currentTarget.email.value);

        //Navigate to login
        navigate('/auth/login')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className=" flex flex-col items-center text-center px-2"
        >
            <h1 className=" text-4xl font-bold 3xl:text-5xl">Account Repair</h1>
            <div className=" pt-4 3xl:pt-6  sm:w-96 w-72">
                <Input
                    lable="E-mail"
                    placeholder="Jhon.doe@gmail.com"
                    type="email"
                    id="email"
                />
            </div>
            <div className="w-full text-center pt-4 3xl:text-xl">
                <input
                    type="submit"
                    value="RESET"
                    className="focus:ring-2 focus:ring-dark-black lg:w-1/4 m-auto sm:w-1/2 w-32 bg-orange-500 text-white p-1 text-xl rounded-lg text-center py-2 outline-none border-2 border-orange-500 active:bg-orange-400 active:shadow-inner active:translate-y-[3px]"
                />

                <div className="pt-4 3xl:pt-6">
                    <p className="inline-block">Already have an account?</p>
                    <Link to={'/auth/login'} className="text-orange-500 font-bold">
                        {' '}
                        Log in
                    </Link>
                </div>
                <Link to={'/auth/register'} className=" text-orange-500 font-bold">
                    Register here
                </Link>
            </div>
        </form>
    );
}