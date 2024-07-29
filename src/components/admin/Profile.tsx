import { useEffect, useState } from "react";
import apiCall from "../../utils/ApiCall";
import profilePlaceholder from "../../images/profile.jpg";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/projectSlice";
import {Loading,Button} from "../Index";
import { FaSave } from "react-icons/fa";

const Profile = () => {
    const [avatar, setAvatar] = useState(null);
    const { handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(profilePlaceholder);
    const data = useSelector((state) => state.project.user);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProfile(data?.image || profilePlaceholder);
    }, [data?.image]);

    useEffect(() => {
        if (avatar) {
            const objectURL = URL.createObjectURL(avatar);
            setProfile(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        }
    }, [avatar]);

    const submit = async () => {

        
        if (!avatar) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("image", avatar);
        setLoading(true)
        try {
            const response = await apiCall(
                "/api/v1/user/update-profile",
                "post",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            ).finally(()=>setLoading(false));
            console.log(response);
            // assuming response contains the new image url
            if (response.data && response.data?.image) {
                setProfile(response.data.image);
                setAvatar(null);
                dispatch(setUserDetails(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fileHandle = (e:any) => {
        console.log(e.target.files);
        setAvatar(e.target.files[0]);
    };
    return (
        <div className="w-full">
            <div className="border-b-2 ">
                <div className="w-44 h-44 rounded-full overflow-hidden border-8 border-third">
                    <img
                        className="w-full h-full object-cover"
                        src={profile}
                        alt="profile"
                    />
                </div>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(submit)}
                    className="p-2 rounded-full cursor-pointer flex items-center bg"
                >
                    <label htmlFor="file">
                       
                        <input
                            type="file"
                            name="image"
                            id="file"
                            className="hidden cursor-pointer"
                            onChange={fileHandle}
                        />
                    {!avatar && (
                        <p className="flex items-center gap-1 bg-second text-white px-5 py-2 rounded-md shadow cursor-pointer">
                            <FiEdit /> Change Profile
                        </p>
                    )}
                </label>
                <div className="">
                    {avatar &&
                        (loading ? (
                            <div className="bg-second flex justify-center py-2 mt-2 rounded-md shadow-md">
                                <Loading />
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-second py-2 flex items-center mt-2 rounded-md shadow-md text-white gap-1 px-10"
                            ><FaSave />
                                Save
                            </Button>
                        ))}
                </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;

// import { useEffect, useState } from "react";
// import apiCall from "../../utils/ApiCall";
// import profilePlaceholder from "../../images/profile.jpg";
// import { useSelector } from "react-redux";
// import { FiEdit } from "react-icons/fi";
// import { useForm } from "react-hook-form";

// const Profile = () => {
//     const [avatar, setAvatar] = useState();
//     const { handleSubmit, register } = useForm();

//     const [profile, setProfile] = useState(profilePlaceholder);
//     const { data } = useSelector((state) => state.project.user);
//     useEffect(() => {
//         setProfile(data?.image || profilePlaceholder);
//     }, [data?.image]);

//     const submit = async () => {
//         try {
//             const response = await apiCall(
//                 "/api/v1/user/update-profile",
//                 "post",
//                 avatar
//             ).catch((error) => console.log(error));
//             console.log(avatar);

//             console.log(response);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // const submit = async () => {
//     //     try {
//     //         const response = await axios({
//     //             url: "/v1/user/update-profile",
//     //             method: "post",
//     //             data: avatar,
//     //             withCredentials: true,
//     //             headers: {'Content-Type': 'multipart/form-data'}
//     //         }).catch((error) => console.log(error));
//     //         console.log(response);
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     return (
//         <div>
//             <div className="relative">
//                 <div className="w-44 h-44 rounded-full overflow-hidden border-8 border-third">
//                     <img
//                         className="w-full h-full object-cover"
//                         src={profile}
//                         alt="profile"
//                     />
//                 </div>
//                 <form
//                     encType="multipart/form-data"
//                     onSubmit={handleSubmit(submit)}
//                     className="absolute bottom-0 right-10 bg-third p-2 rounded-full text-white cursor-pointer"
//                 >
//                     <label htmlFor="file">
//                         <FiEdit />
//                         <input
//                             // {...register("file", { required: true })}
//                             type="file"
//                             name="file"
//                             id="file"
//                             className="hidden cursor-pointer"
//                             onChange={(e) => setAvatar(e.target.value)}
//                         />
//                     </label>
//                     <button type="submit">save</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Profile;
