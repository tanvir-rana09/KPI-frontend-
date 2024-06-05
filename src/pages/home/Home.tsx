import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
    const submit = () => {
        toast.success("This is a toast notification !");
    };
    return (
        <div>
            <button onClick={submit}>submit</button>
            <ToastContainer />
            Home page
        </div>
    );
};

export default Home;
