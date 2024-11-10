"use client";
import { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { FaThumbsUp, FaThumbsDown, FaRegBookmark } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import countries from "@/components/language";

const OutputBox = ({
  selectedLanguage,
  translation = "",
  handleLanguageChange,
}) => {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  return (
    <>
      <div className="p-[15px] bg-zinc-200 rounded-xl sm:w-[45%] w-[90%]">
        <div className="flex items-center">
          <p className="mr-[10px]">From:</p>
          <div className="flex items-center bg-white rounded-full px-[15px] w-[80%]">
            <TbWorld size={"25px"} />
            <select
              className="w-[100%] p-[10px] rounded-full relative h-[50px] outline-none font-bold"
              defaultValue="ta"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {Object.entries(countries).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div
            id="talltweets"
            className="bg-white mt-[20px] w-full h-[300px] resize-none rounded-lg outline-none p-[10px]"
          >
            {translation}
          </div>
        </div>

        <div className="flex items-center my-[5px] text-white justify-between">
          <div className="flex bg-blue-700 px-[10px] py-[5px] items-center rounded-full">
            <p
              className="cursor-pointer text-sm md:text-base"
            >
              Download
            </p>
            <div>
              <select
                className="w-[100%] bg-blue-500 sm:px-[5px] rounded-full py-[5px] outline-none text-sm md:text-base"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                <option value="pdf">(.pdf)</option>
                <option value="png">(.png)</option>
                <option value="mp3">(.mp3)</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="cursor-pointer">
              <IoShareSocialOutline
                className="bg-white rounded-full p-[7px] text-black"
                size={"30px"}
              />
            </div>

            <div className="cursor-pointer">
              <FaRegBookmark
                className="bg-white rounded-full p-[7px] text-black"
                size={"30px"}
              />
            </div>

            <div className="cursor-pointer">
              <MdContentCopy
                className="bg-white rounded-full p-[7px] text-black"
                size={"30px"}
              />
            </div>
          </div>
        </div>

        <hr className="border-white border-t-4 my-[10px] -ml-[15px] w-[106%]" />

        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="font-bold my-[10px]">Rate this translation...</h2>
          <div className="flex gap-[20px] items-center bg-white rounded-full px-[15px] py-[10px] cursor-pointer ">
            <div className="bg-[#f7f7f7] px-[10px] py-[7px] rounded-2xl flex items-center ">
              <FaThumbsUp className="text-yellow-300" size={"20px"} />
            </div>
            <FaThumbsDown className="text-yellow-300" size={"20px"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OutputBox;