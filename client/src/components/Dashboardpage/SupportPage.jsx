const SupportPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col w-[100%] mt-[60px]">
          <h1 className="font-bold text-center text-4xl">
            Need Help? Open a Ticket
          </h1>
          <p className="text-[#637391] text-center">
            Our support will get back to you ASAP via email.
          </p>
        </div>
        <div className=" p-[50px] rounded-lg shadow-xl mt-[30px] md:w-[70%] w-[100%] mx-auto max-w-[1200px]">
          <div>
            <div className="flex flex-col md:flex-row gap-[20px] mb-4">
              <div className="w-full md:w-[48%]">
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your name"
                  className="border border-[#D8DFFF] px-[16px] py-[16px] w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3758f9]"
                />
              </div>
              <div className="w-full md:w-[48%]">
                <label className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="border border-[#D8DFFF] px-[16px] py-[16px] w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3758f9]"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Message
            </label>
            <textarea
              placeholder="Your Message"
              className="border border-[#D8DFFF] px-[16px] py-[16px] w-full h-[120px] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3758f9] resize-none"
            ></textarea>
          </div>
          <button className="h-[50px] w-[190px] bg-[#3758f9] text-white rounded-lg my-[10px]">Sumbit Ticket</button>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
