import {  ReactNode } from "react";

const Button = ({
    type = "submit",
    className = "",
    children,
}: {
    type?: "submit" | "reset" | "button";
    className?: string;
    children: ReactNode ;
},props) => {
    return (
        <button type={type} className={`flex items-center gap-1 justify-center bg-second text-white px-5 py-2 rounded-md shadow ${className} w-full `} {...props}>
            {children}
        </button>
    );
};

export default Button;
