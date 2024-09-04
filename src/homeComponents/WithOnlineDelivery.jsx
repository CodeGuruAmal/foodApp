import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const WithOnlineDelivery = () => {
  const homeData = useSelector((state) => state?.home?.homeData);

  const headerTitle = homeData?.cards
    ? homeData?.cards.length > 0
      ? homeData?.cards[2]?.card?.card?.title
      : ""
    : [];
  const restaurantDetails = homeData?.cards
    ? homeData?.cards.length > 0
      ? homeData?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      : []
    : [];

  return (
    <div className="mb-8">
      <h2 className="text-base md:text-lg font-[Gilroy-ExtraBold]">
        {headerTitle}
      </h2>
      <div className="flex flex-wrap justify-center gap-[1rem] mt-6">
        {restaurantDetails
          ? restaurantDetails.map(({ info, cta: link }) => (
              <div key={info.id}>
                <RestaurantCard {...info} link={link} />
              </div>
            ))
          : []}
      </div>
    </div>
  );
};

export default WithOnlineDelivery;
