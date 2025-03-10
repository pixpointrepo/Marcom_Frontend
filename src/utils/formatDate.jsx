function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Create an array for month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0'); // Ensures day is two digits

    return `${month} ${day}, ${year}`; 
}

export default formatDate;