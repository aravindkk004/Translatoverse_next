"use client"
import { useEffect, useState } from "react";
import TopNav from "@/components/Dashboardpage/DashboardPageComponents/TopNav";
import SideNav from "@/components/Dashboardpage/DashboardPageComponents/SideNav";
import HistoryPage from "@/components/Dashboardpage/DashboardPageComponents/HistoryPageComponent/HistoryPage";

const Page = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setVisible(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function setvisibility() {
    setVisible(!visible);
  }
  return (
    <>
      <div className="h-[100vh]">
        <TopNav onClick={setvisibility} />
        <div className="flex h-[87%]">
          <SideNav visible={visible} active={"history"} />
          {/* <MainBarLayout /> */}
          <HistoryPage />
        </div>
      </div>
    </>
  );
};

export default Page;
