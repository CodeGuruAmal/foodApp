import React, { useEffect } from "react";
import OnYourMind from "../homeComponents/OnYourMind";
import TopRestaurant from "../homeComponents/TopRestaurant";
import WithOnlineDelivery from "../homeComponents/WithOnlineDelivery";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHomeData } from "../utils/homeSlice";
import { setCoordinates } from "../utils/locationSlice"; // Import the setCoordinates action
import NoService from "./NoService";

const HomeContainer = () => {
  const locationClick = useSelector((state) => state.nav.locationClick);
  const menuClick = useSelector((state) => state.nav.menuClick);
  const cartClick = useSelector((state) => state.nav.cartClick);
  const homeData = useSelector((state) => state.home.homeData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const dispatch = useDispatch();


  useEffect(() => {
    if (coordinates?.geometry?.location) {
      axios
        .get(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.geometry.location.lat}&lng=${coordinates.geometry.location.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        )
        .then((res) => dispatch(setHomeData(res?.data?.data)))
        .catch((err) => console.log(err));
    }
  }, [coordinates, dispatch]);

  if (homeData.communication) {
    return <NoService />;
  }

  return (
    <div
      className={`lg:w-[75%] w-full left-1/2 px-5 -translate-x-1/2 absolute top-24 ${
        locationClick || menuClick || cartClick
          ? "max-h-[85vh] overflow-hidden"
          : ""
      } `}
    >
      <OnYourMind />
      <TopRestaurant />
      <WithOnlineDelivery />
    </div>
  );
};

export default HomeContainer;
