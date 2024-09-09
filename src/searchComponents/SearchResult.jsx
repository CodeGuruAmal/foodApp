import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";

const SearchResult = () => {
  const { result } = useParams();
  const navigate = useNavigate();
  const metaData = useSelector((state) => state.search.metaData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const [restaurantData, setRestaurantData] = useState([]);
  const [dishData, setDishData] = useState([]);

  useEffect(() => {
    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}&str=${result}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=da25e734-6c56-8b60-673d-da5e0d368b6a&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A${metaData?.data?.parentId}%2C%22primaryRestaurantId%22%3A${metaData?.data?.primaryRestaurantId}%2C%22cloudinaryId%22%3A%22${metaData?.data?.cloudinaryId}%22%2C%22brandId%22%3A${metaData?.data?.brandId}%2C%22dishFamilyId%22%3A%22${metaData?.data?.dishFamilyId}%22%2C%22enabled_flag%22%3A${metaData?.data?.enabled_flag}%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D`
        )
        .then((res) => setRestaurantData(res))
        .catch((err) => console.log(err));
    }
  }, [coordinates]);

  useEffect(() => {
    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}&str=${result}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=9ad4cd61-57b9-e2db-8622-7d4802804dd3&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22${metaData?.data?.vegIdentifier}%22%2C%22cloudinaryId%22%3A%22${metaData?.data?.cloudinaryId}%22%2C%22dishFamilyId%22%3A%22${metaData?.data?.dishFamilyId}%22%2C%22dishFamilyIds%22%3A%5B%22${metaData?.data?.dishFamilyId}%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`
        )
        .then((res) =>
          setDishData(
            res?.data?.data?.cards
              .at(-1)
              .groupedCard?.cardGroupMap?.DISH?.cards.slice(1)
          )
        )
        .catch((err) => console.log(err));
    }
  }, [coordinates]);

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] lg:w-[55%] flex flex-col items-center gap-3 h-[91vh]">
      <div className="w-full py-2">
        <button className="text-xl duration-200 cursor-pointer hover:bg-neutral-100 p-2 rounded-xl">
          <IoArrowBack onClick={() => navigate(-1)} />
        </button>

        <div className="font-[Gilroy-semibold] mt-4">
          <div className="categoryBtn flex gap-3 text-xs ">
            <button className="px-3 py-1 bg-secondaryFont border border-secondaryFont rounded-full">
              Restaurants
            </button>
            <button className="border border-secondaryFont px-3 py-1 rounded-full">
              Dishes
            </button>
          </div>
        </div>
      </div>
      <div className="v-slider w-full h-full overflow-scroll bg-neutral-100 px-2 pt-7 pb-2 shadow-inner">
        <div className="restaurant-section"></div>
        <div className="dish-section ">
          <div className="flex flex-wrap w-[95%] px-2 gap-3 mx-auto pt-8">
            {dishData.map(({ card: { card } }) => {
              // console.log(card);
              return (
                <div
                  key={card?.info?.id}
                  className="w-full sm:w-[48%] h-60 p-3 rounded-2xl bg-white border shadow-md"
                >
                  <div className="top w-full h-14 bg-red-500">
                    <div className="left">
                      <span className="text-xs text-neutral-400">
                        By {card?.restaurant?.info?.name}
                      </span>
                    </div>
                    <div className="right"></div>
                  </div>
                  <div className="bottom">
                    <div className="left"></div>
                    <div className="right"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
