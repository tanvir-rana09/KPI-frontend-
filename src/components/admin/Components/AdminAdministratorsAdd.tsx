import { useState } from "react";
import { useForm } from "react-hook-form";
import apiCall from "../../../utils/ApiCall";
import ErrorState from "../../../types/administrators";
import { Loading } from "../../Index";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AdminAdministratorAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorState>({
        name: null,
        position: null,
        shift: null,
        address: null,
        image: null,
        department: null,
        education: null,
        joiningDate: null,
        number: null,
        email: null,
        gender: null,
        pastInstitute: null,
    });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        setLoading(true);
        const res = await apiCall("/api/v1/administrators/add", "post", data)
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
                toast.success("Successfully add a Administrator ❤️");
            }
        }
        console.log(res.success);
    };

    return (
        <div>
            <form className=" p-5" onSubmit={handleSubmit(submit)}>
                <div className="col-span-full">
                    <span>Profile image</span>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="image"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        {...register("image")}
                                        id="image"
                                        type="file"
                                        className="sr-only"
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
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="fullNamev"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Full name
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("name", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        type="text"
                                        id="fullName"
                                        autoComplete="given-name"
                                        placeholder="Enter full name"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("email", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        placeholder="Enter email"
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="number"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="number"
                                        type="number"
                                        autoComplete="number"
                                        {...register("number", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                            minLength: {
                                                message: "minimum number 10",
                                                value: 10,
                                            },
                                        })}
                                        placeholder="Enter email"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("address", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        placeholder="address"
                                        type="text"
                                        id="address"
                                        autoComplete="address"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="institute-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Past Institute name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("pastInstitute")}
                                        id="institute-name"
                                        placeholder="Enter past institute name"
                                        autoComplete="institute-name"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="education"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Education
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("education", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        placeholder="education"
                                        id="education"
                                        autoComplete="education"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="joiningDate"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Joining date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        {...register("joiningDate", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        placeholder="joiningDate"
                                        id="joiningDate"
                                        autoComplete="family-name"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="gender"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        defaultValue={"gender"}
                                        {...register("gender", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        id="gender"
                                        name="gender"
                                        autoComplete="gender-name"
                                        className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Male</option>
                                        <option>Famale</option>
                                        {/* <option>Mexico</option> */}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="department"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Department
                                </label>
                                <div className="mt-2">
                                    <select
                                        defaultValue={"department"}
                                        {...register("department", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        id="department"
                                        name="department"
                                        autoComplete="department-name"
                                        className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Computer</option>
                                        <option>Civil</option>
                                        <option>Mechanical</option>
                                        <option>Power</option>
                                        <option>Electrical</option>
                                        <option>Electrpnics</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="position"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Position
                                </label>
                                <div className="mt-2">
                                    <select
                                        defaultValue={"position"}
                                        {...register("position", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        id="position"
                                        name="position"
                                        autoComplete="position-name"
                                        className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Teacher</option>
                                        <option>Staff</option>
                                        {/* <option>Mexico</option> */}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="shift"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Shift
                                </label>
                                <div className="mt-2">
                                    <select
                                        defaultValue={"shift"}
                                        {...register("shift", {
                                            required: {
                                                message:
                                                    "This field is required",
                                                value: true,
                                            },
                                        })}
                                        id="shift"
                                        name="shift"
                                        autoComplete="shift-name"
                                        className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>1 st</option>
                                        <option>2 nd</option>
                                        {/* <option>Mexico</option> */}
                                    </select>
                                </div>
                            </div>
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
        </div>
    );
};

export default AdminAdministratorAdd;
