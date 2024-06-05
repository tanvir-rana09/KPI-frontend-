import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components/Index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import apiCall from "./utils/ApiCall";
import { setAuthStatus, setUserDetails } from "./redux/projectSlice";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const getcurrentUser = async () => {
            try {
                const res = await apiCall("/api/v1/user/current-user", "get");

                if (res?.statusCode == 200 && res?.success == true) {
                    dispatch(setUserDetails(res.data));
                    dispatch(setAuthStatus(true));
                }
            } catch (error) {
                console.log(error);
            }
        };

        getcurrentUser();
    }, [dispatch]);
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
