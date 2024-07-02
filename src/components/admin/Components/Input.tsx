import {  Controller } from "react-hook-form";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";


interface propsType extends InputHTMLAttributes<HTMLInputElement> {
    name: "password" | "email" | "name"  | "search" | "number";
    type: "password" | "email" | "text" | "search" | "number";
    placeholder: string;
    className: string;
    control: any;
    errors: ReactNode;
}

const Input = forwardRef<HTMLInputElement, propsType>(
    (
        {
            name,
            type = "text",
            placeholder = "",
            className = "",
            control,
            errors,
        }: propsType,
        ref
    ) => {
        return (
            <div>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <input
                            ref={ref}
                            autoComplete={
                                type === "password" ? "current-password" : "on"
                            }
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            className={`${className} w-full outline-none bg-gray-100 p-2 px-4 `}
                            onChange={onChange}
                        />
                    )}
                />
                {errors && <p className="text-red-500">{errors}*</p>}
            </div>
        );
    }
);

export default Input;
