import Bookmark from "./Bookmark";

const BookmarkPage = () => {
  return (
    <>
      <main className="lg:w-[85%] h-full p-[10px] overflow-y-scroll w-full">
        <h2 className="font-bold text-4xl text-center mt-[20px]">
          Your Bookmarks
        </h2>

        {/* Grid layout with proper responsiveness and gap */}
        <div className="flex flex-wrap gap-[20px] bg-yellow justify-evenly my-[30px]">
          {/* Multiple instances of Bookmark */}
          <Bookmark />
          <Bookmark />
          <Bookmark />
          <Bookmark />
          <Bookmark />
          <Bookmark />
          <Bookmark />
          <Bookmark />
          <Bookmark />
        </div>
      </main>
    </>
  );
};

export default BookmarkPage;
