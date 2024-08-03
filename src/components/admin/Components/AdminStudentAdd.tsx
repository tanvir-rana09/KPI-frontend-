import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiCall from "../../../utils/ApiCall";
import Loading from "../../Loading";
import { toast, ToastContainer } from "react-toastify";

interface ErrorState {
    name: string | null;
    roll: string | null;
    registration: string | null;
    semester: string | null;
    shift: string | null;
    group: string | null;
    captain: string | null;
    gmail: string | null;
    number: string | null;
    gender: string | null;
    session: string | null;
    [key: string]: string | null; // To allow dynamic access
}

const AdminStudentAdd: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<ErrorState>({
        name: null,
        roll: null,
        registration: null,
        semester: null,
        shift: null,
        group: null,
        captain: null,
        gmail: null,
        number: null,
        gender: null,
        session: null,
    });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        data = {...data,image:data.image[0]}
        setLoading(true);
        const res = await apiCall("/api/v1/student/add", "post", data,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .catch((err) => {
                setError((prevError) => {
                    const newErrors = { ...prevError };
                    if (err?.response?.data) {
                        Object.keys(newErrors).forEach((key) => {
                            newErrors[key as keyof ErrorState] =
                                err.response.data[key];
                        });
                    }
                    return newErrors;
                });
            })
            .finally(() => setLoading(false));
        if (res) {
            reset();
            if (res.success) {
                toast.success("Successfully add a student ❤️");
            }
        }
        console.log(res);
    };

    const formFields = [
        { name: "name", label: "Full Name", type: "text" },
        { name: "roll", label: "Roll", type: "text" },
        { name: "registration", label: "Registration", type: "text" },
        { name: "gmail", label: "Gmail", type: "email" },
        { name: "number", label: "Number", type: "number" },
        { name: "session", label: "Session", type: "text" },
        {
            name: "semester",
            label: "Semester",
            type: "select",
            options: Array.from({ length: 8 }, (_, i) => (i + 1).toString()),
        },
        {
            name: "shift",
            label: "Shift",
            type: "select",
            options: ["1st", "2nd"],
        },
        { name: "group", label: "Group", type: "select", options: ["A", "B"] },
        {
            name: "gender",
            label: "Gender",
            type: "select",
            options: ["Male", "Female"],
        },
        { name: "captain", label: "Captain", type: "checkbox" },
    ];

    return (
        <form className=" p-5" onSubmit={handleSubmit(submit)}>
            <div className="col-span-full">
                <span>Profile image</span>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                    <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file"
                                className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input
                                    type="file"
                                    {...register("image", {
                                        required: {
                                            message: "Image field is required",
                                            value: true,
                                        },
                                    })}
                                    id="file"
                                    className="hidden cursor-pointer"
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Add details to add a new administrator
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {formFields.map((field) => (
                            <div
                                key={field.name}
                                className={`sm:col-span-3 ${
                                    field.type === "checkbox"
                                        ? "flex gap-2 items-center "
                                        : ""
                                }
                               
                                `}
                            >
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {field.label}
                                </label>
                                <div className={`mt-2 `}>
                                    {field.type === "select" ? (
                                        <select
                                            defaultValue={field.name}
                                            {...register(field.name, {
                                                required: {
                                                    message:
                                                        "This field is required",
                                                    value: true,
                                                },
                                            })}
                                            id={field.name}
                                            className="block px-3 min-w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 "
                                        >
                                            {field.options?.map((option) => (
                                                <option
                                                    className=" font-medium"
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                    {field.label == "Semester"
                                                        ? " semester"
                                                        : ""}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === "checkbox" ? (
                                        <input
                                            {...register(field.name)}
                                            type="checkbox"
                                            id={field.name}
                                            className="px-3 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    ) : (
                                        <div>
                                            <input
                                                {...register(field.name, {
                                                    required: {
                                                        message:
                                                            "This field is required",
                                                        value: true,
                                                    },
                                                })}
                                                type={field.type}
                                                id={field.name}
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {
                                                <div>
                                                    {field.type === "input" ? (
                                                        <p>
                                                            {error[field.name]}
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 mb-20 sm:mb-0">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Cancel
                </button>
                <div className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                    {loading ? (
                        <Loading />
                    ) : (
                        <button type="submit">Submit</button>
                    )}
                </div>
            </div>
            <ToastContainer />
        </form>
    );
};

export default AdminStudentAdd;
