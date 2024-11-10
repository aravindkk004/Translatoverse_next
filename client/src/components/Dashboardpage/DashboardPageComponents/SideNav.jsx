import { IoHome } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

const SideNav = ({ visible, active }) => {
  const [activeBar, setActiveBar] = useState(active);

  const navItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: <IoHome size={"20px"} />,
      path: "/dashboard",
    },
    {
      id: "history",
      label: "History",
      icon: <LuHistory size={"20px"} />,
      path: "/history",
    },
    {
      id: "bookmark",
      label: "Bookmark",
      icon: <FaBookmark size={"20px"} />,
      path: "/bookmark",
    },
    {
      id: "support",
      label: "Support",
      icon: <BiSupport size={"20px"} />,
      path: "/support",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="w-[18%] h-full relative border-r border-gray-400 px-6 hidden lg:block">
        {navItems.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`my-[20px] px-[20px] py-[10px] rounded-lg cursor-pointer ${
                activeBar === item.id ? "bg-blue-700 text-white" : " text-black"
              }`}
              onClick={() => setActiveBar(item.id)}
            >
              <p className="flex items-center text-lg">
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </p>
            </div>
          </Link>
        ))}
        <Link href="/logout">
          <div className="absolute bottom-7 px-[20px] py-[10px] cursor-pointer">
            <p className="flex items-center text-lg">
              <MdLogout className="mr-[15px]" size={"20px"} />
              Logout
            </p>
          </div>
        </Link>
      </nav>

      {/* Mobile Sidebar */}
      {visible && (
        <nav className="w-[54%] h-full top-0 pt-[85px] absolute left-0 bg-white z-[2] border-r border-gray-400 px-6">
          {navItems.map((item) => (
            <Link href={item.path} key={item.id}>
              <div
                key={item.id}
                className={`my-[20px] px-[20px] py-[10px] rounded-lg cursor-pointer ${
                  activeBar === item.id
                    ? "bg-blue-700 text-white"
                    : "text-black"
                }`}
                onClick={() => setActiveBar(item.id)}
              >
                <p className="flex items-center text-lg">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </p>
              </div>
            </Link>
          ))}
          <div className="absolute bottom-7 px-[20px] py-[10px] cursor-pointer">
            <p className="flex items-center text-lg">
              <MdLogout className="mr-[15px]" size={"20px"} />
              Logout
            </p>
          </div>
        </nav>
      )}
    </>
  );
};

export default SideNav;
