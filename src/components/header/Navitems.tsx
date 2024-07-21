import { Link, NavLink } from "react-router-dom";
import navbarItems from "../../static/NavbarItems";
import { Navitems } from "../../types/Navbar.type";
import { IoIosArrowDown } from "react-icons/io";

const Navitem = ({ className }: { className?: string }) => {
    return (
        <ul className={` ${className}`}>
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
                            <ul className="dropown absolute overflow-hidden rounded-xl left-0 md:-left-7 bg-white shadow-xl p-2 w-36 flex flex-col duration-500 ease-in-out z-50 border border-gray-100">
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
    );
};

export default Navitem;
