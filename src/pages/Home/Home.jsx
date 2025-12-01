function Home() {
  return (
    <div className="px-6 py-10">
      {/* HERO SECTION */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Statamatics IIT Kanpur
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore Mathematics, Statistics, and Beyond.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Explore Competitions
        </button>
      </section>

      {/* ABOUT BRIEF */}
      <section className="py-10">
        <h2 className="text-2xl font-semibold mb-2">About Us</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
          Statamatics is a student body at IIT Kanpur dedicated to promoting
          interest in Mathematics, Statistics, and problem-solving through 
          competitions, workshops, and blogs.
        </p>
      </section>

      {/* COMPETITION CARDS */}
      <section className="py-10">
        <h2 className="text-2xl font-semibold mb-4">Competitions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["Integration Bee", "Mathematica", "Mathemania"].map((title) => (
            <div
              key={title}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Exciting mathematics competition.
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
