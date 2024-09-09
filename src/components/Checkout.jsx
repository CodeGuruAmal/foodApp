import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiFoodTag } from "react-icons/bi";
import { TbX } from "react-icons/tb";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";
import { setCartClick, setMenuClick } from "../utils/navSlice";
import { clearCart, removeItem, setAddedItem, setCartData } from "../utils/cartSlice";
import toast from "react-hot-toast";

const Checkout = () => {
  const cartData = useSelector((state) => state?.cart?.cartData);
  const addedItem = useSelector((state) => state?.cart?.addedItem);
  const detailsData = useSelector((state) => state.restaurant.detailsData);

  const dispatch = useDispatch();

  // console.log(cartData)

  const [isDescExpanded, setIsDescExpanded] = useState([]);

  const handleRemoveItem = (itemId) => {
    if(cartData.length > 1) {
      dispatch(removeItem(itemId));
      toast.success("Item Removed")
    }
    else {
      handleClearCart();
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is Cleared");

  };

  const toggleIsDescExpanded = (id) => {
    setIsDescExpanded((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });

    // console.log(id)
  };

  const subTotal = cartData.reduce(
    (acc, curVal) =>
      acc + curVal.price / 100 || acc + curVal.defaultPrice / 100,
    0
  );

  const deliveryFee = detailsData?.feeDetails?.totalFee ? detailsData.feeDetails?.totalFee/100 : 0;

  const total = subTotal + deliveryFee;

  if (cartData.length === 0) {
    return (
      <div className="absolute top-5 px-5 w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-[Gilroy-ExtraBold] text-lg">My Cart</h2>
          <TbX
            onClick={() => dispatch(setCartClick(false))}
            className="cursor-pointer text-xl"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center h-[90vh] w-full">
          <h1 className="font-[Gilroy-ExtraBold] text-2xl">
            Your Cart is Empty
          </h1>
          <p className="font-[Gilroy-Medium] text-xs text-neutral-500">
            You can go to home page to view more restaurants
          </p>
          <Link to={"/"}>
            <button
              onClick={() => {
                dispatch(setCartClick(false));
                dispatch(setMenuClick(false));
              }}
              className="font-[Gilroy-Bold] text-white text-sm px-4 py-2 bg-secondaryFont"
            >
              See restaurants near you
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-5 px-5 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-[Gilroy-ExtraBold] text-lg">My Cart</h2>
        <TbX
          onClick={() => dispatch(setCartClick(false))}
          className="cursor-pointer text-xl"
        />
      </div>

      <button
        onClick={handleClearCart}
        className="bg-red-600 px-4 py-2 absolute top-10 font-[Gilroy-Semibold] text-sm right-5 rounded-md text-white"
      >
        Clear
      </button>

      <div className="mt-14">
        <h1 className="text-2xl font-[Gilroy-ExtraBold]">{detailsData.name}</h1>
        <span className="text-xs font-[Gilroy-Semibold] text-neutral-400">
          {detailsData.areaName}
        </span>
      </div>

      <div className="mt-9 flex flex-col gap-3">
        {cartData.map((item, index) => {
          const description = item.description ? item.description : "";
          const trimDescription = description
            ? description.substring(0, 85) + "..."
            : [];

          return (
            <div
              key={index}
              className="items-center flex justify-between  cart-items w-full px-5 py-3 pb-6 bg-white border shadow-sm rounded-xl"
            >
              <div className="w-[75%] flex flex-col">
                <BiFoodTag
                  className={`${
                    item?.itemAttribute?.vegClassifier
                      ? item.itemAttribute.vegClassifier === "VEG"
                        ? "text-green-600"
                        : "text-red-600"
                      : ""
                  }`}
                />

                <h2 className="text-sm font-[Gilroy-Bold] text-neutral-700">
                  {item.name}
                </h2>

                <span className="text-[.8rem] font-[Gilroy-Semibold]">
                  ₹{item.price ? item.price / 100 : item.defaultPrice / 100}
                </span>

                {item?.ratings?.aggregatedRating?.rating && (
                  <div className="items-center flex gap-1">
                    <MdStars className="text-green-600" />{" "}
                    <div className="text-[.65rem] mt-1 font-[Gilroy-Semibold]">
                      <span>{item.ratings.aggregatedRating.rating}</span>{" "}
                      <span>
                        ({item.ratings.aggregatedRating.ratingCountV2})
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-[85%]">
                  {description.length > 85 ? (
                    <p
                      className={`text-[.67rem] font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                    >
                      {isDescExpanded.includes(item.id)
                        ? description
                        : trimDescription}{" "}
                      <button
                        onClick={() => toggleIsDescExpanded(item.id)}
                        className="text-xs font-[Gilroy-Semibold] text-blue-500"
                      >
                        {isDescExpanded.includes(item.id) ? "Less" : "More"}
                      </button>
                    </p>
                  ) : (
                    <p
                      className={`text-[.67rem] font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                    >
                      {description}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative w-[35%]">
                <img
                  className={`w-32 md:w-36 h-28 md:h-32 mx-auto object-cover rounded-lg  ${
                    item.imageId ? "visible" : "invisible"
                  }`}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                  alt=""
                />

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={`bg-white hover:bg-neutral-100 text-red-600 font-[Gilroy-ExtraBold] absolute text-sm shadow-lg border scale-90 lg:scale-95 border-neutral-400 px-6 py-1 rounded left-1/2 -translate-x-1/2 ${
                    item.imageId ? "-bottom-3" : "top-1/2"
                  }`}
                >
                  REMOVE
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full p-5 border-2 bg-white shadow-sm mt-5 mb-5 rounded-xl">
        <h2 className="font-[Gilroy-ExtraBold] text-secondaryFont text-2xl">
          Bill Details:
        </h2>
        <div className="w-full border-b border-neutral-400 pb-4 mb-4 flex flex-col gap-2 text-sm text-neutral-600 mt-5 font-[Gilroy-Semibold]">
          <div className="flex items-center justify-between">
            <span>Subtotal:</span> <span>₹{parseFloat(subTotal.toFixed(2))}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Deliveryfee:</span> <span>₹{deliveryFee}</span>
          </div>
        </div>

        <div className="text-xl font-[Gilroy-Bold] flex items-center justify-between">
          <span>Total:</span>
          <span>₹{parseFloat(total.toFixed(2))}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
