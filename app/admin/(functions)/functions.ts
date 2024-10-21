import axios from 'axios';
import { IIntegratedApi, ILoginCred, IProject, ISkill, IUser } from '../../../interfaces_types/interfaces_types';


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

export const addSkill = async (skill: Omit<ISkill, "_id">) => {
    try {
        const { data } = await adminAxiosInstance.post("/skill", skill);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", data: null }
    }
}

export const updateSkill = async (skill: ISkill) => {
    try {
        const { data } = await adminAxiosInstance.put("/skill", skill);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", data: null }
    }
}

export const deleteSkill = async (skillId: string) => {
    try {
        const { data } = await adminAxiosInstance.delete("/skill?skillId=" + skillId);
        return data;
    } catch (e) {
        console.error("Error during login request:", e);
        return { status: false, message: e + "", data: null }
    }
}

export const addAPI = async (Api: IIntegratedApi) => {
    try {
        const { Title, Description, Docs } = Api
        const { data } = await adminAxiosInstance.post("/integratedApi", { Title, Description, Docs });
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
}

export const updateApi = async (Api: IIntegratedApi) => {
    try {
        const { data } = await adminAxiosInstance.put("/integratedApi", Api);
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
}

export const deleteApi = async (apiId: string) => {
    try {
        const { data } = await adminAxiosInstance.delete("/integratedApi?apiId=" + apiId);
        return data;
    } catch (e) {
        console.error("Error during getUser request:", e);
        return { status: false, message: e + "" }
    }
}