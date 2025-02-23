import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { X } from "lucide-react";
import { uploadArticle } from "../../services/api";


export default function PostPages() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "summary..",
    author: "",
    date: "",
    category: "",
    tags: "",
    mainArticleUrl: "",
    readTime: "",
  });
  const resetForm = () => {
    setFormData({
      title: "",
      summary: "summary",
      author: "",
      date: "",
      category: "",
      tags: "",
      mainArticleUrl: "",
    });
    setDescription("");
    setImage(null);
    setErrors({});
  };
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

    // Check each formData field
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`; // Validate all fields
      }
    });

    // Validate description separately, as it's stored in a different state
    if (!description) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) return;
  
    console.log("Submitting data", formData, image);
  
    const postData = new FormData();
    Object.entries(formData).forEach(([key, value]) => postData.append(key, value));
    postData.append("description", description);
  
    // Use 'thumbnail' for the image field to match the backend
    if (image) postData.append("thumbnail", image);
  
    try {
      // Call the uploadArticle function and pass the FormData and image
      const response = await uploadArticle(postData);
  
      // Check for success or failure based on the response
      if (response && response.message) {
        console.log("Success:", response);
        resetForm(); // Reset the form after successful upload
        alert("Article uploaded successfully!");
      } else {
        throw new Error("Failed to upload the article.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="w-full p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 pl-20 md:pl-0">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row mb-4">
          <div className="w-full lg:w-[65%] lg:shadow-md lg:p-2 2xl:p-4">
            <div className="mb-4">
              <Label htmlFor="title" className="mb-2 font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium">Description</Label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                className="bg-white border border-gray-300 rounded-md react-quill-editor"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium">Image</Label>
              <div
                {...getRootProps()}
                className="border-dashed border-2 p-4 text-center cursor-pointer"
              >
                <input {...getInputProps()} />

                <p>Drag & drop an image here, or click to select a file</p>
              </div>
              {image && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[35%] px-4">
            <div className="mb-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div>
                <Label className="mb-2 font-medium" htmlFor="author">
                  Author
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">{errors.author}</p>
                )}
              </div>
              <div>
                <Label className="mb-2 font-medium" htmlFor="date">
                  Post Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="category">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="tags">
                Tags
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
              {errors.tags && (
                <p className="text-red-500 text-sm">{errors.tags}</p>
              )}
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="mainArticleUrl">
                Main Article URL
              </Label>
              <Input
                id="mainArticleUrl"
                name="mainArticleUrl"
                value={formData.mainArticleUrl}
                onChange={handleChange}
              />
              {errors.mainArticleUrl && (
                <p className="text-red-500 text-sm">{errors.mainArticleUrl}</p>
              )}
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="readTime">
                Read Time (in minutes)
              </Label>
              <Input
                id="readTime"
                name="readTime"
                type="number"
                value={formData.readTime}
                onChange={handleChange}
              />
              {errors.readTime && (
                <p className="text-red-500 text-sm">{errors.readTime}</p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit">Publish Post</Button>
      </form>
      <style>{`
        .react-quill-editor .ql-editor {
          height: 100px;
        }

        @media (min-width: 640px) {
          .react-quill-editor .ql-editor {
            height: 200px;
          }
        }

        @media (min-width: 1024px) {
          .react-quill-editor .ql-editor {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
}
