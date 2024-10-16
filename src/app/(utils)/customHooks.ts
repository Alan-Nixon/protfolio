import { useEffect, useState } from "react";
import { IUser } from "../interfaces_types/interfaces_types";

export const useUser = () => {
  const [user, setUser] = useState<IUser>({
    bio: "", githubLink: "",gitlabLink:"",
    description: "", linkedInLink: "",
    instaLink: "", Email: "",stackLink:"",
    name: "", profileImage: "",npmLink:""
  });

  useEffect(() => {
    (async () => {
      const user: IUser = {
        name: "Alan Nixon",
        Email: "alannixon2520@gmail.com",
        githubLink: "https://github.com/Alan-Nixon",
        linkedInLink: "https://www.linkedin.com/in/alannixon2520",
        instaLink: "https://www.instagram.com/_alan_nixon/",
        stackLink:"https://stackoverflow.com/users/22199465/alan-nixon",
        gitlabLink:"https://gitlab.com/alan-nixon",
        npmLink:"https://www.npmjs.com/~alan-nixon",
        profileImage:
          "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729070240/WhatsApp_Image_2024-10-16_at_2.34.28_PM_scrhai.jpg",
        bio: "A passionate full-stack developer crafting digital experiences",
        description: `Welcome to my portfolio! I'm a dedicated full-stack developer with a
                passion for creating innovative and efficient solutions. With years of
                experience in both front-end and back-end technologies, I strive to
                build seamless, user-friendly applications that make a difference. My
                journey in tech has been driven by curiosity and a constant desire to
                learn and grow. I'm excited to share my work with you and potentially
                collaborate on future projects!`,
      };
      
      setUser(user);
    })();
  }, []);

  return { user, setUser };
};