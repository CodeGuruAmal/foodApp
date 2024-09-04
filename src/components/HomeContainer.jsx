import React, { useEffect } from "react";
import OnYourMind from "../homeComponents/OnYourMind";
import TopRestaurant from "../homeComponents/TopRestaurant";
import WithOnlineDelivery from "../homeComponents/WithOnlineDelivery";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHomeData } from "../utils/homeSlice";
import NoService from "./NoService";

const HomeContainer = () => {
  const locationClick = useSelector((state) => state.nav.locationClick);
  const menuClick = useSelector((state) => state.nav.menuClick);
  const cartClick = useSelector((state) => state.nav.cartClick);
  const homeData = useSelector((state) => state.home.homeData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const dispatch = useDispatch();


  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${
          coordinates?.geometry?.location?.lat
            ? coordinates?.geometry?.location?.lat
            : 19.0759837
        }&lng=${
          coordinates?.geometry?.location?.lng
            ? coordinates?.geometry?.location?.lng
            : 72.8776559
        }&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      )
      .then((res) => dispatch(setHomeData(res?.data?.data)))
      .catch((err) => console.log(err));
  }, [
    coordinates?.geometry?.location?.lat,
    coordinates?.geometry?.location?.lng,
  ]);

  if (homeData.communication) {
    return <NoService />;
  } else {
    return (
      <div
        className={`md:w-[75%] w-full left-1/2 px-5 -translate-x-1/2 absolute top-24 ${
          locationClick || menuClick || cartClick ? "max-h-[85vh] overflow-hidden" : ""
        } `}
      >
        <OnYourMind />
        <TopRestaurant />
        <WithOnlineDelivery />
      </div>
    );
  }
};

export default HomeContainer;
