import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { X } from "lucide-react";
import { updateArticle } from "../../services/api";
import useFetchArticleById from "../../components/hooks/useFetchArticleById";
import ActionsLoader from "../../components/dashboardcomponents/ActionsLoader";
import useFetchMetadata from "../../components/hooks/useFetchMetadata";
import Select from "react-select";
import { useCallback } from "react";

import { set } from "react-hook-form";
export default function EditArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { article, loading, error } = useFetchArticleById(articleId);
  const [isBeingSubmitted, setIsBeingSubmitted] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState(""); // State to manage new category input
  const [isAddingNewTag, setIsAddingNewTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);
  const [tagsMapped, setMappedTags] = useState("");
  const [inputs, setInputs] = useState([]); // Array to manage multiple inputs, starting with one empty input

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    author: "",
    date: "", // Will store date and time (e.g., "2025-02-23T14:30")
    category: "",
    tags: "",
    mainArticleUrl: "",
    readTime: "",
    isFeatured: false, // Added isFeatured field
  });
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const {
    categories,
    tags,
    loading: metadataLoading,
    error: metadataError,
  } = useFetchMetadata();

  // Populate form with fetched article data
  useEffect(() => {
    if (article) {
      // Helper function to format ISO 8601 to datetime-local
      const formatForDateTimeLocal = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };
      console.log("date: ", article.date);
      setFormData({
        title: article.title || "",
        summary: article.summary || "summary..",
        author: article.author || "",
        date: article.date
          ? formatForDateTimeLocal(article.date) // Convert ISO 8601 to datetime-local format
          : getCurrentDateTime(),
        // date: article.date,
        // ? new Date(article.date).toISOString().slice(0, 16) // Format for datetime-local (YYYY-MM-DDTHH:MM)
        // : "",
        category: article.category || "",
        tags: article.tags || "",
        mainArticleUrl: article.mainArticleUrl || "",
        readTime: article.readTime
          ? article.readTime.match(/\d+/)?.[0] || ""
          : "",
        isFeatured: article.isFeatured || false, // Set isFeatured from article data
      });
      setDescription(article.description || "");
      setImage(
        article.thumbnail ? `http://localhost:5000${article.thumbnail}` : null
      );
      setTagsFilter(
        article.tags.map((tag) => {
          return { value: tag, label: tag };
        })
      );
    }
  }, [article]);

  const mapTagsWithComma = useCallback(() => {
    let allTags = [];

    // Add tags from Select
    if (tagsFilter.length > 0) {
      allTags = allTags.concat(tagsFilter.map((tag) => tag.value));
    }

    // Add tags from inputs
    allTags = allTags.concat(
      inputs.map((input) => input.value.trim()).filter(Boolean)
    );

    // Join all tags with commas
    const tags = allTags.join(",");
    setMappedTags(tags);
    setFormData((prev) => ({
      ...prev,
      tags: tags,
    }));
  }, [tagsFilter, inputs, setFormData]);

  useEffect(() => {
    mapTagsWithComma();
  }, [mapTagsWithComma]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
  };

  const handleInputBlur = (index) => {
    mapTagsWithComma(); // Update mapped tags when an input loses focus
  };

  const handleAddNewInput = () => {
    // Check if the last input is not empty
    if(inputs.length > 0) {
    const lastInput = inputs[inputs.length - 1];
    if (!lastInput.value.trim()) {
      return; // Do nothing if the last input is empty
    }
  }
    // Add a new empty input
    setInputs([...inputs, { value: "" }]);
  };
  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index); // Remove the input at the specified index
    setInputs(newInputs);
    mapTagsWithComma(); // Update mapped tags after removal
  };
  // Custom toolbar configuration
  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, false] }], // Only allow h2, h3, h4 (false disables h1)
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["blockquote", "code-block"], // Blockquote and code

      ["link"], // Link and image
      ["clean"], // Remove formatting button
    ],
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]); // Set as File object for new uploads
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  // Updated handleChange to handle checkbox

  const handleChange = (nameOrEvent, value) => {
    // If it's an event (from inputs, checkboxes, etc.)
    if (nameOrEvent && nameOrEvent.target) {
      const { name, value: val, type, checked } = nameOrEvent.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : val,
      }));
    } else {
      // If it's from react-select (name and value are passed separately)
      setFormData((prev) => ({
        ...prev,
        [nameOrEvent]: value !== null ? value.label || value : "", // For react-select, use label or value
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "isFeatured" && !formData[key]) {
        // Exclude isFeatured from required check
        newErrors[key] = `${key} is required`;
      }
    });
    if (!description) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image is required";
    if (formData.readTime && formData.readTime < 1)
      newErrors.readTime = "Read Time must be at least 1 min";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    // Convert the datetime-local value to ISO 8601 format
    const isoDate = formData.date
      ? new Date(formData.date).toISOString()
      : new Date().toISOString(); // Fallback to current time if no date

    const updatedFormData = {
      ...formData,
      date: isoDate, // Replace with ISO 8601 format
    };

    const postData = new FormData();
    Object.entries(updatedFormData).forEach(([key, value]) =>
      postData.append(key, value)
    );
    postData.append("description", description);
    if (image && image instanceof File) {
      postData.append("thumbnail", image); // Only append if it's a new File
    }

    try {
      setIsBeingSubmitted(true);
      const response = await updateArticle(articleId, postData);

      if (response && response.message) {
        // alert("Article updated successfully!");
        navigate("/dashboard/articles", {
          state: { message: "Article edited successfully!" },
        });
      } else {
        throw new Error("Failed to update the article.");
      }
    } catch (error) {
      setIsBeingSubmitted(false);
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading || isBeingSubmitted)
    return (
      <>
        {" "}
        {loading ? (
          <ActionsLoader loading={loading} />
        ) : (
          <ActionsLoader loading={isBeingSubmitted} />
        )}
      </>
    );
  if (error)
    return <div className="w-full p-6 mx-auto text-red-500">{error}</div>;

  return (
    <div className="w-full p-6 mx-auto">
      <h2 className="text-3xl font-bold mb-4 pl-20 md:pl-0">Edit Article</h2>
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
                modules={modules}
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
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image // URL from server
                    }
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
                  Date and Time
                </Label>
                <Input
                  id="date"
                  type="datetime-local" // Changed to datetime-local
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
              {metadataLoading ? (
                <p>Loading...</p>
              ) : metadataError ? (
                <p className="text-red-500">{metadataError}</p>
              ) : !isAddingNew ? ( // Only show Select if not adding new
                <Select
                  id="category"
                  name="category"
                  value={
                    categories.find(
                      (option) => option.label === formData.category
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    if (selectedOption && selectedOption.__isNew__) {
                      setIsAddingNew(true);
                      setNewCategory(""); // Reset new category input
                    } else {
                      handleChange(
                        "category",
                        selectedOption ? selectedOption.label : ""
                      );
                    }
                  }}
                  options={[
                    ...categories,
                    { value: "add-new", label: "Add New", __isNew__: true }, // Custom option for adding new
                  ]}
                  placeholder="Select a category "
                  isClearable
                  isSearchable
                  className="react-select-container z-40"
                  classNamePrefix="react-select"
                />
              ) : (
                <div className="mt-2 flex items-center space-x-2">
                  <Input
                    id="newCategory"
                    name="category"
                    value={newCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewCategory(value); // Update local state
                      handleChange("category", value); // Automatically save to formData as you type
                    }}
                    autoFocus
                    placeholder="Enter new category"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewCategory("");
                      handleChange("category", formData.category || ""); // Revert to previous value or empty
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div className="mb-4 ">
              <Label className="mb-2 font-medium" htmlFor="tags">
                Tags
              </Label>
              <div className="flex flex-col gap-4">
                <Select
                  id="tags"
                  name="tags"
                  isMulti
                  options={tags}
                  value={tagsFilter} // Make sure the format is [{ value, label }]
                  onChange={(selectedOptions) => {
                    setTagsFilter(selectedOptions || []);
                    console.log("selectedTags", selectedOptions);
                    mapTagsWithComma(); // Update mapped tags when selection changes
                  }}
                  placeholder="Select Tags"
                  className="w-full  z-30"
                  classNamePrefix="select"
                />

{inputs.map((input, index) => (
  <div key={index} className="mt-4 flex items-center gap-2">
    <Input
      value={input.value}
      placeholder={`New tag ${index + 1}`}
      onChange={(e) => handleInputChange(index, e.target.value)}
      onBlur={() => handleInputBlur(index)}
      onKeyPress={(e) => {
        if (e.key === "Enter") e.preventDefault(); // Prevent form submission on Enter
      }}
    />
    <button
      type="button"
      onClick={() => handleRemoveInput(index)}
      className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
      aria-label={`Remove tag ${index + 1}`}
    >
      <X size={16} />
    </button>
    {errors.tags && (
      <p className="text-red-500 text-sm">{errors.tags}</p>
    )}
  </div>
))}

                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent any form submission
                    handleAddNewInput();
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full xl:w-1/3"
                  disabled={
                    inputs.length > 0 && !inputs[inputs.length - 1].value.trim()
                  }
                >
                  Add New
                </button>
                {inputs.length > 0 &&
                  !inputs[inputs.length - 1].value.trim() && (
                    <span className="ml-2 text-red-500">
                      Fill input above to add more new tags 
                    </span>
                  )}

                {errors.tags && inputs.length === 0 && (
                  <p className="text-red-500 text-sm">{errors.tags}</p>
                )}
              </div>
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

            <div className="mb-4 flex items-center gap-2">
              <input
                id="isFeatured"
                name="isFeatured"
                type="checkbox"
                checked={formData.isFeatured} // Bind to boolean state
                onChange={handleChange}
              />
              <Label className="font-medium" htmlFor="isFeatured">
                Is Featured
              </Label>
              {errors.isFeatured && (
                <p className="text-red-500 text-sm">{errors.isFeatured}</p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit">Update Article</Button>
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
