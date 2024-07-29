import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Head from "./Head";

const AdminNotice = () => {
    return (
        <div>
            <Head
                head="All Notices"
                url="/dashboard/notice/add"
            />
        </div>
    );
};

export default AdminNotice;
