import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import logo from "../../images/kpi.png";
import profilePlaceholder from "../../images/profile.jpg";
import { HeaderProfile } from "../Index";
import { MdDashboardCustomize } from "react-icons/md";
import Navitem from "./Navitems";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
    const { user } = useSelector((state) => state.project);
    const [profile, setProfile] = useState(profilePlaceholder);

    useEffect(() => {
        setProfile(user?.image || profilePlaceholder);
    }, [user]);

    const [sidebar, setSidebar] = useState(false);
    const [sidebarnavbar, setSidebarnavbar] = useState(false);

    return (
        <div>
            <nav className="flex justify-between items-center p-3 px-5 relative">
                <div className="w-10 h-full object-cover rounded-full overflow-hidden">
                    <img className="w-full" src={logo} alt="kpi logo" />
                </div>
                <div>
                    <Navitem className="md:flex gap-2 hidden" />
                </div>
                <div>
                    {user?._id ? (
                        user.isAdmin ? (
                            <Link
                                className="flex items-center gap-1 bg-second text-white px-4 py-1.5 rounded-md shadow"
                                to="/dashboard/profile"
                            >
                                <MdDashboardCustomize />
                                Dashboard
                            </Link>
                        ) : (
                            <button onClick={() => setSidebar(!sidebar)}>
                                <div className="w-10 aspect-square rounded-full overflow-hidden ring-[3px] ring-black ">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={profile}
                                        alt="profile"
                                    />
                                </div>
                            </button>
                        )
                    ) : (
                        <div>
                            <Link
                                className="flex gap-2 bg-black text-white px-4 py-1 rounded-lg shadow-xl"
                                to="/login"
                            >
                                Sign in
                            </Link>
                        </div>
                    )}
                </div>
                <div
                    className={`fixed top-0 bottom-0 duration-500 ease-in-out z-50 ${
                        sidebar
                            ? "right-0 opacity-100 "
                            : "-right-[40rem] opacity-0 "
                    } `}
                >
                    <HeaderProfile setSidebar={setSidebar} sidebar={sidebar} />
                </div>
            </nav>
            <div>
                <button
                    onClick={() => setSidebarnavbar(!sidebarnavbar)}
                    className="fixed md:hidden top-16 left-0 bg-primary p-2 shadow-md rounded-r-full"
                >
                    <FaBars size={20} />
                </button>
                <div
                    className={`fixed top-0 bottom-0 duration-500 ease-in-out z-50 bg-white flex p-5 gap-5 shadow-md md:hidden ${
                        sidebarnavbar
                            ? "left-0 opacity-100 "
                            : "-left-[40rem] opacity-0 "
                    } `}
                >
                    <Navitem className="flex flex-col gap-5" />
                    <button
                        onClick={() => setSidebarnavbar(!sidebarnavbar)}
                        className="p-2 bg-slate-200 w-[41px] h-[41px] flex items-center justify-center rounded-full shadow-slate-300 shadow-inner"
                    >
                        <RxCross1 size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
