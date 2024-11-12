"use client"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";

const TopNav = ({ onClick }) => {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <nav className="flex items-center justify-between py-[20px] px-[20px] border-b border-gray-300">
      <div className="flex items-center z-[3]">
        <HiMenuAlt1 
          className="lg:hidden block mr-[10px]"
          size={"30px"}
          onClick={onClick}
        />
        <img src="logo.png" alt="" loading="lazy" className="md:h[120px] md:w-[280px] h-[30px] w-[180px]"/>
        {/* <h3 className="font-bold text-xl">Translatoverse</h3> */}
      </div>
      <div className="flex items-center gap-[10px]">
        <SignedIn>
          <UserButton appearance={{
                    elements: {
                      rootBox: {
                        width: "30px",
                        height: "30px",
                        transform: "scale(1.2)", // Increases size
                      },
                    },
                  }}/>
        </SignedIn>
        <p className="text-lg hidden md:block">{user?.username}</p>
      </div>
    </nav>
  );
};

export default TopNav;
