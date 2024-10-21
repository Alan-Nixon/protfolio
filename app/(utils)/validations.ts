import { IIntegratedApi, IProject, ISkill, IUser } from "@/interfaces_types/interfaces_types";
import { Dispatch, SetStateAction } from "react";
import {
  validateEmail,
  validateName,
  validateURL,
} from "react-values-validator";


const validateDescription = (desc: string) => {
  const trimmedDesc = desc.trim();
  const hasThreeAlphabeticChars = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(trimmedDesc);
  const hasMoreThanThreeWords = trimmedDesc.split(/\s+/).length > 3;
  return hasThreeAlphabeticChars && hasMoreThanThreeWords;
};




export const profileValidations = (profile: IUser, setError: Dispatch<SetStateAction<string>>) => {
  if (!validateName(profile.name)) {
    setError("Enter a valid Name");
    return false;
  }
  if (!validateEmail(profile.Email)) {
    setError("Enter a valid Email");
    return false;
  }
  if (!validateDescription(profile.description)) {
    setError("Enter a valid Description");
    return false;
  }
  if (!validateDescription(profile.bio)) {
    setError("Enter a valid Bio");
    return false;
  }
  if (!validateURL(profile.githubLink)) {
    setError("Enter a valid Github link");
    return false;
  }
  if (!validateURL(profile.linkedInLink)) {
    setError("Enter a valid Linkedin");
    return false;
  }
  if (!validateURL(profile.instaLink)) {
    setError("Enter a valid insta Link");
    return false;
  }
  if (!validateURL(profile.stackLink)) {
    setError("Enter a valid Stack overflow link");
    return false;
  }
  if (!validateURL(profile.gitlabLink)) {
    setError("Enter a valid git lab link");
    return false;
  }
  if (!validateURL(profile.npmLink)) {
    setError("Enter a valid npm link");
    return false;
  }
  return true;
};

const validateShaImage = (str: string) => {
  return str.startsWith("data:") || validateURL(str)
}

export function validationProject(project: Omit<IProject, "_id"> | IProject, setError: Dispatch<SetStateAction<string>>) {
  if (!validateName(project.Title)) {
    setError("Please Enter a valid title")
    return false
  }
  if (!validateDescription(project.description)) {
    setError("Please Enter a valid description")
    return false
  }
  if (!validateURL(project.link)) {
    setError("Please Enter a live link")
    return false
  }
  if (!validateURL(project.githubLink)) {
    setError("Please Enter a github link")
    return false
  }
  if (!validateShaImage(project.videoUrl)) {
    setError("You need a video for your project")
    return false
  }
  if (project.technologies.length === 0) {
    setError("Please add minimum one technology")
    return false
  }
  if (!validateShaImage(project.projectImage)) {
    setError("Please select minimum one profileImage")
    return false
  }
  if (project.images.length === 0) {
    setError("Please select minimum one sub image")
    return false
  }

  return true
}

export function validationSkill(skill: Omit<ISkill, "_id">, setError: Dispatch<SetStateAction<string>>) {
  if (!validateName(skill.title)) {
    setError("Enter a valid skill title")
    return false
  }
  if (skill.icon.trim().length < 1) {
    setError("Enter a valid icon name")
    return false
  }
  if (skill.skill.trim().length < 1) {
    setError("Enter a valid skill")
    return false
  }
  return true
}



export function validationApi(Api: IIntegratedApi, setError: Dispatch<SetStateAction<string>>) {
  if (!validateName(Api.Title)) {
    setError("Enter a valid Api title")
    return false
  }
  if (!validateDescription(Api.Description)) {
    setError("Enter a valid description")
    return false
  }
  if (!validateURL(Api.Docs)) {
    setError("Enter a valid url to the doc")
    return false
  }
  return true
}