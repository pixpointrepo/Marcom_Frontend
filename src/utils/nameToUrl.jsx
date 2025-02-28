// To convert a name to a URL, example: "Breaking News" to "breaking-news"

const nameToUrl = (categoryName) => {
    return categoryName
      .toLowerCase()                // Convert to lowercase
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '')   // Remove characters that aren't lowercase letters, numbers, or hyphens
      .replace(/--+/g, '-')         // Replace multiple hyphens with a single one
      .trim();                      // Remove leading and trailing hyphens if any
  };
  
export default nameToUrl;
  