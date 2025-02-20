import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { X } from "lucide-react";

export default function PostPages() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    category: "",
    tags: "",
    mainArticleUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = `${key} is required`;
    });
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const postData = new FormData();
    Object.entries(formData).forEach(([key, value]) => postData.append(key, value));
    postData.append("content", description);
    if (image) postData.append("image", image);

    try {
      const response = await fetch("https://webhook.site/c881d196-629b-4e54-8444-4b56bb4314b9", {
        method: "POST",
        body: postData,
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <Label>Description</Label>
          <ReactQuill value={description} onChange={setDescription} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <Label>Image</Label>
          <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select a file</p>
          </div>
          {image && (
            <div className="relative mt-2">
              <img src={URL.createObjectURL(image)} alt="Preview" className="w-40 h-40 object-cover rounded" />
              <button type="button" onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" value={formData.author} onChange={handleChange} />
          {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="date">Post Date</Label>
          <Input id="date" type="date" name="date" value={formData.date} onChange={handleChange} />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" value={formData.category} onChange={handleChange} />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="mainArticleUrl">Main Article URL</Label>
          <Input id="mainArticleUrl" name="mainArticleUrl" value={formData.mainArticleUrl} onChange={handleChange} />
          {errors.mainArticleUrl && <p className="text-red-500 text-sm">{errors.mainArticleUrl}</p>}
        </div>

        <Button type="submit">Publish Post</Button>
      </form>
    </div>
  );
}