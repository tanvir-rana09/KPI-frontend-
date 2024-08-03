import { useEffect, useState } from "react";
import profilePlaceholder from "../../images/profile.jpg";
import { useSelector,useDispatch } from "react-redux";
import { Button, Loading, Logout } from "../Index";
import { useForm } from "react-hook-form";
import apiCall from "../../utils/ApiCall";
import { setUserDetails } from "../../redux/projectSlice";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

interface ProfileProps {
    sidebar: boolean;
    setSidebar: (value: boolean) => void;
}

export const Profile = ({ sidebar, setSidebar }: ProfileProps) => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit } = useForm();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [profile, setProfile] = useState(profilePlaceholder);
    const { user } = useSelector((state: any) => state.project);
    const dispatch = useDispatch();

    useEffect(() => {
        setProfile(user?.image || profilePlaceholder);
    }, [user?.image]);

    useEffect(() => {
        if (avatar) {
            const objectURL = URL.createObjectURL(avatar);
            setProfile(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        }
    }, [avatar]);

    const submit = async () => {
        if (!avatar) {
            console.log("File not found");
            return;
        }

        const formData = new FormData();
        formData.append("image", avatar);

        try {
            setLoading(true);
            const response = await apiCall(
                "/api/v1/user/update-profile",
                "post",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            ).finally(() => {
                setLoading(false);
                setAvatar(null);
            });
            if (response?.data && response?.data?.image) {
                setProfile(response?.data?.image);
                dispatch(setUserDetails(response?.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white p-2 h-screen w-[20rem] shadow relative">
            <button
                onClick={() => setSidebar(!sidebar)}
                className="p-2 bg-slate-200 w-[41px] h-[41px] flex items-center justify-center rounded-full shadow-slate-300 shadow-inner"
            >
                <RxCross1 size={15} />
            </button>
            <div className="rounded-lg overflow-hidden mb-2 w-[15rem] h-[15rem] mx-auto">
                <img
                    src={profile}
                    alt="profile"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex items-center flex-col w-full gap-1">
                <h1 className="text-4xl font-semibold font-extendfont9">
                    {user?.name}
                </h1>
                <h2>{user?._id}</h2>
                <h3>{user?.email}</h3>
            </div>
            <form
                className="w-full"
                onSubmit={handleSubmit(submit)}
            >
                <label
                    className={`bg-second py-2 flex mt-2 rounded-md shadow-md w-full ${
                        avatar ? "hidden" : ""
                    }`}
                    htmlFor="image"
                >
                    <input
                        className="hidden"
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                    {!avatar && (
                        <p className="w-full cursor-pointer flex items-center justify-center gap-2 text-white">
                            <FiEdit /> Change Profile
                        </p>
                    )}
                </label>
                <div>
                    {avatar &&
                        (loading ? (
                            <div className="bg-second flex justify-center py-2 text-white mt-2 rounded-md shadow-md">
                                <Loading />
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-second py-2 text-white mt-2 rounded-md shadow-md"
                            >
                                Save
                            </Button>
                        ))}
                </div>
            </form>
            <div>
                <Logout setSidebar={setSidebar} />
            </div>
        </div>
    );
};
