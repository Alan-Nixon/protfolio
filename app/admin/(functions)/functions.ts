import axios from 'axios';
import { ILoginCred, IProject, IUser } from '../../../interfaces_types/interfaces_types';


const adminAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_URI
});


export const adminPostLogin = async (body: ILoginCred) => {
    try {
        const { data } = await adminAxiosInstance.post("/login", body);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "" }
    }
};

export const getProfileDetails = async () => {
    try {
        const { data } = await adminAxiosInstance.get("/profile");
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", daata: null }
    }
}

export const changeProfile = async (user: IUser) => {
    try {
        const { data } = await adminAxiosInstance.patch("/profile", user);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", data: null }
    }
}

export const AddProject = async (newProject: Omit<IProject, "_id">) => {
    try {
        const { data } = await adminAxiosInstance.post("/project", newProject);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", data: null }
    }
}

export const updateProject = async (project: IProject) => {
    try {
        const { data } = await adminAxiosInstance.put("/project", project);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", data: null }
    }
}

export const deleteProject = async (projectId: string) => {
    try {
        const { data } = await adminAxiosInstance.delete("/project?projectId=" + projectId);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", data: null }
    }
}