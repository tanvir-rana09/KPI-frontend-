import { Outlet, useLocation } from "react-router-dom";
import { Profile, Sidebar } from "../../components/Index";

const Dashboard = () => {
    const location = useLocation();
    const isDashboardRoute = location.pathname === "/dashboard";

    return (
        <div className="w-full max-w-7xl mx-auto flex">
            <div>
                <Sidebar />
            </div>
            <aside className="grow">
                {isDashboardRoute ? <Profile/> : <Outlet />}
            </aside>
        </div>
    );
};

export default Dashboard;
