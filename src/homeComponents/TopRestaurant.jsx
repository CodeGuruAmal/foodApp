import React from "react";
import { useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import RestaurantCard from "./RestaurantCard";

const TopRestaurant = () => {
  const homeData = useSelector((state) => state?.home?.homeData);

  const headerTitle = homeData?.cards
    ? homeData?.cards.length > 0
      ? homeData?.cards[1]?.card?.card?.header?.title
      : ""
    : [];

  const restaurantDetails = homeData?.cards
    ? homeData?.cards.length > 0
      ? homeData?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      : []
    : [];

  return (
    <div className="mb-8 border-b-2">
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
            className={`text-sm w-6 h-6 rounded bg-zinc-300 flex items-center justify-center transition-opacity duration-300 `}
          >
            <IoArrowForward />
          </button>
        </div>
      </div>

      <div className="slider flex gap-[.2rem] overflow-x-scroll scroll-smooth mt-5 pb-1">
        {restaurantDetails
          ? restaurantDetails.map(({ info, cta: link }) => (
              <div key={info.id} className="scale-90">
                <RestaurantCard {...info} link={link} />
              </div>
            ))
          : []}
        <div></div>
      </div>
    </div>
  );
};

export default TopRestaurant;
