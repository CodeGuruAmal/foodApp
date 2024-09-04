import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  setDetailsData,
  setMenuData,
  setOffersData,
} from "../utils/restaurantSlice";
import Details from "../restaurantComponents/Details";
import Offers from "../restaurantComponents/Offers";
import Menu from "../restaurantComponents/Menu";
import { clearCart, setIsDiffResMessage } from "../utils/cartSlice";
import toast from "react-hot-toast";

const RestaurantMenu = () => {
  const { id } = useParams();

  const detailsData = useSelector((state) => state.restaurant.detailsData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const cartClick = useSelector((state) => state.nav.cartClick);
  const menuClick = useSelector((state) => state.nav.menuClick);
  const isDiffResMessage = useSelector((state) => state.cart.isDiffResMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${
          coordinates?.geometry?.location?.lat
            ? coordinates?.geometry?.location?.lat
            : 19.0759837
        }&lng=${
          coordinates?.geometry?.location?.lng
            ? coordinates?.geometry?.location?.lng
            : 72.8776559
        }&restaurantId=${id
          .split("rest")
          .at(-1)}&catalog_qa=undefined&submitAction=ENTER`
      )
      .then((res) => {
        dispatch(setDetailsData(res?.data?.data?.cards[2]?.card?.card?.info));
        dispatch(
          setOffersData(
            res?.data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
              ?.offers
          )
        );
        dispatch(
          setMenuData(
            res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
              (data) =>
                data?.card?.card?.categories ||
                data?.card?.card?.itemCards ||
                data?.card?.card?.carousel
            )
          )
        );
      })
      .catch((err) => console.log(err));
  }, [
    coordinates?.geometry?.location?.lat,
    coordinates?.geometry?.location?.lng,
  ]);


  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is Cleared");

  };

  return (
    <>
      <div
        className={`h-screen w-full fixed top-0 left-0 z-[10001] ${
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

      <div
        className={`md:w-[70%] lg:w-[47%] w-[95%]  left-1/2 -translate-x-1/2 absolute top-20 ${
          cartClick || menuClick ? "max-h-[85vh] overflow-hidden" : ""
        } `}
      >
        <div className="nav text-[.6rem] font-[Gilroy-Medium] tracking-wider text-neutral-400">
          <Link to={"/"}>Home</Link> / <span>{detailsData?.city}</span> /{" "}
          <span className="text-neutral-600">{detailsData?.name}</span>
        </div>

        <Details />
        <Offers />
        <Menu />
      </div>
    </>
  );
};

export default RestaurantMenu;
