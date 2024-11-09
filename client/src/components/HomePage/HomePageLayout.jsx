import ContactForm from "./HomePageComponents/ContactForm";
import Footer from "./HomePageComponents/Footer";
import Hero from "./HomePageComponents/Hero";
import NavBar from "./HomePageComponents/NavBar";
import Testimonials from "./HomePageComponents/Testimonials";

const HomePageLayout = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
};

export default HomePageLayout;
