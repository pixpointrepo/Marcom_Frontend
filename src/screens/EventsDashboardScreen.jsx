import events from "../data/events";

const EventsDashboardScreen = () => {
    return (
      <div className="font-sans">
        {/* Upcoming Events */}
        <section className="bg-blue-100 py-8">
          <h2 className="text-2xl font-medium mb-6 text-center">UPCOMING EVENTS</h2>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-6 mx-4">
            {events.upcoming.map((event) => (
              <div
                key={event.id}
                className=" bg-white rounded-lg shadow-md overflow-hidden w-full  "
              >
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{event.description}</p>
                  <p className="mt-2 text-gray-500 line-clamp-2 min-h-12">
                    {event.date} • {event.location}
                  </p>
                  <button className= "mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition">
                    {event.buttonLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* About Section */}
        <section className="py-8 px-4 bg-gray-100">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-medium mb-4">ABOUT</h2>
            <p className="text-gray-600 leading-relaxed">
              Pixpoint Events is a mission to recognize and reward the best work by agencies and brands
              in Nepal. Covering important aspects of Advertising, News, Media, and
              Marketing through a series of panel discussions and on-the-record interviews.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition">
              Contact Us
            </button>
          </div>
        </section>
  
        {/* Past Events */}
        <section className="bg-blue-100 py-8 px-4">
          <h2 className="text-2xl font-medium mb-6 text-center">PAST EVENTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.past.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-md font-medium mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <span className="mt-2 block text-sm font-semibold text-amber-500">
                    {event.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default EventsDashboardScreen;