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

export const getSkills = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/getSkills");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getExperience = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/getExperience");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getEducation = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/getEducation");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getOpenSource = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/getOpenSource");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getIntegratedApiSchema = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/getIntegratedApiSchema");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};
