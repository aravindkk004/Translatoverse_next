"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Testimonial from "./Testimonial";

const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section id="review" className="pt-[150px] pb-[70px] font-latin">
      <h2 className="text-center font-general font-bold md:text-4xl text-3xl my-8 font-sans">
        Our customers have nice things to say about us
      </h2>
      <div className="w-full  relative flex items-center justify-center py-[20px]">
        <Slider {...settings} className="slide w-5/6">
            <Testimonial img={"users/user-1.png"} name={"Courtney Henry"} msg={"Amazing! I needed to quickly extract text from images for my work, and this translator did it flawlessly. Just uploaded the image, and it converted everything accurately. Very impressed!"}/>

            <Testimonial img={"users/user-2.png"} name={"Ronald Richards"} msg={"This translator is a lifesaver! I had handwritten notes from a conference that I needed in digital format. It accurately converted my messy handwriting into editable text. Such a time-saver!"}/>

            <Testimonial img={"users/user-3.png"} name={"Bessie Cooper"} msg={"Incredible! I had a PDF document in a foreign language that I needed to translate for a project. This translator handled it seamlessly, maintaining the layout and formatting perfectly. Super impressed with the results!"}/>

            <Testimonial img={"users/user-4.png"} name={"Ilaya"} msg={"Simple and effective! I often need to translate text snippets for personal use, and this tool makes it a breeze. Just paste the text, select the languages, and voila! Accurate translations every time."}/>

            <Testimonial img={"users/user-5.png"} name={"Prasanna"} msg={"Absolutely fantastic! The voice translation feature is incredibly handy, especially when I'm traveling and need to communicate in different languages. It's fast, accurate, and makes communication so much easier."}/>

            <Testimonial img={"users/user-6.png"} name={"Arun"} msg={"Love the history saving feature! It's so convenient to revisit previous translations without having to re-enter the text. Great for referencing past work or tracking my language learning progress."}/>

            <Testimonial img={"users/user-3.png"} name={"Vinu"} msg={"The bookmark feature is a game-changer! I frequently translate specific passages or phrases that I want to revisit later. Being able to bookmark them for quick access is incredibly useful. Highly recommended!"}/>
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
