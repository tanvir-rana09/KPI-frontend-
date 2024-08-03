import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import apiCall from "../utils/ApiCall";
import { setAuthStatus, setUserDetails } from "../redux/projectSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
    setSidebar?: (value: boolean) => void;
}

const Logout = ({ setSidebar }: LogoutProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logout = async () => {
        try {
            const res = await apiCall("/api/v1/user/logout", "get");
            console.log(res);

            if (res?.statusCode) {
                // show success message
                toast.success("Logout successfully");

                // success
                if (setSidebar) {
                    setSidebar(false);
                }

                // optionally navigate to login page
                navigate("/login");

                // clear initial state of redux
                dispatch(setUserDetails({}));
                dispatch(setAuthStatus(false));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button
                onClick={logout}
                className="flex items-center justify-center bg-second text-white py-2 gap-2 absolute bottom-0 right-0 left-0 mx-auto"
            >
                Logout
                <RiLogoutCircleRLine />
            </button>
            <ToastContainer />
        </>
    );
};

export default Logout;
