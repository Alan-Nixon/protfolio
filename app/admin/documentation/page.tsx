"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDocumentation } from "@/interfaces_types/interfaces_types";
import { motion } from "framer-motion";
import { ChevronRight, PencilIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  addDocument,
  deleteDocument,
  getDocument,
  updateDocument,
} from "../(functions)/functions";
import toast from "react-hot-toast";

const emptyDoc = { _id: "", title: "", description: "", image: "", url: "" };

function Documentation() {
  const [formData, setFormData] = useState<IDocumentation>(emptyDoc);
  const [documentations, setDocumentations] = useState<IDocumentation[]>([]);
  const [errors, setErrors] = useState(emptyDoc);
  const [isUpdate, setIsUpdate] = useState(false);

  const getSetDoc = () => {
    getDocument().then(({ data }) => {
      setDocumentations(data);
    });
  };
  useEffect(() => {
    getSetDoc();
  }, []);

  const validate = () => {
    let valid = true;
    const newErrors = {
      _id: "",
      title: "",
      description: "",
      url: "",
      image: "",
    };

    if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
      valid = false;
    }

    if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      valid = false;
    }

    if (!formData.image) {
      newErrors.image = "Please select an image";
      valid = false;
    }
    console.log(formData);
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.url)) {
      newErrors.url = "Enter a valid URL";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(emptyDoc);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (isUpdate) {
        updateDocument(formData).then(() => {
          toast.success("Documentation updated successfully");
        });
      } else {
        addDocument(formData).then(() => {
          toast.success("Documentation added successfully");
        });
        setFormData(emptyDoc);
        getSetDoc();
        setIsUpdate(false);
      }
    }
  };

  const handleEdit = (doc: IDocumentation) => {
    setIsUpdate(true);
    setFormData(doc);
  };

  const handleDelete = (docId: string) => {
    deleteDocument(docId).then(() => {
      toast.success("Documentation deleted successfully");
      getSetDoc();
    });
  };

  return (
    <div>
      <Card className="mx-auto mt-10 p-6">
        <CardHeader>
          <CardTitle className="text-center">Submit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Link</label>
              <Input
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                type="url"
              />
              {errors.url && (
                <p className="text-red-500 text-sm">{errors.url}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              {formData.image && (
                <Image
                  src={formData.image}
                  alt="image"
                  width={100}
                  height={100}
                />
              )}
              <br />
              <Input name="image" onChange={handleImage} type="file" />
              {errors.url && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-6 py-5">
        {documentations.map((doc, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <p className="flex flex-col md:flex-row">
              <div className="flex-grow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                  {doc.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {doc.description}
                </p>
                <div className="flex space-x-2">
                  <PencilIcon size={20} onClick={() => handleEdit(doc)} />{" "}
                  <Trash2 size={20} onClick={() => handleDelete(doc._id)} />
                </div>
                <br />
                <a href={doc.url} target="_blank">
                  <div className="flex items-center text-emerald-600 font-medium">
                    Read more <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </a>
              </div>
              <div className="relative w-full md:w-48 h-32 md:h-auto">
                <Image
                  src={doc.image || "/placeholder.svg"}
                  alt={doc.title}
                  fill
                  className="object-cover"
                />
              </div>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Documentation;
