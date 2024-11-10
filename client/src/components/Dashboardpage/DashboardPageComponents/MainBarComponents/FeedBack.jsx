"use client";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const FeedBack = () => {
  const [feedback, setFeedback] = useState("");

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-[91%] border border-gray-300 my-[20px] p-[15px] rounded-xl h-[230px] sm:h-[200px] relative">
          <h2 className="font-bold mb-[5px]">
            If you have a better sugggestion for this translation,
          </h2>
          <textarea
            className="w-full rounded-xl h-[97px] outline-none border-none py-[5px]"
            onChange={(e) => setFeedback(e.target.value)}
            value={feedback}
            placeholder="write it here"
          ></textarea>
          <button
            className="flex items-center absolute bottom-0 right-[2%] my-[10px] bg-blue-700 text-white rounded-full px-[15px] py-[8px]"
            // onClick={sendEmail}
          >
            Send
            <IoIosSend className="ml-[3px]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
