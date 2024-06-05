import { Input, Button, Formsidebar, FormHeading } from "../Index.ts";
import { useForm } from "react-hook-form";
import { FormType } from "../../types/FormType.ts";
import apiCall from "../../utils/ApiCall.ts";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading.tsx";
import { useState } from "react";
import png from "../../images/college students-rafiki (1).png";


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormType>();

    const submit = async (data: FormType) => {
        setLoading(true);
        const res = await apiCall("/api/v1/user/signup", "post", data)
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
console.log(res);

            if (res?.success) {
                navigate("/login")
            }
    };

    return (
        <div className="w-full grid place-content-center h-screen grid-cols-2 max-w-7xl mx-auto">
            <Formsidebar img={png} />
            <div className=" rounded-sm flex flex-col gap-8 bg-white p-3">
                <FormHeading/>
                <h1 className="text-2xl border-b-2 w-20 pb-2">Signup</h1>
                <form
                    className="w-full flex flex-col gap-3"
                    onSubmit={handleSubmit(submit)}
                >
                    <Input
                        control={control}
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required",
                            },
                        })}
                        type="text"
                        name="name"
                        placeholder="Enter Your Full Name"
                        className="bg-white border-b py-3 text-xl"
                        errors={errors.name?.message}
                    />

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
                        errors={errors.email?.message}
                    />
                    <Input
                        control={control}
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
                        type="password"
                        name="password"
                        placeholder="Enter Your password"
                        className="bg-white border-b py-3 text-xl"
                        errors={errors.password?.message}
                    />

                    <div className="bg-second py-2 mt-5 flex justify-center">
                        {loading ? (
                            <Loading />
                        ) : (
                            <Button className=" text-white w-full" type="submit">
                                Submit
                            </Button>
                        )}
                    </div>
                </form>
                <p>
                    Do you have any Account ?{" "}
                    <Link className="underline hover:text-second" to={"/login"}>
                        Login
                    </Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default Register;
