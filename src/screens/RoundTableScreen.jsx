/* eslint-disable */


const RoundTableScreen = () => {
    const speakers = [
        {
          image: "/src/assets/images/person.png",
          name: "Ramu KC ",
          designation: "Chief Marketing Officer",
          company: "Pixpoint",
        },
        {
          image:  "/src/assets/images/person.png",
          name: "Sanish Lama",
          designation: "Tech Lead",
          company: "Pixpoint",
        },
        {
          image:  "/src/assets/images/person.png",
          name: "Anup Pantha",
          designation: "VP of Advertising",
          company: "Pixpoint",
        },
      ];
    
      const agenda = [
        { time: "06:30 pm - 07:30 pm", title: "Networking and Cocktails" },
        { time: "07:30 pm - 07:45 pm", title: "Welcome Note - Gurmit Singh" },
        { time: "07:45 pm - 08:00 pm", title: "Pixpoint Presentation - Nitin Patil" },
        { time: "08:00 pm - 08:30 pm", title: "Panel Discussion" },
        { time: "08:30 pm - 08:45 pm", title: "Q&A and Vote of Thanks" },
        { time: "08:45 pm - 09:45 pm", title: "Dinner" },
      ];
    
      return (
        <div className="font-sans">
          {/* About Section */}
          <section className="bg-blue-100 py-10 px-8 ">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl text-center font-medium text-blue-700 mb-4">About the RoundTable Program</h2>
              <img src="/src/assets/images/round-table.jpg" className="h-52 my-4 " alt="" />
              <p className="text-black max-w-4xl leading-relaxed text-justify ">
                Welcome to Pixpoint's Tech & Advertising RoundTable Program! This is an exclusive event
                that brings together industry leaders, innovators, and professionals to discuss emerging
                trends in technology and advertising. Join us for insightful discussions, networking,
                and collaborative opportunities.
              </p>
            </div>
           
          </section>
    
          {/* Speakers Section */}
          <section className="bg-gray-50 py-10">
            <h2 className="text-2xl font-medium text-center text-blue-700 mb-6">Meet the Speakers</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {speakers.map((speaker, index) => (
                 <div className="bg-white shadow-md rounded-lg overflow-hidden py-2 w-64 mx-auto" key={index}>
                 <div className="flex justify-center items-center">
                   <img
                     src={speaker.image}
                     alt={speaker.name}
                     className="h-32 w-32 object-contain border-1 border-amber rounded-full border-2 border-blue-500"
                   />
                 </div>
                 <div className="p-4 text-center">
                   <h3 className="text-base font-semibold text-gray-800">{speaker.name}</h3>
                   <p className="text-sm text-gray-600">{speaker.designation}</p>
                   <p className="text-blue-500 font-medium">{speaker.company}</p>
                 </div>
               </div>
              ))}
            </div>
          </section>
    
          {/* Agenda Section */}
          <section className="bg-blue-100 py-10">
            <h2 className="text-2xl font-medium text-center text-blue-700 mb-6">Agenda</h2>
            <div className="max-w-4xl mx-auto pl-10 md:pl-44 pt-4">
              {agenda.map((item, index) => (
                 <div className="flex items-center mb-4" key={index}>
                  <div className="text-gray-700 font-semibold w-20 md:w-32">{item.time}</div>
                  <div className="flex items-center">
                    <div className="h-16 border-l-2 border-gray-300 mx-4"></div>
                    <div className="text-gray-700 font-medium">{item.title}</div>
                  </div>
               </div>
              ))}
            </div>
          </section>
    
          {/* Registration Form */}
          <section className="bg-white py-10 px-10">
            <h2 className="text-2xl font-medium text-center text-red-600 mb-6">Registration Form</h2>
            <form className="max-w-4xl mx-auto px-4 grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Name*"
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Designation*"
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Company*"
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="email"
                placeholder="Business Email*"
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Business Domain*"
                className="border border-gray-300 p-2 rounded-md"
              />
              <select className="border border-gray-300 p-2 rounded-md">
                <option value="">Select City*</option>
                <option value="city1">New York</option>
                <option value="city2">Los Angeles</option>
              </select>
              <input
                type="tel"
                placeholder="Mobile*"
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="LinkedIn Profile*"
                className="border border-gray-300 p-2 rounded-md"
              />
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm text-gray-600">
                  I agree to receive marketing communications from Pixpoint.
                </label>
              </div>
              <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Register
              </button>
            </form>
          </section>
        </div>
      );
}

export default RoundTableScreen
