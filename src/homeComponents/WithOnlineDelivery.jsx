import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const WithOnlineDelivery = () => {
  const homeData = useSelector((state) => state?.home?.homeData);
  const [headerTitle, setHeaderTitle] = useState("");
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    if (homeData?.cards?.length > 0) {
      const titleFinder = homeData?.cards.find(
        (data) => data?.card?.card?.id === "popular_restaurants_title"
      );
      const detailsFinder = homeData?.cards.find(
        (data) => data?.card?.card?.id === "restaurant_grid_listing"
      );

      if (titleFinder || detailsFinder) {
        const title = titleFinder.card.card.title;
        setHeaderTitle(title);

        const details =
          detailsFinder.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setRestaurantDetails(details);

        setDataNotFound(false);
      } else {
        setDataNotFound(true);
      }
    }
  }, [homeData]);
  return (
    <div>
      {dataNotFound ? null : (
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
      )}
    </div>
  );
};

export default WithOnlineDelivery;
