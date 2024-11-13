"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { SignedIn, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";

export default function NavBar() {
  const { userId } = useAuth();
  const { user } = useUser();
  const isSignedIn = userId ? true : false;
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
        <nav
          className={`py-5 fixed top-0 w-full flex items-center justify-between px-4 lg:px-20 z-[20] ${
            isScrolled ? "bg-white shadow-md" : "bg-transparent"
          } transition-colors duration-300`}
        >
          <div className="logo flex items-center">
            <Link href="/">
              <img
                src="logo.png"
                alt=""
                loading="lazy"
                className="md:h[120px] md:w-[280px] h-[45px] w-[250px]"
              />
            </Link>
            {/* <h1 className="text-2xl font-bold z-20">TranslatoVerse</h1> */}
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
            {isSignedIn ? (
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      rootBox: {
                        width: "20px",
                        height: "20px",
                        transform: "scale(1.2)", // Increases size
                      },
                    },
                  }}
                />
              </SignedIn>
            ) : (
              <Link
                href={"/sign-in"}
                className={`${
                  isScrolled ? "bg-customHoverColor text-white" : "bg-white"
                } px-8 py-2 rounded-full`}
              >
                Login
              </Link>
            )}
          </div>

          <RiMenu3Fill
            size={"2rem"}
            className="lg:hidden"
            onClick={() => setIstoggle(!isToggle)}
          />

          {isToggle && (
            <div className="toggle-bar h-screen w-3/4 md:w-1/2 bg-white shadow-xl absolute top-0 left-0 px-5 py-20 z-2">
              <ul className="text-lg">
                <li className="mb-[10px] px-4 py-2 hover:text-customHoverColor">
                  <a href="#hero" className="flex items-center text-2xl">
                    <IoHome className="mr-5" />
                    Home
                  </a>
                </li>
                <li className="mb-[10px] px-4 py-2 hover:text-customHoverColor">
                  <a href="#features" className="flex items-center text-2xl">
                    <FaTools className="mr-5" />
                    Features
                  </a>
                </li>
                <li className="mb-[10px] px-4 py-2 hover:text-customHoverColor">
                  <a href="#review" className="flex items-center text-2xl">
                    <FaStar className="mr-5" />
                    Reviews
                  </a>
                </li>
                <li className="px-4 py-2 hover:text-customHoverColor">
                  <a href="#contactForm" className="flex items-center text-2xl">
                    <IoMdContact className="mr-5" />
                    Contact
                  </a>
                </li>
              </ul>
              <div className="btn lg:justify-end lg:flex absolute bottom-10 left-[12%]">
                {isSignedIn ? (
                  <div className="flex items-center gap-[10px]">
                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          rootBox: {
                            width: "40px",
                            height: "40px",
                            transform: "scale(1.2)", // Increases size
                          },
                        },
                      }}
                    />
                  </SignedIn>
                  <p className="text-xl font-semibold">{user?.username}</p>
                  </div>
                ) : (
                  <Link
                    href={"/sign-in"}
                    className={`${
                      isScrolled ? "bg-customHoverColor text-white" : "bg-white"
                    } px-8 py-2 rounded-full text-2xl flex items-center`}
                  >
                    <FiLogIn className="mr-5" />
                    Login
                  </Link>
                )}
              </div>
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
