import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <Navbar />

      <main className="relative p-5">
        {/* Full background image with dark overlay and subtle animation */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center transform scale-110 transition-transform duration-500 hover:scale-100"
          style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2019/04/06/06/44/astronaut-4106766_960_720.jpg')" }}
        >
          <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-70">
            <p className="text-white text-lg font-semibold px-5 py-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg animate-pulse shadow-xl">
              Check out our latest offers! <a href="#" className="underline">Click here for more details.</a>
            </p>
          </div>
        </div>

        {/* Main content area with animated text and enhanced typography */}
        <div className="relative z-10 text-white space-y-8 mt-10">
          <h1 className="text-5xl font-extrabold text-red-500 transition duration-700 transform hover:scale-110">
            About Us
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            <section>
              <h2 className="text-4xl font-bold mb-4 text-yellow-400">Our Story</h2>
              <p className="leading-relaxed">
                At <span className="font-bold text-red-400">Goldyy Supplements</span>, we are more than just a brand; we are a movement focused on helping you achieve your fitness goals and elevate your performance. Our journey began with a single goal: to create supplements that improve physical performance and support overall well-being.
              </p>
            </section>

            <section>
              <h2 className="text-4xl font-bold mb-4 text-yellow-400">Our Mission</h2>
              <p className="leading-relaxed">
                Our mission is to empower individuals to reach their full potential. We prioritize quality and innovation to deliver products that support a wide variety of fitness goals. We’re here to support you, from your first workout to peak performance.
              </p>
            </section>

            <section>
              <h2 className="text-4xl font-bold mb-4 text-yellow-400">Why Choose Us?</h2>
              <ul className="list-disc ml-5 space-y-3">
                <li className="text-gray-200">
                  <span className="font-semibold">Quality You Can Trust:</span> Our products meet the highest standards.
                </li>
                <li className="text-gray-200">
                  <span className="font-semibold">Scientifically Proven Formulas:</span> Designed for real results.
                </li>
                <li className="text-gray-200">
                  <span className="font-semibold">Dedicated to Your Goals:</span> Tailored solutions for every fitness journey.
                </li>
                <li className="text-gray-200">
                  <span className="font-semibold">Sustainable and Ethical:</span> Responsibly sourced, environmentally friendly products.
                </li>
              </ul>
            </section>

            {/* Dynamic call-to-action button */}
            <div className="mt-10">
              <a href="#" className="bg-gradient-to-r from-yellow-500 to-red-500 px-6 py-3 text-white font-semibold rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                Join the Goldyy Community
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
