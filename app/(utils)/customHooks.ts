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

export const textBio = [
  "Welcome", "to", "my", "portfolio!", "I'm", "a", "dedicated", "full-stack", 
  "developer", "with", "a", "passion", "for", "creating", "innovative", "and", 
  "efficient", "solutions.", "With", "years", "of", "experience", "in", "both", 
  "front-end", "and", "back-end", "technologies,", "I", "strive", "to", "build", 
  "seamless,", "user-friendly", "applications", "that", "make", "a", "difference.", 
  "My", "journey", "in", "tech", "has", "been", "driven", "by", "curiosity", 
  "and", "a", "constant", "desire", "to", "learn", "and", "grow.", "I'm", 
  "excited", "to", "share", "my", "work", "with", "you", "and", "potentially", 
  "collaborate", "on", "future", "projects!"
]
