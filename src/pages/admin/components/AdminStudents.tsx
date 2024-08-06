import { useEffect } from "react";
import Head from "./Head";
import { fetchAllStudentsAsync, selectAllStudents } from "./redux/ReduxSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import AntTable from "../../../components/antd/Table";
import { useSelector } from "react-redux";
import {StudentsColumns} from "../../../static/TableColumns";

const AdminStudents = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        console.log("hi");

        dispatch(fetchAllStudentsAsync()).then((result) => {
            if (fetchAllStudentsAsync.fulfilled.match(result)) {
                console.log("Fetched students:", result.payload);
            } else if (fetchAllStudentsAsync.rejected.match(result)) {
                console.error("Failed to fetch students:", result.payload);
            }
        });
    }, [dispatch]);
    const students = useSelector(selectAllStudents)
    return (
        <div>
            <div>
                <Head head="All Students" url="/dashboard/students/add" />
            </div>
            <div>
                <AntTable data={students} antColumns={StudentsColumns} />
            </div>
        </div>
    );
};

export default AdminStudents;
