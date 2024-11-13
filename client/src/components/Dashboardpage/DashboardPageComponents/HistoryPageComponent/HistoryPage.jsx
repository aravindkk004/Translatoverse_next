import History from "./History";

const HistoryPage = () => {
  return (
    <>
      <div className="w-full overflow-y-scroll">
        <h2 className="text-3xl text-center font-bold mt-[25px]">History</h2>
        <div className="flex flex-col items-center my-[20px]">
          <History />
          <History />
          <History />
          <History />
          <History />
          <History />
          <History />
          <History />
          <History />
          <History />
          <History />
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
