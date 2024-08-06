import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiCall from "../../../utils/ApiCall";
import { Loading } from "../../Index";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AdministratorsFormField } from "../../../static/AdministratorsFormField";

const AdminAdministratorAdd = () => {
    const [loading, setLoading] = useState(false);
    const [filename, setFilename] = useState("");

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();
    const [file,setFile] = useState<File | null>()
    const submit = async (data: any) => {

        data = { ...data, image: file };
        setLoading(true);
        const res = await apiCall("/api/v1/administrators/add", "post", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .catch((err) => {
               console.log(err);
               
            })
            .finally(() => setLoading(false));
        if (res) {
            setFilename("");
            reset();
            if (res.success) {
                toast.success("Successfully added an Administrator ❤️");
            }
        }
        console.log(res);
    };

    const handleFilename = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files;
        console.log(files);
        
        if (files && files.length > 0) {
          setFilename(files[0].name);
          setFile(files[0])
        } else {
          setFilename("");
        }
    }
    useEffect(() => {
        if (filename.length > 25) {
            setFilename(filename.slice(0, 25) + "....");
        }
    }, [filename]);

    return (
        <div>
            <form className="p-5" onSubmit={handleSubmit(submit)}>
                <div className="col-span-full">
                    <span>Profile image</span>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 flex-col sm:flex-row">
                                <label
                                    htmlFor="image"
                                    className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    {filename ? (
                                        <p>{filename}</p>
                                    ) : (
                                        <span>Upload a file</span>
                                    )}
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="hidden cursor-pointer"
                                        onChange={handleFilename}
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
                            {AdministratorsFormField.map((field) => (
                                <div key={field.name} className="sm:col-span-3">
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        {field.label}
                                    </label>
                                    <div className="mt-2">
                                        {field.type === "select" ? (
                                            <select
                                                {...register(
                                                    field.name,
                                                    field.validation
                                                )}
                                                id={field.name}
                                                autoComplete={
                                                    field.autoComplete
                                                }
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                {field.options?.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                {...register(
                                                    field.name,
                                                    field.validation
                                                )}
                                                type={field.type}
                                                id={field.name}
                                                autoComplete={
                                                    field.autoComplete
                                                }
                                                placeholder={field.placeholder}
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        )}
                                        {errors[field.name] && (
                                            <p className="text-red-600 text-sm">
                                                {
                                                    errors[field.name]
                                                        ?.message as string
                                                }
                                            </p>
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

export default AdminAdministratorAdd;
