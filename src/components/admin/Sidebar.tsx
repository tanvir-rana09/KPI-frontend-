"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profilePlaceholder from "../../images/profile.jpg";
import SidebarItems from "../../static/SidenarItems";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const data = useSelector((state) => state.project.user);
    const [profile, setProfile] = useState(profilePlaceholder);

    useEffect(() => {
        setProfile(data?.image || profilePlaceholder);
    }, [data?.image]);

    return (
        <div className="w-full bg-white shadow-md h-screen flex flex-col gap-5 p-3 items-center ">
            <div className="flex items-center gap-2 flex-col">
                <div className="w-44 h-44 rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={profile}
                        alt="profile"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-semibold font-extendfont9 capitalize">
                       {data?.name}
                    </h1>
                    <h2 className="text-sm">{data?._id}</h2>
                    <h3>{data?.email}</h3>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
                {SidebarItems.map((item, i) => (
                    <NavLink
					className={({ isActive }:{isActive:boolean}) =>
						isActive
							? "border-2 w-full text-center p-2 capitalize bg-four text-white duration-300 border-four  rounded-lg shadow-md"
							: "border-2 w-full text-center p-2 capitalize border-third rounded-lg"
					}
					
                        key={i}
                        to={`/dashboard/${item.name}`}
                    >
                        {" "}
                        {item?.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
