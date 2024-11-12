import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section id="hero" className="lg:px-20 px-10 pt-[120px] pb-[70px]">
        <div className="herobar flex gap-10 items-center justify-center lg:flex-row flex-col">
          <div className="header w-full lg:w-1/2">
            <h2 className="lg:text-5xl md:text-4xl sm:text-4xl text-2xl lg:font-semibold font-bold mb-3 font-title">
              Empower Global Connections: Translate with Ease!
            </h2>
            <p className="text-gray-500 text-base">
              Translate text, PDFs, images, and voice to Indian languages
              seamlessly. Break language barriers with ease using
              TranslatoVerse.
            </p>
            <Link href="/dashboard">
              <button className="mt-3 bg-customHoverColor rounded-full px-10 py-2 text-white hover:shadow-lg">
                Get started
              </button>
            </Link>
          </div>
          <div className="hero-img z-2 lg:w-1/2 w-full flex items-center justify-center">
            <img
              src="hero-img.png"
              alt=""
              width={"400px"}
              className="z-9 lg:w-3/4 sm:w-1/2 w-3/4 md:w-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
