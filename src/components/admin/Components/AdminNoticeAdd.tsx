import { useForm } from "react-hook-form";
import Loading from "../../Loading";
import { useState } from "react";
import apiCall from "../../../utils/ApiCall";


const AdminNoticeAdd = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);


    const submit = async (data) => {
        console.log(data);

        setLoading(true);
        const res = await apiCall("/api/v1/photo/add", "post", data)
            .catch((err) => {
				console.log(err);
            })
            .finally(() => setLoading(false));
        if (res) {
            reset();
        }
        console.log(res);
    };

	console.log(errors);
	
    return (
        <div>
            <h1>All Notice Photo's</h1>
            <form onSubmit={handleSubmit(submit)}>
                <div className="col-span-full">
                    <span>Notice Photo</span>
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
                <div className="sm:col-span-3">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Notice Title
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("title", {
                                required: {
                                    message: "This field is required",
                                    value: true,
                                },
                            })}
                            type="text"
                            id="title"
                            autoComplete="title"
                            placeholder="Enter title"
                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                    {errors.title?.message && (
                        <p className="text-red-500">{errors.title?.message}*</p>
                    )}
                </div>
                <div className="sm:col-span-3">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Notice Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            {...register("title", {
                                required: {
                                    message: "This field is required",
                                    value: true,
                                },
                            })}
							rows={10} 
                            id="description"
                            autoComplete="description"
                            placeholder="Enter description"
                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                    {errors.description?.message && (
                        <p className="text-red-500">
                            {errors.description?.message}*
                        </p>
                    )}
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
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
            </form>
        </div>
    );
};

export default AdminNoticeAdd;
