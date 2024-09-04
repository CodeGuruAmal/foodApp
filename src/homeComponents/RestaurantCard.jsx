import React from 'react'
import { MdStars } from "react-icons/md";
import { Link } from 'react-router-dom'

const RestaurantCard = (info) => {

const imgId = info?.cloudinaryImageId;
const offerHeader = info?.aggregatedDiscountInfoV3?.header;
const offerSubHeader = info?.aggregatedDiscountInfoV3?.subHeader;
const name = info?.name;
const rating = info?.avgRating;
const deliveryIem = info?.sla?.slaString;
const cuisines = info?.cuisines;
const area = info?.areaName
  return (
    <Link to={`/menu/${info.link.link.split("/").at(-1)}`}>
        <div
        className="card duration-100 hover:scale-95 w-[12rem] md:w-[14rem] "
      >
        <div className="img-container  w-full h-[8.3rem]  md:h-[10rem] bg-zinc-800 overflow-hidden rounded-2xl relative">
          <img
            className="object-center w-full h-full object-cover "
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${imgId}`}
            alt=""
          />

          <h2 className="absolute bottom-1 left-2 text-lg text-zinc-100 z-10 font-[ProximaNova]">
            <span>{offerHeader}</span>{" "}
            <span>{offerSubHeader}</span>
          </h2>
          <div className="overlay absolute z-5 w-full h-20 rounded-s-xl bg-gradient-to-t from-black to-transparent bottom-0 left-0"></div>
        </div>

        <div className="card-details text-sm scale-95 py-1">
          <h4 className="name font-[Gilroy-Bold] ">{name}</h4>
          <div className="flex -center gap-2">
            <MdStars className={`${rating > 2 ? "text-green-600" : "text-yellow-400"}`} />
            <div>
              <span className="rating font-[Gilroy-Medium]">
                {rating} •{" "}
              </span>{" "}
              <span className="delivery-time font-[Gilroy-Semibold]">
                {deliveryIem}
              </span>
            </div>
          </div>

          <p className="cuisines line-clamp-3 text-nowrap text-zinc-600">
            {cuisines.join(", ")}
          </p>
          <p className="area text-zinc-600">{area}</p>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard