"use client";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <>
      <section
        id="footer"
        className="bg-[#f0f0f0] grid lg:grid-cols-4 md:grid-cols-2 pt-[120px] pb-[120px] gap-10 px-[40px]"
      >
        <div className="web-det">
          <h2 className="text-xl font-bold">TranslatoVerse</h2>
          <p className="text-gray-500">Break down your language barriers.</p>
        </div>
        <div className="social">
          <h3 className="text-xl font-bold">Social</h3>
          <address className="text-gray-500 my-3">
            <a href="mailto:translatoverse@gmail.com">
              translatoverse@gmail.com
            </a>
          </address>
          <div className="icons flex flex-wrap gap-5">
            <div className="bg-white p-3 rounded-full cursor-pointer hover:bg-[#fe6044]">
              <FaYoutube className="text-red-600 hover:text-white" />
            </div>
            <div className="bg-white p-3 rounded-full cursor-pointer hover:bg-[#fe6044]">
              <FaLinkedinIn className="text-blue-800 hover:text-white" />
            </div>
            <div className="bg-white p-3 rounded-full cursor-pointer hover:bg-[#fe6044]">
              <FaXTwitter className="text-black hover:text-white" />
            </div>
            <div className="bg-white p-3 rounded-full cursor-pointer hover:bg-[#fe6044]">
              <FaInstagram className="text-pink-400 hover:text-white" />
            </div>
          </div>
        </div>
        <div className="link">
          <h3 className="text-xl font-bold">Quick links</h3>
          <div className="flex flex-col my-3 text-gray-500">
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#review">Review</a>
            <a href="#contactForm">Contact</a>
          </div>
        </div>
        <div className="address">
          <h3 className="text-xl font-bold">Location</h3>
          <address className="mt-2 text-gray-500">
            PSNACET, kothandaraman nagar
          </address>
          <address className="mb-2 text-gray-500">Dindigul-625011.</address>
          <a href="tel:+919342610087" className="my-2 text-gray-500">
            +919342610087
          </a>
        </div>
      </section>
      <p className="p-3 text-center">Copyright &copy; {year} | All rights reserved.</p>
    </>
  );
};

export default Footer;
