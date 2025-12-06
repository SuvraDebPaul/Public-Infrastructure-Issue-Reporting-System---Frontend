import React from "react";
import bannerBg from "/1.jpg";
import BoxContainer from "../../../Util/BoxContainer";

const Banner = () => {
  return (
    <div className="relative z-10 h-[80vh]">
      <img
        className="absolute w-full h-[80vh] object-cover"
        src={bannerBg}
        alt="Hero Background Image"
      />
      <div className="absolute h-[80vh] inset-0 bg-black/20 backdrop-blur-xs"></div>
      <BoxContainer>
        <div className="relative h-[80vh] max-w-4xl z-10 text-white p-10 flex flex-col gap-6 justify-center">
          <h2 className="text-5xl font-black ">
            Report Public Issues Instantly. Make Your City Better.
          </h2>
          <h4 className="font-bold text-2xl">
            A smarter, faster way to alert authorities about real-world
            infrastructure problems.
          </h4>
          <p className="text-lg">
            Whether it's a broken streetlight, pothole, drainage issue, or
            damaged sidewalk, you can report it in seconds. Upload photos, mark
            the location, and track the status—all from one platform.
          </p>
          <button className="btn btn-primary text-lg py-6 self-start">
            Report an Issue Now →
          </button>
        </div>
      </BoxContainer>
    </div>
  );
};

export default Banner;
