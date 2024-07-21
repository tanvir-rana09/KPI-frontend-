import { Link } from "react-router-dom";

const Adminphotos = () => {
    return (
        <div>
            <div className="flex justify-between w-full border-b">
                <h1>All Photo's</h1>
                <Link to="/dashboard/photos/add">Add</Link>
            </div>
           
        </div>
    );
};

export default Adminphotos;
