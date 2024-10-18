import { useEffect, useState } from "react";
import { IUser } from "../../interfaces_types/interfaces_types";
import { getUser } from './functions'

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

