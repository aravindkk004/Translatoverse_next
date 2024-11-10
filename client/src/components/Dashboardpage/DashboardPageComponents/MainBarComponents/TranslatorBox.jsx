"use client";
import { useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

const TranslatorBox = () => {
  const [translating, setTranslating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [inputText, setInputText] = useState("");

  const handleInputText = () => {
    console.log("hellow");
  }

  return (
    <>
      <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-[20px] justify-center relative sm:flex-row w-full">
        <InputBox
          handleInputText={handleInputText}
          inputText={inputText}
          setSelectedFile={setSelectedFile}
          setFileType={setFileType}
        />
        <FaArrowRightArrowLeft
          size={"40px"}
          className="absolute top-[48%] sm:left-[47%] md:left-[48%] sm:top-[20px] text-white bg-blue-700 p-2 rounded-full"
        />
        <OutputBox
          // selectedLanguage={selectedLanguage}
          // translation={translation}
          // handleLanguageChange={handleLanguageChange}
          // bookmark = {handleBookmark}
        />
      </div>
      <button
        className="w-[92%] rounded-xl text-xl py-3 my-4 bg-blue-700 text-white"
        // onClick={handleTranslation}
        // disabled={translating}
      >
        {translating ? "Translating..." : "Translate"}
      </button>
    </div>
    </>
  )
}

export default TranslatorBox