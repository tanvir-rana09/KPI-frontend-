import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profilePlaceholder from "../../images/profile.jpg";
import SidebarItems from "../../static/SidenarItems";
import { Link, NavLink } from "react-router-dom";
import { Logout } from "../Index";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
    const data = useSelector((state) => state.project.user);
    const [profile, setProfile] = useState<string>(profilePlaceholder);
    const [sidebar, setSdebar] = useState<boolean>(false);

    useEffect(() => {
        setProfile(data?.image || profilePlaceholder);
    }, [data?.image]);
    const sidebarHandle = () => {
        setSdebar(!sidebar);
    };
    return (
        <div className="relative">
            <div
                className={` bg-white shadow-md flex gap-5 p-2 items-center fixed bottom-0 z-10 left-0 flex-col h-screen sm:pt-[10rem] pt-[13rem] ease-in-out transition-[width] duration-100 ${
                    sidebar ? " w-[15rem]" : " w-[3.5rem]"
                }`}
            >
                <Link
                    to={"/dashboard/profile"}
                    className="flex w-full items-center rounded-md gap-2 hover:bg-four/10"
                >
                    <div className={`w-10 h-10 rounded-full overflow-hidden`}>
                        <img
                            className="w-full h-full object-cover"
                            src={profile}
                            alt="profile"
                        />
                    </div>
                    <div
                        className={`${
                            sidebar
                                ? "flex flex-col "
                                : "hidden "
                        }`}
                    >
                        <h1 className="font-semibold font-extendfont5 capitalize ">
                            {data?.name}
                        </h1>

                        <h3>{data?.email}</h3>
                    </div>
                </Link>
                <div className="w-full flex flex-col gap-3">
                    {SidebarItems.map((item) => (
                        <NavLink
                            className={({ isActive }: { isActive: boolean }) =>
                                isActive
                                    ? " w-full text-center p-3 capitalize bg-four text-white duration-300 border-four rounded-lg shadow-md flex gap-2 items-center"
                                    : " w-full text-center p-3 capitalize border-third rounded-lg flex gap-2 items-center hover:bg-four/15 duration-100 font-semibold"
                            }
                            key={item.id}
                            to={`/dashboard/${item.name}`}
                        >
                            <span>{<item.icon />}</span>
                            <span
                                className={`${
                                    sidebar ? "flex" : "hidden"
                                } duration-300`}
                            >
                                {item?.name}
                            </span>
                        </NavLink>
                    ))}
                </div>
                <div>
                    <Logout sidebar={sidebar}  className="hidden sm:block" />
                </div>
            </div>
            <button
                onClick={sidebarHandle}
                className={`fixed top-[11rem] rounded-full z-50 bg-white shadow p-1.5 cursor-pointer ease-in-out transition duration-300 flex ${
                    sidebar ? " left-[14rem] rotate-180" : " left-[3rem]"
                }`}
            >
                <IoIosArrowForward size={15} />
            </button>
        </div>
    );
};

export default Sidebar;
