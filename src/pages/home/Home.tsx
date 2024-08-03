import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const submit = () => {
        toast.success("This is a toast notification ❤️!");
    };
    const [file,setFile] = useState()

    const hello = (e) => {
        console.log(e.target.files[0]);
    };

    return (
        <div>
            <button onClick={submit}>Submit</button>
            <ToastContainer />
            <input onChange={hello} id="image" type="file" className="" />
        </div>
    );
};

export default Home;
