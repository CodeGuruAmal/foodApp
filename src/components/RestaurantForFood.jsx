import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFoodRestaurant } from "../utils/homeSlice";
import RestaurantCard from "../homeComponents/RestaurantCard";

const RestaurantForFood = () => {
  const { id } = useParams();
  const coordinates = useSelector((state) => state.location.coordinates);
  const foodRestaurant = useSelector((state) => state.home.foodRestaurant);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.geometry.location.lat}&lng=${coordinates.geometry.location.lng}&collection=${id}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
        )
        .then((res) => dispatch(setFoodRestaurant(res?.data?.data?.cards)))
        .catch((err) => console.log(err));
    }
  }, [coordinates, id]);

  const title = foodRestaurant[0]?.card?.card?.title;
  const description = foodRestaurant[0]?.card?.card?.description;
  // const subTitle = foodRestaurant[2]?.card?.card?.gridElements?.infoWithStyle?.text;

  const restaurantData = foodRestaurant.slice(3);

  return (
    <div className="md:w-[75%] w-[95%]  left-1/2 -translate-x-1/2 absolute top-24">
      <h1 className="text-4xl font-[Gilroy-Bold] text-slate-900">{title}</h1>
      <p className="text-sm font-[Gilroy-Medium] text-neutral-400">{description}</p>

      <h3 className="text-xl mt-6 font-[Gilroy-ExtraBold]">Restaurants to explore</h3>

      <div className="flex flex-wrap justify-center gap-[1.5rem] mt-8">
        {restaurantData.map(
          (
            {
              card: {
                card: { info },
              },
            },
            index
          ) => {
            return (
              <div key={info.id || index}>
                <RestaurantCard {...info} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default RestaurantForFood;
