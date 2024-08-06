import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Index";

const Dashboard = () => {

    return (
        <div className="w-full max-w-7xl mx-auto flex">
            <div >
                <Sidebar />
            </div>
            <aside className="grow ml-[3rem] xl:ml-0 p-2 overflowAuto overflow-x-auto">
                 <Outlet />
            </aside>
        </div>
    );
};

export default Dashboard;
