

const ContactUsScreen = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold text-center text-blue-600 mb-8">Contact Us</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Pixpoint</h2>
        <p className="text-gray-700 mb-6 text-justify">
          Pixpoint is a leading technology and advertising company that provides innovative digital solutions to businesses. 
          We specialize in creating high-impact advertising campaigns, leveraging cutting-edge technology to maximize reach and engagement. 
          Our mission is to deliver measurable results through creative and effective marketing strategies.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-blue-600"></i>
            <p className="text-gray-700">Old Baneshwor, Kathmandu, Nepal</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-phone-alt text-blue-600"></i>
            <p className="text-gray-700">Phone: +01 4594371</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-envelope text-blue-600"></i>
            <p className="text-gray-700">Email: info@pixpoint.com.np</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-globe text-blue-600"></i>
            <p className="text-gray-700">Website: <a href="https://www.pixpoint.com.np" className="text-blue-500 hover:underline">www.pixpoint.com.np</a></p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-600 mb-2">Your Name</label>
              <input type="text" id="name" placeholder="Your Name" className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 mb-2">Your Email</label>
              <input type="email" id="email" placeholder="Your Email" className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="message" className="text-gray-600 mb-2">Your Message</label>
            <textarea id="message" placeholder="Type your message here..." rows="5" className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div className="mt-4 flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsScreen;
