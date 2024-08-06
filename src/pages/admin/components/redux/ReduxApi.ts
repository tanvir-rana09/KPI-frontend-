import apiCall from "../../../../utils/ApiCall";

const fetchAllStudents = async () => {
    const response = await apiCall("/api/v1/students", "get");
    return response.data;
};
const fetchAllAdministrators = async () => {
    const response = await apiCall("/api/v1/administrators", "get");
    return response.data;
};

export { fetchAllStudents,fetchAllAdministrators };
