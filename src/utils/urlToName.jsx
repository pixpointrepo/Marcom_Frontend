// To convert a URL to a name, example: "breaking-news" to "Breaking News", you can use the following function:

const urlToName = url => {
    return url
        .replace(/-/g, " ")  
        .replace(/\b\w/g, char => char.toUpperCase());  
    };

export default urlToName;

