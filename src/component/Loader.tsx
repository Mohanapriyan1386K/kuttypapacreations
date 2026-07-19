function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center ">
      <img
        src="/logo.png"
        className="w-44 animate-bounce"
        alt="PapaKutty Creations"
      />

      <div className="mt-8 w-56 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-500 animate-pulse"></div>
      </div>

      <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
        Loading...
      </p>
    </div>
  );
}

export default Loader;
