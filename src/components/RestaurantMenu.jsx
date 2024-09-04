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

const RestaurantMenu = () => {
  const { id } = useParams();

  const detailsData = useSelector((state) => state.restaurant.detailsData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const cartClick = useSelector((state) => state.nav.cartClick);
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

  return (
    <div
      className={`md:w-[70%] lg:w-[47%] w-[95%]  left-1/2 -translate-x-1/2 absolute top-20 ${
        cartClick ? "max-h-[85vh] overflow-hidden" : ""
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
  );
};

export default RestaurantMenu;
