import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { X } from "lucide-react";
import { uploadArticle, fetchArticleById } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom"; // for fetching id from URL and navigation

export default function EditArticlePage() {
  const { articleId } = useParams(); // Get the article ID from the URL
  const navigate = useNavigate(); // To navigate after successful update
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
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  // Fetch article data when the component is mounted or the ID changes
  useEffect(() => {
    console.log("edit page", articleId);
    const fetchArticle = async () => {
      try {
        const articleData = await fetchArticleById(articleId); // Fetch the article by ID
        if (articleData) {
          setFormData({
            title: articleData.title,
            summary: articleData.summary,
            author: articleData.author,
            date: articleData.date,
            category: articleData.category,
            tags: articleData.tags.join(", "), // Assuming tags is an array
            mainArticleUrl: articleData.mainArticleUrl,
            readTime: articleData.readTime.replace(/\D/g, ""), // Extract only the number
          });
          setDescription(articleData.description);
          setImage(articleData.thumbnail); // Store the image URL directly
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        alert("Failed to fetch article data.");
      }
    };
    fetchArticle();
  }, [articleId]);

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
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (!description) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const postData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      postData.append(key, value)
    );
    postData.append("description", description);

    if (image) postData.append("thumbnail", image);

    try {
      const response = await uploadArticle(postData);
      if (response && response.message) {
        console.log("Success:", response);
        resetForm();
        alert("Article updated successfully!");
        navigate("/dashboard"); // Redirect to the dashboard or wherever needed
      } else {
        throw new Error("Failed to update the article.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Edit Article
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="summary">Summary</Label>
          <Input
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., tech, programming"
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            placeholder="Write the article description..."
            required
          />
        </div>

        <div className="mb-4">
          <Label>Thumbnail</Label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {console.log(image)}
            {image ? (
              <div className="relative">
                <img
                  src={
                    typeof image === "string"
                      ?  image.startsWith("/")
                        ? image
                        : `http://localhost:5000${image}` // Adjust the backend URL if needed
                      : image instanceof File
                      ? URL.createObjectURL(image)
                      : null
                  }
                  alt="Selected"
                  className="max-w-full h-48 object-cover mb-4"
                />

                <X
                  size={20}
                  className="absolute top-0 right-0 p-1 bg-white rounded-full cursor-pointer"
                  onClick={() => setImage(null)}
                />
              </div>
            ) : (
              <p>Drag and drop an image or click to select one</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="readTime">Read Time (in minutes)</Label>
          <Input
            id="readTime"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            type="number"
            required
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
