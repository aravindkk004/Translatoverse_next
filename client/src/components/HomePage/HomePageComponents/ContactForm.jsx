import Image from "next/image";

export default function ContactForm() {
  return (
    <>
      <section id="contactForm" className="bg-[#FAFAFA] px-[20px] py-[50px]">
        <h2 className="text-4xl font-bold text-center">Get in touch with us</h2>
        <div className="md:flex my-[40px]">
          <div className=" md:w-1/2 w-full flex -order-1 items-center justify-center">
            <form className="flex flex-col p-2 sm:w-[80%] w-[95%]">
              <label className="text-lg mt-[10px]">Full Name</label>
              <input
                type="text"
                placeholder="Your Full name"
                className="border border-gray-400 rounded-lg p-3 focus:border-[#fe6044] outline-none"
              />
              <label className="text-lg mt-[10px]">Email Address</label>
              <input
                type="email"
                placeholder="Your email"
                className="border border-gray-400 rounded-lg p-3 focus:border-[#fe6044] outline-none"
              />
              <label className="text-lg mt-[10px]">Message</label>
              <textarea
                type="text"
                placeholder="Your Message"
                className="h-[150px] resize-none border border-gray-400 rounded-lg p-3 focus:border-[#fe6044] outline-none mb-[10px]"
              />
              <button className="bg-gradient-to-tr from-orange-500 to-yellow-300 p-3 rounded-xl text-white my-[10px] text-lg">Send Message</button>
            </form>
          </div>
          <div className=" md:w-1/2 w-full flex items-center justify-center">
            <Image
              src="feedback.svg"
              alt="feedbackg image"
              width={400}
              height={400}
              className="lg:h-[400px] md:h-[300px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
