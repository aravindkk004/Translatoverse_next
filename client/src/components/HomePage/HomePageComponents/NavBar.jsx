"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";

export default function NavBar() {
  //   const { userId } = useAuth();
  const [isToggle, setIstoggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section id="navbar">
        {/* <nav className="py-5 fixed top-0 w-full flex items-center justify-between px-4 lg:px-20 bg-white"> */}
        <nav
          className={`py-5 fixed top-0 w-full flex items-center justify-between px-4 lg:px-20 ${
            isScrolled ? "bg-white shadow-md" : "bg-transparent"
          } transition-colors duration-300`}
        >
          <div className="logo flex items-center w-1/4">
            {/* <img src="" alt="" loading="lazy" /> */}
            <h1 className="text-2xl font-bold z-20">TranslatoVerse</h1>
          </div>
          <div className="nav-items hidden lg:flex items-center">
            <ul className="flex items-center text-lg ">
              <li className="px-4 hover:text-customHoverColor">
                <a href="#hero">Home</a>
              </li>
              <li className="px-4 hover:text-customHoverColor">
                <a href="#features">Features</a>
              </li>
              <li className="px-4 hover:text-customHoverColor">
                <a href="#review">Reviews</a>
              </li>
              <li className="px-4 hover:text-customHoverColor">
                <a href="#contactForm">Contact</a>
              </li>
            </ul>
          </div>
          <div className="btn w-1/4 lg:justify-end lg:flex hidden">
            <Link
              href={"/sign-in"}
              className={`${
                isScrolled ? "bg-customHoverColor text-white" : "bg-white"
              } px-8 py-2 rounded-full`}
            >
              Login
            </Link>
          </div>

          <RiMenu3Fill
            size={"2rem"}
            className="lg:hidden"
            onClick={() => setIstoggle(!isToggle)}
          />

          {isToggle && (
            <div className="toggle-bar h-screen w-3/4 md:w-1/2 bg-white shadow-xl absolute top-0 left-0 px-5 py-20 z-2">
              <ul className="text-lg">
                <li className="px-4 py-2 hover:text-customHoverColor">
                  <a href="#hero" className="flex items-center">
                    <IoHome className="mr-2" />
                    Home
                  </a>
                </li>
                <li className="px-4 py-2 hover:text-customHoverColor">
                  <a href="#features" className="flex items-center">
                    <FaTools className="mr-2" />
                    Features
                  </a>
                </li>
                <li className="px-4 py-2 hover:text-customHoverColor">
                  <a href="#review" className="flex items-center">
                    <FaStar className="mr-2" />
                    Reviews
                  </a>
                </li>
                <li className="px-4 py-2 hover:text-customHoverColor">
                  <a href="#contactForm" className="flex items-center">
                    <IoMdContact className="mr-2" />
                    Contact
                  </a>
                </li>
              </ul>
              <IoMdClose
                className="absolute top-5 right-5 cursor-pointer"
                size={"2rem"}
                onClick={() => setIstoggle(!isToggle)}
              />
            </div>
          )}
        </nav>
        <Image
          className="banner-shape absolute top-0 right-0 -z-[1] lg:-top-28 w-full max-w-[20%] lg:max-w-[23%] lg:w-auto"
          src="banner-shape.svg"
          alt=""
          width={20}
          height={20}
        />
      </section>
    </>
  );
}
