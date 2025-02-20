import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { X } from "lucide-react";

export default function PostPages() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(""); // Quill editor data

  // Handle single image upload
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]); // Store only one image
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false, // Allow only one image
  });

  // Function to format date to YYYY/MM/DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  };

  // Form submit function
  const onSubmit = async (data, event) => {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("date", formatDate(data.date));
    formData.append("category", data.category);
    formData.append("tags", data.tags);
    formData.append("content", description); // Store Quill description

    if (image) {
      formData.append("image", image); // Store only one image
    }

    try {
      const response = await fetch("http://localhost:5000/api/articles", {
        method: "POST", // Change to PUT if updating
        body: formData,
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 pl-20 md:pl-0">Create New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row mb-4">
          {/* Left column for Quill editor and image upload */}
          <div className="w-full lg:w-[65%] lg:shadow-md lg:p-2 2xl:p-4">
            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="title">
                Title
              </Label>
              <Input id="title" {...register("title", { required: true })} />
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium">Description</Label>
              <ReactQuill
                value={description} // Bind to description state
                onChange={setDescription} // Update description state
                className="bg-white border border-gray-300 rounded-md"
              />
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
            </div>
          </div>

          {/* Right column for metadata (author, date, category, tags) */}
          <div className="w-full lg:w-[35%] px-4">
            <div className="mb-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div>
                <Label className="mb-2 font-medium lg:mt-2 2xl:mt-4" htmlFor="author">
                  Author
                </Label>
                <Input id="author" {...register("author", { required: true })} />
              </div>
              <div>
                <Label className="mb-2 font-medium" htmlFor="date">
                  Post Date
                </Label>
                <Input id="date" type="date" {...register("date", { required: true })} />
              </div>
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="category">
                Category
              </Label>
              <Input id="category" {...register("category", { required: true })} />
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="tags">
                Tags (comma separated)
              </Label>
              <Input id="tags" {...register("tags", { required: true })} />
            </div>

            <div className="mb-4">
              <Label className="mb-2 font-medium" htmlFor="mainArticleUrl">
                Main Article URL
              </Label>
              <Input
                id="mainArticleUrl"
                {...register("mainArticleUrl", { required: true })}
              />
            </div>
          </div>
        </div>

        <Button type="submit">Publish Post</Button>
      </form>
    </div>
  );
}
