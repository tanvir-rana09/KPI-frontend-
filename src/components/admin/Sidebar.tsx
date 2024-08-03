import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profilePlaceholder from "../../images/profile.jpg";
import SidebarItems from "../../static/SidenarItems";
import { Link, NavLink } from "react-router-dom";
import { Logout } from "../Index";

const Sidebar = () => {
    const data = useSelector((state) => state.project.user);
    const [profile, setProfile] = useState(profilePlaceholder);

    useEffect(() => {
        setProfile(data?.image || profilePlaceholder);
    }, [data?.image]);

    return (
        <div className="relative">
            <div className=" bg-white shadow-md flex gap-5 p-3 items-center fixed bottom-0 left-0 2xl:left-[20rem] flex-row h-20 sm:flex-col sm:h-screen pt-[9rem]">
                <Link
                    to={"/dashboard/profile"}
                    className="sm:flex hidden items-center rounded-md gap-2 hover:bg-four/10 p-2"
                >
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={profile}
                            alt="profile"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold font-extendfont5 capitalize">
                            {data?.name}
                        </h1>

                        <h3>{data?.email}</h3>
                    </div>
                </Link>
                <div className="flex gap-2 items-center w-full flex-row sm:flex-col">
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
                            <span>{item?.name}</span>
                        </NavLink>
                    ))}
                </div>
                <div>
                    <Logout />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
