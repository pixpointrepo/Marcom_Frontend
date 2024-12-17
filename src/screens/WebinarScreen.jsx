/* eslint-disable */

import speakers from "../data/speakers";
import schedule from "../data/time_schedules";


const WebinarScreen = () => {
  
  return (
    <div className="p-6 md:p-10">

      {/* About Section */}
      <section className="container mx-auto  text-justify mb-10">
          <h3 className="text-2xl font-semibold mb-6 text-center">About the Webinar</h3>
          <p className="text-md leading-relaxed mb-8">
            PixPoint's Tech Webinar brings together industry leaders, innovators, and forward-thinking professionals to discuss the latest advancements in technology. The event is designed for tech enthusiasts, startups, and businesses looking to understand how emerging technologies can drive growth and success.
          </p>
          <p className="text-md leading-relaxed mb-8">
            At PixPoint, we believe in the power of digital transformation. Our mission is to guide businesses in adapting and thriving in the ever-changing technological landscape. This webinar will cover key topics such as Artificial Intelligence (AI), Data Science, Cloud Computing, Cybersecurity, and more.
          </p>
          <p className="text-md leading-relaxed mb-8">
            Whether you're a developer, a business leader, or just passionate about technology, this event will provide actionable insights, cutting-edge knowledge, and the opportunity to network with like-minded professionals.
          </p>
          <h1 className="font-medium">Key Topics to be Discussed:</h1>
          <p className="text-md leading-relaxed">
            
            <ul className="list-disc pl-8 text-left">
              <li>Artificial Intelligence and Machine Learning</li>
              <li>Building Scalable Web Applications</li>
              <li>Data-Driven Decision Making</li>
              <li>Cybersecurity Trends and Best Practices</li>
              <li>Cloud Computing Solutions for Startups</li>
            </ul>
          </p>
    </section>
      {/* Speakers Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Speakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center md:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="text-center border rounded-md px-4 py-2" >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="rounded-full h-32 w-32 mx-auto mb-4 object-cover border-2 border-blue-500"
              />
              <h3 className="text-lg font-semibold line-clamp-2">{speaker.name}</h3>
              <p className="text-gray-500 text-sm">{speaker.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Schedule</h2>
        <div className="bg-blue-100 p-6 rounded-md">
          {schedule.map((event, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center mb-6 last:mb-0"
            >
              <div className="md:w-2/5 mb-2 md:mb-0 text-blue-600 font-bold">{event.time}</div>
              <div className="md:w-3/5">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Register Section */}
      <section id="register" className="py-16 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-center">Register for the Webinar</h3>
        <p className="text-md mb-6 text-justify">
          Don’t miss out on this exciting opportunity to stay ahead in the world of technology. Register today and secure your spot for the PixPoint Tech Webinar. By registering, you'll gain access to live sessions, workshops, and one-on-one networking opportunities with industry experts.
        </p>
        <div className="max-w-3xl mx-auto mb-6 text-justify">
          <h4 className="text-xl font-semibold mb-4">Why Attend?</h4>
          <p className="text-md mb-4">
            This is your chance to:
          </p>
          <ul className="list-disc pl-8 text-md ">
            <li>Gain valuable insights on cutting-edge tech trends and how they impact your industry.</li>
            <li>Learn from seasoned experts who are leading the way in AI, Data Science, Cloud Computing, and Cybersecurity.</li>
            <li>Participate in live Q&A sessions and get answers to your burning questions from the speakers.</li>
            <li>Expand your professional network by connecting with peers and industry leaders.</li>
          </ul>
        </div>
        <p className="text-md mb-6 text-justify">
          Register now to receive an exclusive link to the live webinar and session updates. Spaces are limited, so make sure to reserve your spot as soon as possible!
        </p>
        <a href="" className="text-center bg-blue-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">Register Now</a>
      </section>
    </div>
  );
};

export default WebinarScreen;
