import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?calendar,scheduling")' }}>
      
      {/* Navbar
      <nav className="bg-gray-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold">
            <a href="/" className="hover:text-yellow-500 transition duration-300">Scheduler</a>
          </div>
          <ul className="flex space-x-8">
            <li>
              <a href="/" className="hover:text-yellow-500 transition duration-300 ease-in-out">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-500 transition duration-300 ease-in-out">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-500 transition duration-300 ease-in-out">Contact</a>
            </li>
            <li>
              <a href="/login" className="hover:text-yellow-500 transition duration-300 ease-in-out">Login</a>
            </li>
          </ul>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-black bg-opacity-50">
        <div className="text-center text-white p-10 bg-opacity-70 bg-gray-900 rounded-lg animate__animated animate__fadeIn">
          <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            Welcome to Your Event Scheduler
          </h1>
          <p className="text-xl mb-8 animate__animated animate__fadeInUp animate__delay-2s">
            Easily manage your availability and schedule sessions effortlessly.
          </p>
          <a href="/register" className="text-white bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg shadow-lg transition duration-300 animate__animated animate__fadeInUp animate__delay-3s">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Features</h2>
          <div className="flex flex-wrap justify-center gap-6">
            
            {/* Feature Cards */}
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105">
                <img className="w-24 h-24 mx-auto mb-4" src="https://source.unsplash.com/100x100/?calendar" alt="Dynamic Availability" />
                <h3 className="text-2xl font-semibold mb-2">Dynamic Availability</h3>
                <p>Easily manage and update your availability with a user-friendly interface.</p>
              </div>
            </div>

            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105">
                <img className="w-24 h-24 mx-auto mb-4" src="https://source.unsplash.com/100x100/?team" alt="Group Scheduling" />
                <h3 className="text-2xl font-semibold mb-2">Group Scheduling</h3>
                <p>Schedule sessions with multiple participants and avoid conflicts with ease.</p>
              </div>
            </div>

            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105">
                <img className="w-24 h-24 mx-auto mb-4" src="https://source.unsplash.com/100x100/?reminder" alt="Reminders" />
                <h3 className="text-2xl font-semibold mb-2">Reminders & Notifications</h3>
                <p>Receive timely reminders via email or SMS to keep your schedule in check.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


