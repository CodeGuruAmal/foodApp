import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import RestaurantMenu from "./components/RestaurantMenu";
import Search from "./components/Search";
import RestaurantForFood from "./components/RestaurantForFood";
import SearchResult from "./searchComponents/SearchResult";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/menu/:id" element={<RestaurantMenu />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:result" element={<SearchResult />} />
        <Route
          path="/restaurants_by_food/:id"
          element={<RestaurantForFood />}
        />
      </Routes>
    </div>
  );
};

export default App;
