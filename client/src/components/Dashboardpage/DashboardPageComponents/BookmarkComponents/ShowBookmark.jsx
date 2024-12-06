"use client"
import countries from "@/components/language";
import { useEffect, useState } from "react";

const ShowBookmark = ({bookmark}) => {
  const [bookmarkDateTime, setBookmarkDateTime] = useState("");
  useEffect(() => {
    const convertDate = async () => {
      const dateString = bookmark.createdAt;
      const date = new Date(dateString);
      const normalDateTime = date.toLocaleString();
      setBookmarkDateTime(normalDateTime);
    };
    convertDate();
  }, [bookmark]);
  return (
    <>
      <div>
        <div className="flex items-center my-[10px]">
          <p className="font-semibold mr-2">Translation Type:</p>
          <p>{bookmark.translation_type}</p>
        </div>

        {/* Destination Language */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold mr-2">Destination Language:</p>
          <p>{countries[bookmark.destination_language]}</p>
        </div>

        {/* Img/PDF/MP3 URL */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold mr-2">Img/PDF/MP3 URL:</p>
          <p>{bookmark.file_url ? bookmark.file_url : "Not Applicable"}</p>
        </div>

        {/* Input Text */}
        <div className="my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Input Text:</p>
          <div className="w-full border border-gray-200 p-2 rounded-lg max-h-[250px] overflow-y-auto">{bookmark.inputText}</div>
        </div>

        {/* Output Text */}
        <div className="my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Output:</p>
          <div className="w-full border border-gray-200 p-2 rounded-lg max-h-[250px] overflow-y-auto">{bookmark.outputText}</div>
        </div>

        {/* Date and Time of Bookmark Creation */}
        <div className="flex my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Created On:</p>
          <p>{bookmarkDateTime}</p>
        </div>
      </div>
    </>
  );
};

export default ShowBookmark;
