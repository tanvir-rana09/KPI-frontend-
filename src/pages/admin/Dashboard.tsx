import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Index";

const Dashboard = () => {

    return (
        <div className="w-full max-w-7xl mx-auto flex">
            <div >
                <Sidebar />
            </div>
            <aside className="grow ml-[14.4rem] mt-[8rem] p-2">
                 <Outlet />
            </aside>
        </div>
    );
};

export default Dashboard;
