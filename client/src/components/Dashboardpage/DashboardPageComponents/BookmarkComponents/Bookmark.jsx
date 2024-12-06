import { FiTrash } from "react-icons/fi";
import { useState, useEffect, useReducer } from "react";
import countries from "@/components/language";
import Modal from "@/components/Modal";
import ShowBookmark from "./ShowBookmark";
import axios from "axios";
import { toast } from "react-toastify";

const Bookmark = ({ bookmark }) => {
  const [bookmarkDateTime, setBookmarkDateTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const convertDate = async () => {
      const dateString = bookmark.createdAt;
      const date = new Date(dateString);
      const normalDateTime = date.toLocaleString();
      setBookmarkDateTime(normalDateTime);
    };
    convertDate();
  }, [bookmark]);

  const handleCloseModel = () => {
    setIsModalOpen(false); // This will close the modal
  };
  const bookmarkId = bookmark._id;
  const deleteBookmark = async () => {
    try {
      const response = await axios.delete("/api/bookmark/delete-bookmark", {
        data: { bookmarkId },
      });
      if (response.status === 200) {
        toast.success("Deleted Successfully");
      } else {
        toast.error("Error while deleting");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="shadow-lg rounded-lg h-[350px] w-[300px] p-[20px] border border-gray-200 mb-[50px]">
        {/* Bookmark header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Bookmark</h3>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={deleteBookmark}
          >
            <FiTrash size={20} />
          </button>
        </div>

        {/* Translation Type */}
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
        <div className="flex items-center my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Input Text:</p>
          <p className="truncate w-[50ch]" title="Click to view full text">
            {bookmark.inputText}
          </p>
        </div>

        {/* Output Text */}
        <div className="flex items-center my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Output:</p>
          <p className="truncate w-[50ch]" title="Click to view full text">
            {bookmark.outputText}
          </p>
        </div>

        {/* Date and Time of Bookmark Creation */}
        <div className="flex my-[10px]">
          <p className="font-semibold text-nowrap mr-2">Created On:</p>
          <p>{bookmarkDateTime}</p>
        </div>

        {/* Bookmark Tags (Optional) */}
        <div className="flex gap-2 mt-4" onClick={handleOpenModal}>
          <span className="bg-blue-200 text-blue-800 text-sm py-2 px-5 rounded-md cursor-pointer">
            Show more
          </span>
          {/* <span className="bg-green-200 text-green-800 text-sm py-1 px-2 rounded-lg">Urgent</span> */}
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ShowBookmark bookmark={bookmark} />
        </Modal>
      </div>
    </>
  );
};

export default Bookmark;
