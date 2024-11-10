"use client";
import { useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const TranslatorBox = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ta");
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState("");
  const [translating, setTranslating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const clerkId = user?.id;

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // From translation button
  const handleTranslation = async () => {
    setTranslating(true);
    let translationData = null;

    // Depending on file type, call respective translation function
    if (fileType === "image" && selectedFile) {
      translationData = await imageTranslate(selectedFile, selectedLanguage);
    } else if (fileType === "pdf" && selectedFile) {
      translationData = await pdfTranslate(selectedFile, selectedLanguage);
    } else if (fileType === "voice" && selectedFile) {
      translationData = await audioTranslate(selectedFile, selectedLanguage);
    } else if (fileType === "" || fileType === "text") {
      translationData = await handleTextTranslate(inputText, selectedLanguage);
    }

    if (translationData && translationData.translated_text) {
      setTranslation(translationData.translated_text);
    } else {
      setTranslation("");
    }
    setTranslating(false);
  };

  const handleInputText = (event) => {
    setInputText(event.target.value);
    setSelectedFile(null); // Clear selected file when typing text
  };

  const handleTextTranslate = async (text, language) => {
    if (!text) {
      toast.error("Please enter some text to translate");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/text_translate",
        { text, target_language: language }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        toast.error(response.data.error || "Translation failed.");
        return null;
      }
    } catch (error) {
      console.error("Error during text translation:", error);
      toast.error("Unable to connect to the translation server.");
      return null;
    }
  };

  const handleBookmark = async () => {
    console.log(clerkId);
    // console.log(te);
    console.log(selectedLanguage);
    // console.log(selectedFile);
    console.log(translation);
    try {
      const response = await axios.post("http://localhost:3000/api/bookmark/add_bookmark", {
        clerkId: user.id,
        translation_type: fileType || "text",
        inputText: fileType!== "text"?inputText: "",
        destination_language: selectedLanguage,
        file_url: fileType !== "text" ? selectedFile : null,
        outputText: translation,
      });

      if (response.status === 200) {
        toast.success("Bookmark added successfully.");
      } else {
        toast.error(response.data?.error || "Failed to add bookmark.");
      }
    } catch (error) {
      // console.error("Error adding bookmark:", error);
      toast.error("Error adding bookmark.");
    }
  };

  return (
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
          selectedLanguage={selectedLanguage}
          translation={translation}
          handleLanguageChange={handleLanguageChange}
          handleBookmark={handleBookmark}
        />
      </div>
      <button
        className="w-[92%] rounded-xl text-xl py-3 my-4 bg-blue-700 text-white"
        onClick={handleTranslation}
        disabled={translating}
      >
        {translating ? "Translating..." : "Translate"}
      </button>
    </div>
  );
};

export default TranslatorBox;
