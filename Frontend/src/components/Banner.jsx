import { useState } from "react";
import { CiSearch } from "react-icons/ci";
// import { MdFileDownload } from "react-icons/md";
import { FaPlay, FaTimes } from "react-icons/fa";
import {bannerAssets} from '../assets/dummydata'
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate()
  const handleSearch =(e)=>{
  e.preventDefault();
  navigate('/menu');
  setSearchQuery("");
  }
  const [searchQuery,setSearchQuery] = useState("");
  const [showVideo,setShowVideo] = useState(false);
  const {bannerImage,orbitImages,video} = bannerAssets;
  console.log("searchQuery:",searchQuery)
  return (
    <div className="bg-amber-700 min-h-screen w-full text-white overflow-hidden ">
  <div className="container mx-auto px-4 py-8">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      {/* Left Section */}
      <div className="flex flex-col text-center lg:text-left">

        <span className="text-3xl md:text-4xl font-serif pt-6">
          We're Here
          <p className="text-4xl md:text-5xl font-bold text-amber-400 pb-4">
            For Food & Delivery
          </p>
        </span>

        <p className="max-w-md mx-auto lg:mx-0 text-xs md:text-sm italic py-5">
          Best cooks and best Delivery guys all at your service.
          Hot tasty food will reach you in 60 minutes.
        </p>

        <form onSubmit={handleSearch}>
          <div className="flex items-center rounded border px-3 p-2 w-full max-w-xl bg-amber-800 border-amber-500 shadow-lg hover:bg-amber-400/30">

            <CiSearch className="text-2xl shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Discover your next favorite meal..."
              className="outline-none border-none w-full text-sm p-1 bg-transparent"
            />

            <button
              type="submit"
              className="cursor-pointer border px-3 py-1 rounded bg-amber-400/50 hover:bg-sky-300/10 hover:text-black hover:scale-95"
            >
              Search
            </button>

          </div>
        </form>

        <div className="flex flex-col sm:flex-row gap-4 pt-5">

          {/* <button className="border rounded p-3 flex items-center justify-center bg-amber-400/30 hover:scale-95 cursor-pointer text-emerald-900/90 hover:text-fuchsia-900 hover:bg-linear-to-r from-blue-500 to-emerald-600">

            <MdFileDownload className="mr-2 text-2xl" />
            Download App

          </button> */}

          <button
            onClick={() => setShowVideo(true)}
            className="border rounded p-3 flex items-center justify-center bg-amber-400/30 hover:scale-95 cursor-pointer text-emerald-900/90 hover:text-fuchsia-900 hover:bg-linear-to-r from-yellow-600 to-emerald-600"
          >
            <FaPlay className="mr-2 text-xl" />
            Watch Video
          </button>

        </div>

      </div>

      {/* Right Section */}
      <div className="relative flex justify-center items-center min-h-112.5">

        {/* Main Image */}
        <div className="relative bg-linear-to-r from-amber-700 via-amber-800 to-amber-500 rounded-full p-1 z-20 w-56 h-56 sm:w-72 sm:h-72 shadow-2xl">

          <img
            src={bannerImage}
            alt="Banner"
            className="w-full h-full rounded-full object-cover object-top border-4 border-amber-900/30 pointer-events-none"
          />

        </div>

        {/* Orbit Images */}
        {orbitImages.map((imgSrc, index) => (
          <div
            key={index}
            className={`
              absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2
              ${index === 0 ? "orbit" : `orbit-delay-${index * 5}`}
              w-26 h-26 sm:w-30 sm:h-30 md:w-60 md:h-60 
               rounded-full p-1 z-10 shadow-lg bg-amber-900/20 border border-amber-500/30
            `}
          >
            <img
              src={imgSrc}
              alt={`Orbiting-${index + 1}`}
              className="w-full h-full border border-amber-500/30 shadow-lg bg-amber-900/20 p-1 object-cover rounded-full "
            />
          </div>
        ))}

      </div>

    </div>

    {/* Video Modal */}
    {showVideo && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4">

        <button
          onClick={() => setShowVideo(false)}
          className="absolute top-6 right-6 text-amber-500 hover:text-amber-300 text-3xl z-10"
        >
          <FaTimes />
        </button>

        <div className="w-full max-w-5xl mx-auto">
          <video
            controls
            autoPlay
            className="w-full aspect-video object-contain rounded-2xl shadow-2xl"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>

      </div>
    )}

  </div>
</div>
  )
}

export default Banner