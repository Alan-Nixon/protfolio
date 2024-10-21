import { IContact, sendReplyProps } from '@/interfaces_types/interfaces_types';
import axios from 'axios';


const userAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_URI
});


export const getUser = async () => {
    try {
        const { data } = await userAxiosInstance.get("/getUser");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getProjects = async () => {
    try {
        const { data } = await userAxiosInstance.get("/getProjects");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getSkills = async () => {
    try {
        const { data } = await userAxiosInstance.get("/getSkills");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getExperience = async () => {
    try {
        const { data } = await userAxiosInstance.get("/getExperience");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getEducation = async () => {
    try {
        const { data } = await userAxiosInstance.get("/getEducation");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getOpenSource = async () => {
    try {
        const { data } = await userAxiosInstance.get("/getOpenSource");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getIntegratedApiSchema = async () => {
    try {
        const { data } = await userAxiosInstance.get("/getIntegratedApiSchema");
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
};

export const getMessages = async () => {
    try {
        const { data } = await userAxiosInstance.get("/submitContact");
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "" }
    }
}


export const submitContact = async (contact: Omit<IContact, "_id" | "createdAt">) => {
    try {
        const { data } = await userAxiosInstance.post("/submitContact", contact)
        return data
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
}

export const sendReply = async (Data: sendReplyProps) => {
    try {
        const { data } = await userAxiosInstance.put("/submitContact", Data)
        return data
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
}