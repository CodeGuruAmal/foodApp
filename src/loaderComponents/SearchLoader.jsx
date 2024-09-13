import React from "react";

export const SearchBarLoader = () => {
  return (
    <div className="w-full flex flex-col gap-5 mt-5">
      <div className="w-[90%]  border rounded-sm shadow-md h-5 sm:h-4 shimmer-bg"></div>
      <div className="w-[70%]  border rounded-sm shadow-md h-5 sm:h-4 shimmer-bg"></div>
      <div className="w-[50%]  border rounded-sm shadow-md h-5 sm:h-4 shimmer-bg"></div>
    </div>
  );
};

export const SearchResultLoader = () => {
  return (
    <div className="h-[75vh] absolute left-1/2 shimmer-bg rounded-md border shadow-md -translate-x-1/2 w-full overflow-hidden p-4">

      <div className="w-full h-full flex flex-col gap-6 ">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div key={index} className="w-full bg-white px-4 py-6 flex flex-col gap-4">

              <div className="w-[10%]  border rounded-sm shadow-md h-2 shimmer-bg"></div>
              <div className="w-full  border rounded-sm shadow-md h-2 shimmer-bg"></div>
              <div className="w-[70%] border rounded-sm shadow-md  h-2 shimmer-bg"></div>
              <div className="w-[45%] border rounded-sm shadow-md  h-2 shimmer-bg"></div>
            </div>
          ))}
      </div>
    </div>
  );
};