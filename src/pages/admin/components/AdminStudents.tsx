import { Link } from "react-router-dom";

const AdminStudents = () => {
    return (
        <div>
            <div className="flex justify-between w-full border-b">
                <h1>All Students</h1>
                <Link to="/dashboard/students/add">Add</Link>
            </div>
        </div>
    );
};

export default AdminStudents;
