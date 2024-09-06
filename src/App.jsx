import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import RestaurantMenu from "./components/RestaurantMenu";
import SearchFood from "./components/SearchFood";
import RestaurantForFood from "./components/RestaurantForFood";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/menu/:id" element={<RestaurantMenu />} />
        <Route path="/searchfood" element={<SearchFood />} />
        <Route path="/restaurants_by_food/:id" element={<RestaurantForFood />} />
      </Routes>
    </div>
  );
};

export default App;
