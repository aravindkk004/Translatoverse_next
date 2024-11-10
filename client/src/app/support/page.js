"use client"
import { useEffect, useState } from "react";
import TopNav from "@/components/Dashboardpage/DashboardPageComponents/TopNav";
import SideNav from "@/components/Dashboardpage/DashboardPageComponents/SideNav";

const page = () => {
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
          <SideNav visible={visible} active={"support"}/>
          {/* <MainBarLayout /> */}
        </div>
      </div>
    </>
  );
};

export default page;
