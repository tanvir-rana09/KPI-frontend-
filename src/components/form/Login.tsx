import { useForm } from "react-hook-form";
import { Button, FormHeading, Formsidebar, Input, Loading } from "../Index";
import { FormType } from "../../types/FormType";
import apiCall from "../../utils/ApiCall";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import png from "../../images/college campus-pana.png";
import { useDispatch } from "react-redux";
import { setAuthStatus, setUserDetails } from "../../redux/projectSlice";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState({
        email: null,
        password: null,
    });
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormType>();

    const submit = async (data: FormType) => {
        setLoading(true);
        const res = await apiCall("/api/v1/user/login", "post", data) 
            .catch((err) => {
                if (err?.response) {
                    setError((prevError) => ({
                        ...prevError,
                        email: err?.response?.data?.email || null,
                        password: err?.response?.data?.password || null,
                    }));
                }
            })
            .finally(() => setLoading(false));
            
        if (res?.success) {
            
            dispatch(setUserDetails(res.data?.user));
            dispatch(setAuthStatus(true))
            navigate("/");
            toast.success("This is a toast notification !");
        }
        console.log(res);
    };

    return (
        <div className="w-full grid place-content-center h-screen sm:grid-cols-2 max-w-7xl mx-auto">
            <div className="mt-40 sm:mt-0">
            <Formsidebar img={png} />
            </div>
            <div className=" rounded-sm flex flex-col gap-8 bg-white p-3">
                <FormHeading />
                <h1 className="text-2xl border-b-2 w-20 pb-2">Login</h1>
                <form
                    className="w-full flex flex-col gap-3"
                    onSubmit={handleSubmit(submit)}
                >
                    <Input
                        control={control}
                        {...register("email", {
                            required: {
                                value: true,
                                message: "email is required",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                        type="email"
                        name="email"
                        placeholder="Enter Your email"
                        className="bg-white border-b py-3 text-xl"
                        errors={errors.email?.message || error.email}
                    />
                    <Input
                        className="bg-white border-b py-3 text-xl"
                        control={control}
                        placeholder="enter your password"
                        type="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            minLength: {
                                value: 7,
                                message: "min password length 7",
                            },
                        })}
                        name="password"
                        errors={errors.password?.message || error.password}
                    />
                    <div>
                        {loading ? (
                            <div className={`flex items-center justify-center bg-second text-white py-2 rounded-md shadow w-full mt-5`}>
                                <Loading />
                            </div>
                        ) : (
                            <div className="w-full">
                                <Button
                                    className=" text-white min-w-fullcursor-pointer mt-5"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                                <ToastContainer />
                            </div>
                        )}
                    </div>
                    <p className="mt-5">
                        Don't Have any Account ?
                        <Link
                            className="underline hover:text-second"
                            to={"/signup"}
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
