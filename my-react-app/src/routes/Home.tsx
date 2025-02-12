import useFirebase from "../hooks/useFirebase";

function Home() {
    //Firebase
    const { logout } = useFirebase();

    return (
        <div>
            <h2>Home</h2>
            <button onClick={logout} className=" w-full border-2 border-deep-orange bg-white text-black py-2 px-4 rounded-lg">
                <p className=" font-bold">Log out</p>
            </button>
        </div>
    )
}

export default Home
