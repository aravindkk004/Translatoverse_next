"use client"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";

const TopNav = ({ onClick }) => {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will ensure that content only renders on the client
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server-side
  }

  return (
    <nav className="flex items-center justify-between py-[20px] px-[20px] border-b border-gray-300">
      <div className="flex items-center z-[3]">
        <HiMenuAlt1 
          className="lg:hidden block mr-[10px]"
          size={"30px"}
          onClick={onClick}
        />
        <h3 className="font-bold text-xl">Translatoverse</h3>
      </div>
      <div className="flex items-center gap-[10px]">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <p className="text-lg">{user?.username}</p>
      </div>
    </nav>
  );
};

export default TopNav;
