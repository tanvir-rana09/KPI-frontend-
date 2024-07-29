import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const Auth = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authStatus } = useSelector((state: any) => state.project);

    useEffect(() => {
        if (authStatus && (location.pathname === "/login" || location.pathname === "/signup")) {
            navigate("/");
        }
    }, [authStatus, navigate, location.pathname]);

    return <>{children}</>;
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { authStatus } = useSelector((state: any) => state.project);

    if (!authStatus) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { user, authStatus } = useSelector((state: any) => state.project);
    const navigate = useNavigate();
    if (!authStatus) {
        return <Navigate to="/login" />;
    }

    if (!user?.isAdmin) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export { Auth, ProtectedRoute, AdminRoute };






// import { ReactNode, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const Auth = ({ children }: { children: ReactNode }) => {
//     const navigate = useNavigate();
//     const { user, authStatus } = useSelector((state: any) => state.project);
//     useEffect(() => {
//         console.log("hello");
//         if (
//             authStatus &&
//             (location.pathname === "/login" || location.pathname == "/signup")
//         ) {
//             navigate("/");
//         }
//         console.log(location.pathname);
        
//         if (user.isAdmin) {
//             navigate("/dashboard");
//         } else {
//             navigate("/");
//         } 
//     }, [user, navigate, authStatus]);

//     return <>{children}</>;
// };

// export default Auth;
