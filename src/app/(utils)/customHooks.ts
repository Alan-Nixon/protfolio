import { useEffect, useState } from "react";
import { IUser, IuseProjects } from "../interfaces_types/interfaces_types";
import { getUser, getProjects } from './functions'

export const useUser = () => {
  const [user, setUser] = useState<IUser>({
    bio: "", githubLink: "", gitlabLink: "",
    description: "", linkedInLink: "",
    instaLink: "", Email: "", stackLink: "",
    name: "", profileImage: "", npmLink: ""
  });

  useEffect(() => {
    getUser().then(response => {
      setUser(response.data)
    });
  }, []);

  return { user, setUser };
};

export const useProject = () => {
  const [project, setProject] = useState<IuseProjects>({ mainProjects: [], miniProjects: [] })
  useEffect(() => {
    getProjects().then(res => {
      setProject({
        mainProjects: res.data.mainProjects ?? [],
        miniProjects: res.data.miniProjects ?? []
      })
    })
  }, [])
  return { project, setProject }
} 