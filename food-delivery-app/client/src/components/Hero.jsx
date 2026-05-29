function Hero() {
  return (
    <div className="relative h-[85vh] flex items-center justify-center text-center">

      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')] bg-cover bg-center opacity-30"></div>

      <div className="relative z-10 px-6">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Delicious Food <br /> Delivered Fast 🍕
        </h1>

        <p className="text-gray-300 mt-6 text-lg">
          Order from top restaurants near you in seconds
        </p>

        <button className="mt-8 bg-orange-500 px-10 py-4 rounded-full text-lg hover:scale-105 transition">
          Order Now
        </button>

      </div>

    </div>
  );
}

export default Hero;