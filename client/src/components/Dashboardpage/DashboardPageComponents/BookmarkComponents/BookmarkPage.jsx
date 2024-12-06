import { useEffect, useState } from "react";
import Bookmark from "./Bookmark";
import axios from "axios";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await axios.get("/api/bookmark/get_bookmark");
        setBookmarks(response.data);
        console.log("Fetched Bookmarks:", response.data);
      } catch (error) {
        console.log("Error fetching bookmarks:", error);
      }
    };
    fetchBookmark();
  }, []);

  useEffect(() => {
    console.log("Bookmarks state after set:", bookmarks);
  }, [bookmarks]);

  return (
    <>
      <main className="lg:w-[85%] h-full p-[10px] overflow-y-scroll w-full">
        <h2 className="font-bold text-4xl text-center mt-[20px]">
          Your Bookmarks
        </h2>

        {/* Grid layout with proper responsiveness and gap */}
        <div className="flex flex-wrap gap-[20px] bg-yellow justify-evenly my-[30px]">
          {/* Multiple instances of Bookmark */}
          <div className="flex flex-wrap gap-[20px] bg-yellow justify-evenly my-[30px]">
            {bookmarks.length > 0 ? (
              bookmarks.map((bookmark, index) => (
                <Bookmark key={index} bookmark={bookmark} />
              ))
            ) : (
              <p>No bookmarks available</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default BookmarkPage;
