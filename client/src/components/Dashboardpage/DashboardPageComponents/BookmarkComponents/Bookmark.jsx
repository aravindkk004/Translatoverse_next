import { FiTrash } from 'react-icons/fi'; 
import { useState, useEffect } from 'react';

const Bookmark = () => {
  const [bookmarkDateTime, setBookmarkDateTime] = useState('');
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-US', options);
  };
  useEffect(() => {
    const currentDate = new Date();
    setBookmarkDateTime(formatDate(currentDate)); 
  }, []);

  return (
    <>
      <div className="shadow-lg rounded-lg h-[350px] w-[300px] p-[20px] border border-gray-200 mb-[50px]">
        {/* Bookmark header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Bookmark</h3>
          <button className="text-red-500 hover:text-red-700">
            <FiTrash size={20} />
          </button>
        </div>

        {/* Translation Type */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold mr-2">Translation Type:</p>
          <p>Text</p>
        </div>

        {/* Destination Language */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold mr-2">Destination Language:</p>
          <p>Tamil</p>
        </div>

        {/* Img/PDF/MP3 URL */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold mr-2">Img/PDF/MP3 URL:</p>
          <p>url</p>
        </div>

        {/* Input Text */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Input Text:</p>
          <p className="truncate w-[50ch]" title="Click to view full text">
            To make the form responsive and apply a 70% width for the box while
            ensuring the flexbox layout works well on different screen sizes,
            you can use Tailwind&apos;s responsive utility classes.
          </p>
        </div>

        {/* Output Text */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Output:</p>
          <p className="truncate w-[50ch]" title="Click to view full text">
            To make the form responsive and apply a 70% width for the box while
            ensuring the flexbox layout works well on different screen sizes,
            you can use Tailwind&apos; s responsive utility classes.
          </p>
        </div>

        {/* Date and Time of Bookmark Creation */}
        <div className="flex my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Created On:</p>
          <p>{bookmarkDateTime}</p>
        </div>

        {/* Bookmark Tags (Optional) */}
        <div className="flex gap-2 mt-4">
          <span className="bg-blue-200 text-blue-800 text-sm py-2 px-5 rounded-md cursor-pointer">Show more</span>
          {/* <span className="bg-green-200 text-green-800 text-sm py-1 px-2 rounded-lg">Urgent</span> */}
        </div>
      </div>
    </>
  );
};

export default Bookmark;
