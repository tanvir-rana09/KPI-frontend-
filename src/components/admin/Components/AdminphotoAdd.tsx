import { useForm } from "react-hook-form";
import Loading from "../../Loading";
import { useState } from "react";
import apiCall from "../../../utils/ApiCall";
import { toast, ToastContainer } from "react-toastify";

interface FormDataType {
    image: any;
    title: string;
    description: string;
}

const AdminphotoAdd = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const submit = async (data: FormDataType) => {
        if (!data.image[0]) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("title", data.title);
        formData.append("description", data.description);

        setLoading(true);
        const res = await apiCall("/api/v1/photo/add", "post", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
        if (res) {
            reset();
            if (res.success) {
                toast.success("Successfully added a photo ❤️");
            }
        }
        console.log(res);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="col-span-full">
                    <span>Add a new photo</span>

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
                                                message:
                                                    "Image field is required",
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
                    {errors.image?.message &&
                        typeof errors.image.message === "string" && (
                            <p className="text-red-500">
                                {errors.image.message}*
                            </p>
                    )}
                </div>
                <div className="sm:col-span-3">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Photo Title
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
                    {errors.title?.message &&
                        typeof errors.title.message === "string" && (
                            <p className="text-red-500">
                                {errors.title.message}*
                            </p>
                        )}
                </div>
                <div className="sm:col-span-3">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Photo Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            {...register("description", {
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
                    {errors.description?.message &&
                        typeof errors.description.message === "string" && (
                            <p className="text-red-500">
                                {errors.description.message}*
                            </p>
                        )}
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 mb-20 sm:mb-0">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <div className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
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

export default AdminphotoAdd;
