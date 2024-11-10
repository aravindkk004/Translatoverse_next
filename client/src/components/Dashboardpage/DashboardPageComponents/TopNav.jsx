"use client";
import { HiMenuAlt1 } from "react-icons/hi";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

const TopNav = ({ onClick }) => {
  const { user } = useUser();
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
