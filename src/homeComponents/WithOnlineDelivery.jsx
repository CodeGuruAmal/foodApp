import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import { TbX } from "react-icons/tb";

const WithOnlineDelivery = () => {
  const homeData = useSelector((state) => state?.home?.homeData);
  const [headerTitle, setHeaderTitle] = useState("");
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const filterOptions = [
    "Fast Delivery",
    "Ratings 4.0+",
    "Pure Veg",
    "Offers",
    "Rs. 300-Rs. 600",
    "Less than Rs. 300",
  ];

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
        setFilteredItems(details); // Initially set filtered items to all restaurants
        setDataNotFound(false);
      } else {
        setDataNotFound(true);
      }
    }
  }, [homeData]);

  const handleFilterClick = (option) => {
    if (selectedFilter.includes(option)) {
      const newFilters = selectedFilter.filter((item) => item !== option);
      setSelectedFilter(newFilters);
    } else {
      setSelectedFilter((prev) => [...prev, option]);
    }
  };

  useEffect(() => {
    if (selectedFilter.length > 0) {
      let filteredData = restaurantDetails.filter((item) => {
        return selectedFilter.every((option) => {
          switch (option) {
            case "Fast Delivery":
              return item?.info?.sla?.deliveryTime < 30;

            case "Ratings 4.0+":
              return item?.info?.avgRating > 4;

            case "Pure Veg":
              return item?.info?.veg === true;

            case "Offers":
              return item?.info?.aggregatedDiscountInfoV3;

            case "Rs. 300-Rs. 600":
              return (
                Number(item?.info?.costForTwo.replace(/[^0-9]/g, "")) >= 300 &&
                Number(item?.info?.costForTwo.replace(/[^0-9]/g, "")) <= 600
              );

            case "Less than Rs. 300":
              return Number(item?.info?.costForTwo.replace(/[^0-9]/g, "")) < 300;

            default:
              return true;
          }
        });
      });

      setFilteredItems(filteredData);
    } else {
      setFilteredItems(restaurantDetails); // Reset to all restaurants if no filters are selected
    }
  }, [selectedFilter, restaurantDetails]);

  return (
    <div>
      {dataNotFound ? (
        <p>No Data Found</p>
      ) : (
        <div className="mb-8">
          <h2 className="text-base md:text-lg font-[Gilroy-ExtraBold]">
            {headerTitle}
          </h2>

          {/* ======================= Filter Section ======================= */}
          <div className="flex gap-2 mt-5 mb-10">
            {filterOptions.map((option, idx) => (
              <button
                onClick={() => handleFilterClick(option)}
                className={`flex items-center gap-1 text-xs font-[Gilroy-Semibold] shadow text-neutral-700 border border-neutral-300 rounded-full px-4 py-2 ${
                  selectedFilter.includes(option)
                    ? "bg-neutral-200 border-neutral-700"
                    : "bg-white"
                }`}
                key={idx}
              >
                <span>{option}</span>
                <TbX
                  className={`${
                    selectedFilter.includes(option) ? "block" : "hidden"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* ======================= Restaurant Section ======================= */}
          <div className="flex flex-wrap justify-center gap-[1.5rem] mt-6">
            {filteredItems.length > 0
              ? filteredItems.map(({ info, cta: link }, index) => (
                  <div key={info.id || index}>
                    <RestaurantCard {...info} link={link} />
                  </div>
                ))
              : <p>No restaurants found matching the selected filters</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithOnlineDelivery;
