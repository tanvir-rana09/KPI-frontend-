import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const submit = () => {
        toast.success("This is a toast notification ❤️!");
    };


    return (
        <div>
            <button onClick={submit}>Submit</button>
            <ToastContainer />
        </div>
    );
};

export default Home;
