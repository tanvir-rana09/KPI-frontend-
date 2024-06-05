import { Control, Controller } from "react-hook-form";
import { FormType } from "../types/FormType";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { Search } from "./header/Header";

interface propsType extends InputHTMLAttributes<HTMLInputElement> {
    name: "password" | "email" | "name"  | "search";
    type: "password" | "email" | "text" | "search";
    placeholder: string;
    className: string;
    control: Control<FormType> | Control<Search>;
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
