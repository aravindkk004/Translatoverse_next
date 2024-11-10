const Favourite = () => {
  return (
    <>
      <div className="flex items-center my-[20px] ml-[20px] w-[93%]">
        <h3 className="font-bold mr-[10px]">Trending:</h3>
        <div className="flex items-center overflow-x-auto">
          <p className="border border-gray-300 rounded-full py-2 px-4 text-sm cursor-pointer hover:bg-gray-200 mr-2 whitespace-nowrap">
            English - Tamil
          </p>
          <p className="border border-gray-300 rounded-full py-2 px-4 text-sm cursor-pointer hover:bg-gray-200 mr-2 whitespace-nowrap">
            English - Telugu
          </p>
          <p className="border border-gray-300 rounded-full py-2 px-4 text-sm cursor-pointer hover:bg-gray-200 mr-2 whitespace-nowrap">
            English - Hindi
          </p>
          <p className="border border-gray-300 rounded-full py-2 px-4 text-sm cursor-pointer hover:bg-gray-200 mr-2 whitespace-nowrap">
            English - Punjabi
          </p>
          <p className="border border-gray-300 rounded-full py-2 px-4 text-sm cursor-pointer hover:bg-gray-200 mr-2 whitespace-nowrap">
            English - Gujarati
          </p>
          <p className="border border-gray-300 rounded-full py-2 px-4 text-sm cursor-pointer hover:bg-gray-200 mr-2 whitespace-nowrap">
            English - Marati
          </p>
        </div>
      </div>
    </>
  )
}

export default Favourite