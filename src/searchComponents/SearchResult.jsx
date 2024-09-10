import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import Dishes from "./Dishes";
import { clearCart, setIsDiffResMessage } from "../utils/cartSlice";
import toast from "react-hot-toast";

const SearchResult = () => {
  const { result } = useParams();
  const navigate = useNavigate();
  const metaData = useSelector((state) => state.search.metaData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const isDiffResMessage = useSelector(
    (state) => state?.cart?.isDiffResMessage
  );
  const [restaurantData, setRestaurantData] = useState([]);
  const [dishData, setDishData] = useState([]);
  const [moreDetail, setMoreDetail] = useState();
  const dispatch = useDispatch();

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

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is Cleared");
  };

  const handleMoreDetail = (detail) => {
    setMoreDetail(detail)
  }


  console.log(moreDetail)

  return (
    <div className="w-full h-screen">


      <div 
      onClick={() => setMoreDetail()}
      className={`absolute z-[10001] w-full h-full ${moreDetail ? "block" : "hidden"}`}>
        <div className=" w-full h-full bg-neutral-900 opacity-50"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[25%] h-[65%] bg-red-500"></div>
      </div>


      <div
        className={`h-full w-full fixed top-0 left-0 z-[10001] ${
          isDiffResMessage ? "block" : "hidden"
        }`}
      >
        <div
          onClick={() => dispatch(setIsDiffResMessage(false))}
          className="h-full w-full bg-neutral-900 opacity-50"
        ></div>
        <div
          className={`h-40 w-96 bg-neutral-100 absolute left-1/2 -translate-x-1/2 duration-300 px-4 py-5 ease-in-out flex flex-col gap-3 ${
            isDiffResMessage ? "bottom-5" : "-bottom-32"
          }`}
        >
          <h1 className="text-xl font-[Gilroy-Bold]">Items already in cart</h1>
          <p className="text-[.75rem] font-[Gilroy-Medium]">
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="flex justify-between gap-2 font-[Gilroy-Semibold]">
            <button
              className="border-2 w-full px-4 py-2 text-sm border-green-500 text-green-500"
              onClick={() => dispatch(setIsDiffResMessage(false))}
            >
              NO
            </button>
            <button
              className=" bg-green-500 w-full px-4 py-2 text-sm text-white"
              onClick={() => {
                handleClearCart();
                dispatch(setIsDiffResMessage(false));
              }}
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] md:w-[45rem] lg:w-[50rem] flex flex-col items-center gap-3 h-[90vh]">
        <div className="w-full py-2 flex sm:flex-col gap-4 sm:items-start items-center justify-between">
          <button className="text-xl duration-200 cursor-pointer hover:bg-neutral-100 p-2 rounded-xl">
            <IoArrowBack onClick={() => navigate(-1)} />
          </button>

          <div className="font-[Gilroy-semibold]">
            <div className="categoryBtn flex gap-3 text-xs ">
              <button className="px-3 py-1 bg-neutral-100 shadow-sm border border-neutral-200 rounded-full">
                Restaurants
              </button>
              <button className="border border-neutral-200 shadow-sm px-3 py-1 rounded-full">
                Dishes
              </button>
            </div>
          </div>
        </div>
        {/* <h1 className="text-3xl">Hello</h1> */}
        <div className="w-full h-full overflow-scroll bg-neutral-100 font-[Gilroy-Medium] px-2 pt-5 pb-2 shadow-inner">
          <div className="restaurants"></div>
          <div className="dishes relative w-[95%] mx-auto flex flex-wrap justify-between gap-3 h-full ">
            {dishData.map(({ card: { card } }) => {
              return (
                <div
                  key={card?.info?.id}
                  className="sm:w-[48%] w-full h-60 bg-white shadow-md border rounded-2xl overflow-hidden"
                >
                  <Dishes card={card} handleMoreDetail={handleMoreDetail}/>
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
