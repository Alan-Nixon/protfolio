import { useEffect, useState } from "react";
import { IProject, IUser } from "../interfaces_types/interfaces_types";

export const useUser = () => {
  const [user, setUser] = useState<IUser>({
    bio: "", githubLink: "", gitlabLink: "",
    description: "", linkedInLink: "",
    instaLink: "", Email: "", stackLink: "",
    name: "", profileImage: "", npmLink: ""
  });

  useEffect(() => {
    (async () => {
      const user: IUser = {
        name: "Alan Nixon",
        Email: "alannixon2520@gmail.com",
        githubLink: "https://github.com/Alan-Nixon",
        linkedInLink: "https://www.linkedin.com/in/alannixon2520",
        instaLink: "https://www.instagram.com/_alan_nixon/",
        stackLink: "https://stackoverflow.com/users/22199465/alan-nixon",
        gitlabLink: "https://gitlab.com/alan-nixon",
        npmLink: "https://www.npmjs.com/~alan-nixon",
        profileImage: "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729070240/protfolio/WhatsApp_Image_2024-10-16_at_2.34.28_PM_scrhai.jpg",
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

const data: IProject[] = [...Array(6).fill({
  _id: "123",
  githubLink: "https://github.com/Alan-Nixon/Av_Shopping",
  link: "https://avproductions.site/",
  projectImage: "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729076570/protfolio/Screenshot_from_2024-10-16_16-05-10_oksgyt.png",
  Title: "Av shops",
  description: "The project is an E-Commerce you know",
  images: [
    "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729099260/protfolio/4c412c90-a30e-419a-997c-1ec08036b0a4.png",
    "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729099374/protfolio/f001ca06-39ca-4bb2-befa-76c6a544af58.png",
    "https://res.cloudinary.com/dyh7c1wtm/image/upload/v1729099481/protfolio/e9dee99d-9068-477a-87aa-daa7c144a14d.png"
  ],
  technologies: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redux",
    "Stripe API",
  ], videoUrl: "https://res.cloudinary.com/dyh7c1wtm/video/upload/v1729144288/protfolio/ecommerceProject_flv2dr.mp4"
})]

export const useProject = () => {
  const [project, setProject] = useState<IProject[]>([])
  useEffect(() => {
    setProject(data)
  }, [])
  return { project, setProject }
} 