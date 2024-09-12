import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  setAddedItem,
  setCartData,
  setIsDiffResMessage,
  setResInfo,
} from "../utils/cartSlice";
import toast from "react-hot-toast";

const AddItem = ({card}) => {

    const resInfo = useSelector((state) => state?.cart?.resInfo);
    const cartData = useSelector((state) => state?.cart?.cartData);
    const addedItem = useSelector((state) => state?.cart?.addedItem);
    const dispatch = useDispatch();

    const handleAddToCart = (data, resData) => {
        const isAdded = cartData.find((item) => item.id === data.id);
    
        if (!isAdded) {
          if (resInfo.id === resData.id || resInfo.length === 0) {
            dispatch(setCartData(data));
            dispatch(setAddedItem(data.id));
            dispatch(setResInfo(resData));
            toast.success("Item Added");
          } else {
            dispatch(setIsDiffResMessage(true));
          }
        } else {
          toast.error("Item Already Added");
        }
      };

  return (
    <button
              onClick={() => handleAddToCart(card.info, card.restaurant.info)}
              className={`bg-white hover:bg-neutral-100 text-green-600 font-[Gilroy-ExtraBold] absolute -bottom-3 shadow-lg border scale-90 md:scale-100 border-neutral-400 px-6 py-1 rounded left-1/2 -translate-x-1/2`}
            >
              {addedItem.includes(card.info.id) ? "ADDED" : "ADD"}
            </button>
  )
}

export default AddItem