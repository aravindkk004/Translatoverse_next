import { useRef, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";

const fileTypes = [
  { value: "pdf", label: "PDF", icon: "/google-drive.png" },
  { value: "image", label: "Image", icon: "/imgicon.png" },
  { value: "voice", label: "Voice", icon: "/voiceicon.png" },
];

const InputBox = ({
  handleInputText,
  inputText,
  setFileType,
  setSelectedFile,
}) => {
  const [selectedFileType, setSelectedFileType] = useState(fileTypes[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);

  const handleTopDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileDrop(selectedFile);
  };

  const handleTextareaChange = (event) => {
    handleInputText(event);
    setSelectedImage(null);
    setSelectedPdf(null);
    setSelectedAudio(null);
    setSelectedFile(null);
  };

  const handleFileTypeChange = (fileType) => {
    setSelectedFileType(fileType);
    setDropdownOpen(false);
    setSelectedImage(null);
    setSelectedPdf(null);
    setSelectedAudio(null);
    setFileType(fileType.value);
    setSelectedFile(null);
  };

  const handleFileDrop = (file) => {
    if (!file) return;

    if (selectedFileType.value === "image" && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setSelectedPdf(null);
      setSelectedAudio(null);
    } else if (
      selectedFileType.value === "pdf" &&
      file.type === "application/pdf"
    ) {
      setSelectedImage(null);
      setSelectedPdf(file);
      setSelectedAudio(null);
    } else if (
      selectedFileType.value === "voice" &&
      file.type.startsWith("audio/")
    ) {
      setSelectedImage(null);
      setSelectedPdf(null);
      setSelectedAudio(file);
    } else {
      // File type does not match selected file type
      alert(
        `Selected file type '${selectedFileType.label}' does not match the dropped file type.`
      );
      return;
    }

    setFileType(selectedFileType.value);
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    handleFileDrop(droppedFile);
  };

  return (
    <div
      className="p-[15px] bg-zinc-200 rounded-xl sm:w-[45%] w-[90%]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="flex items-center">
        <p className="mr-[10px]">From:</p>
        <div className="flex items-center bg-white rounded-full px-[15px] w-[80%]">
          <TbWorld size={"25px"} />
          <select className="w-[100%] p-[10px] rounded-full relative h-[50px] outline-none font-bold">
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {!selectedImage && !selectedPdf && !selectedAudio && (
        <div>
          <textarea
            className="bg-white mt-[20px] w-full h-[300px] resize-none rounded-lg outline-none p-[10px]"
            onChange={handleTextareaChange}
            value={inputText}
          />
        </div>
      )}

      {selectedImage && (
        <div className="flex justify-center my-4">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            className="max-w-full h-[300px] rounded-lg"
          />
        </div>
      )}

      {selectedPdf && (
        <div className="flex justify-center my-4">
          <iframe
            src={URL.createObjectURL(selectedPdf)}
            title="Selected PDF"
            width="100%"
            height="300px"
            style={{ border: "none" }}
          />
        </div>
      )}

      {selectedAudio && (
        <div className="flex justify-center my-4">
          <audio controls className="w-full">
            <source
              src={URL.createObjectURL(selectedAudio)}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="flex items-center text-white my-[5px]">
        <MdKeyboardVoice
          size={"40px"}
          className="bg-blue-700 p-2 rounded-full"
        />
      </div>

      <hr className="border-white border-t-4 my-[10px] -ml-[15px] w-[106%]" />

      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="font-bold my-[10px]">Drop your documents here!</h2>
        <div className="flex items-center bg-white rounded-full px-[15px] py-[10px] cursor-pointer">
          <p className="font-semibold" onClick={handleTopDivClick}>
            Choose files
          </p>
          <div className="bg-[#f7f7f7] px-[10px] py-[7px] rounded-xl ml-[10px] flex items-center relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={selectedFileType.icon}
                alt={selectedFileType.label}
                className="h-[20px] mr-[5px]"
              />
              {selectedFileType.label}
              <IoMdArrowDropdown />
            </div>
            {dropdownOpen && (
              <div className="absolute top-[100%] left-0 bg-white border mt-[5px] rounded-lg z-10">
                {fileTypes.map((fileType) => (
                  <div
                    key={fileType.value}
                    className="flex items-center px-[10px] py-[5px] cursor-pointer hover:bg-gray-200"
                    onClick={() => handleFileTypeChange(fileType)}
                  >
                    <img
                      src={fileType.icon}
                      alt={fileType.label}
                      className="h-[20px] mr-[5px]"
                    />
                    {fileType.label}
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              accept={
                selectedFileType.value === "pdf"
                  ? ".pdf"
                  : selectedFileType.value === "image"
                  ? "image/*"
                  : "audio/*"
              }
              className="opacity-0 absolute h-0 w-0"
              onChange={handleFileInputChange}
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBox;