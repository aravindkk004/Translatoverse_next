import ContactForm from "./HomePageComponents/ContactForm";
import FaqSection from "./HomePageComponents/FaqSection";
import Features from "./HomePageComponents/Features";
import Footer from "./HomePageComponents/Footer";
import Hero from "./HomePageComponents/Hero";
import NavBar from "./HomePageComponents/NavBar";
import Testimonials from "./HomePageComponents/Testimonials/Testimonials";

const HomePageLayout = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Features />
      <Testimonials  />
      <FaqSection />
      <ContactForm />
      <Footer />
    </>
  );
};

export default HomePageLayout;
