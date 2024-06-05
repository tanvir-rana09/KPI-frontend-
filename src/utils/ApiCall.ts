import axios, { AxiosRequestConfig } from 'axios';

const apiCall = async (
    endpoint: string,
    method: string,
    data?: any,
    config?: AxiosRequestConfig
) => {
    try {
        const response = await axios({
            url: endpoint,
            method: method,
            data: data || null,
            withCredentials: true,
            ...config, // Merge additional config options
        });

        return response.data; // Return only the response data
    } catch (error) {
        // Handle errors here (e.g., log or throw)
        console.error('API call error:', error);
        throw error; // Re-throw the error for further handling
    }
};

export default apiCall;











// import axios from "axios";
// import { FormType } from "../types/FormType";

// const apiCall = async (endpoint: string, method: string, data?: any,config?:any={}) => {


//     const response = await axios({
//         url: endpoint,
//         method: method,
//         data: data || null,
//         withCredentials:true,
//         headers: {'Content-Type': 'multipart/form-data'}
//     });

//     return response;
	
//     // try {
//     //     const response = await axios({
//     //         url: endpoint,
//     //         method: method,
//     //         data: data || null,
//     //         withCredentials:true
//     //     });
        
//     //     return response;
//     // } catch (error) {
//     //     console.log(error);
//     // }
// };

// export default apiCall;
