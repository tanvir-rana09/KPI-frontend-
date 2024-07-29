import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Head = ({head,url}:{head:string;url:string;}) => {
    return (
        <div className="pl-2">
            <div className="flex justify-between w-full border-b items-center">
                <h1 className="">{head}</h1>
                <Link
                    className="flex items-center gap-1 bg-second text-white px-2 duration-200  py-1 rounded-md my-2"
                    to={url}
                >
                    <IoIosAddCircleOutline />
                    Add New
                </Link>
            </div>
        </div>
    );
};

export default Head;
