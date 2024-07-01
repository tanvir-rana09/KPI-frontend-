import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import navbarItems from "../../static/NavbarItems";
import logo from "../../images/kpi.png";
import profilePlaceholder from "../../images/profile.jpg";
import { Navitems } from "../../types/Navbar.type";
import { HeaderProfile } from "../Index";
import { MdDashboardCustomize } from "react-icons/md";

const Navbar = () => {
    const { user } = useSelector((state) => state.project);
    const [profile, setProfile] = useState(profilePlaceholder);

    useEffect(() => {
        setProfile(user?.image || profilePlaceholder);
    }, [user]);

    const [sidebar, setSidebar] = useState(false);


    return (
        <nav className="flex justify-between items-center p-3 px-5 ">
            <div className="w-10 h-full object-cover rounded-full overflow-hidden">
                <img className="w-full" src={logo} alt="kpi logo" />
            </div>
            <ul className="flex gap-2">
                {navbarItems.map((item: Navitems) => (
                    <li
                        className="flex items-center gap-1 parent relative"
                        key={item.id}
                    >
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "after:scale-100 hoverEffect"
                                    : "hover:text-second hoverEffect"
                            }
                            to={item.slug}
                        >
                            {item.name}
                        </NavLink>
                        {item.arrow && (
                            <>
                                <span className="child ease-in-out duration-500 transition-transform">
                                    <IoIosArrowDown />
                                </span>
                                <ul className="dropown absolute overflow-hidden rounded-xl -left-7 bg-white shadow-xl p-2 w-36 flex flex-col duration-500 ease-in-out z-50">
                                    {item.dropdown?.map((subItem) => (
                                        <li
                                            key={subItem.name}
                                            className="hover:bg-gray-200 text-center p-2 cursor-pointer rounded-md"
                                        >
                                            <Link to={subItem.slug}>
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                {user?._id ? (
                    user.isAdmin ? (
                        <Link 
                        className="flex items-center gap-1 bg-second text-white px-4 py-1.5 rounded-md shadow"
                        to="/dashboard"><MdDashboardCustomize />Dashboard</Link>
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
    );
};

export default Navbar;
