"use client";
import { useState, useEffect } from "react";
import TopNav from "./DashboardPageComponents/TopNav";
import SideNav from "./DashboardPageComponents/SideNav";
import MainBarLayout from "./DashboardPageComponents/MainBarLayout";

const DashboardPageLayout = () => {
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
        <div className="flex h-[89%]">
            <SideNav visible={visible} active={"dashboard"}/>
            <MainBarLayout />
        </div>
      </div>
    </>
  );
};

export default DashboardPageLayout;
