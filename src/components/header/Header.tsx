import { useForm } from "react-hook-form";
import { Input, Navbar } from "../Index";
import { GrSearch } from "react-icons/gr";
import { useEffect, useState } from "react";

export interface Search {
    search: string;
}

const Header = () => {
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<Search>();

    const submit = (data: Search) => {
        console.log(data);
    };
    const [fixedNav, setFixedNav] = useState(false)

    useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 300) {
				setFixedNav(true)
			} else {
				setFixedNav(false)
			}
		})
	}, [])
    
    return (
        
        <div className={`border-b bg-white z-50 fixed right-0 left-0 ${fixedNav ? ' top-0 ' : 'top-0'}`}>
            <div className="w-full max-w-7xl mx-auto">
                <div>
                    <Navbar />
                </div>
                <div className="flex items-center justify-between py-3 px-3 gap-5 flex-col sm:flex-row">
                    <h1 className="sm:font-semibold">
                        Kushtia Polytechnic Institute - CST
                    </h1>
                    <form
                        className="bg-white pr-4 items-center shadow-lg rounded-full overflow-hidden flex justify-between border grow"
                        onSubmit={handleSubmit(submit)}
                    >
                        <div className="w-full">
                            <Input
                                {...register("search", {
                                    required: {
                                        value: true,
                                        message: "write somthing to search",
                                    },
                                })}
                                placeholder="Search Anything here..."
                                className="grow bg-white min-w-full"
                                control={control}
                                errors={errors.search?.message}
                                name="search"
                                type="search"
                            />
                        </div>
                        <div>
                            <span>
                                <GrSearch />
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Header;
