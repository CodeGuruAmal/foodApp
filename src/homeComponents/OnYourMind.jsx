import React from "react";
import { useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

const OnYourMind = () => {
  const homeData = useSelector((state) => state?.home?.homeData);
// console.log(homeData)

  const headerTitle = homeData?.cards
    ? homeData?.cards.length > 0
      ? homeData?.cards[0]?.card?.card?.header?.title
      : ""
    : [];
  const sliderImg = homeData?.cards
    ? homeData?.cards.length > 0
      ? homeData?.cards[0]?.card?.card?.imageGridCards?.info
      : []
    : [];

    
  return (
    <div className={`mb-8 border-b-2 `}>
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-[Gilroy-ExtraBold]">
          {headerTitle}
        </h2>

        <div className="flex gap-4 text-xl text-zinc-800">
          <button
            className={`text-sm w-6 h-6 rounded bg-zinc-300 flex items-center justify-center transition-opacity duration-300 `}
          >
            <IoArrowBack />
          </button>
          <button
            className={`text-sm w-6 h-6 rounded bg-zinc-300 flex items-center justify-center transition-opacity duration-300`} // Disable button if at the end
          >
            <IoArrowForward />
          </button>
        </div>
      </div>

      <div className="slider flex gap-[.3rem] overflow-x-scroll scroll-smooth mt-5 pb-7">
        {sliderImg.map((item, index) => (
          <div key={index}>
            <img
              className="md:min-w-24 min-w-20"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnYourMind;
