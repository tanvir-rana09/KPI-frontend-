import { useDispatch } from "react-redux";
import AntTable from "../../../components/antd/Table";
import Head from "./Head";
import { AppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import {
    fetchAllAdministratorsAsync,
    selectAllAdministrators,
} from "./redux/ReduxSlice";
import { useSelector } from "react-redux";
import { AdministratorColumn } from "../../../static/TableColumns";

const AdminAdministrators = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchAllAdministratorsAsync()).then((result) => {
            if (fetchAllAdministratorsAsync.fulfilled.match(result)) {
                console.log("Fetched students:", result.payload);
            } else if (fetchAllAdministratorsAsync.rejected.match(result)) {
                console.error("Failed to fetch students:", result.payload);
            }
        });
    }, [dispatch]);
    const administrators = useSelector(selectAllAdministrators);
    return (
        <div>
            <Head
                head="All Administrators"
                url="/dashboard/administrators/add"
            />
            <div>
                <AntTable
                    data={administrators}
                    antColumns={AdministratorColumn}
                />
            </div>
        </div>
    );
};

export default AdminAdministrators;
