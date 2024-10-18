import axios from 'axios';


const adminAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_URI
});


export const getUser = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/getUser");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getProjects = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/getProjects");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

