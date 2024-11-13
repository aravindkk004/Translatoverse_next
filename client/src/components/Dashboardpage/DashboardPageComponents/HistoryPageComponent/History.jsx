import { useState } from "react";

const History = () => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText((prev) => !prev);
  };

  const inputText =
    "To make the form responsive and apply a 70% width for the box while ensuring the flexbox layout works well on different screen sizes, you can use Tailwind's responsive utility classes. To make the form responsive and apply a 70% width for the box while ensuring the flexbox layout works well on different screen sizes, you can use Tailwind's responsive utility classes.";

  const truncatedText = inputText.slice(0, 200) + (inputText.length > 50 ? "..." : "");

  return (
    <>
      <div className="bg-yellow-200 md:w-[80%] py-[10px] px-[20px] rounded-md my-[10px]">
        <div className="flex">
          <p className="font-bold mr-[5px]">Translation Type:</p>
          <p>Text</p>
        </div>
        <div className="flex">
          <p className="font-bold mr-[5px] text-nowrap">Input text:</p>
          <p className="max-w-[150ch]">
            {showFullText ? inputText : truncatedText}
            <button
              onClick={toggleText}
              className="text-blue-500 ml-2 underline"
            >
              {showFullText ? "Show Less" : "Show More"}
            </button>
          </p>
        </div>
        <div className="flex">
          <p className="font-bold mr-[5px]">Output Text:</p>
          <p>output</p>
        </div>
      </div>
    </>
  );
};

export default History;
