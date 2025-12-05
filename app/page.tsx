import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import SessionInfo from "./components/SessionInfo";
import Support from "./components/Support";
import Footer from "./components/Footer";
import AppointmentInfo from "./components/AppointmentInfo";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import FaqSection from "./components/Faq";
import ContactForm from "./components/ContactForm";
import Specialization from "./components/Specialization";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SessionInfo />
      <AppointmentInfo />
      <WhyChooseUs />
      <Specialization />
      <Testimonials />
      <FaqSection />
      <ContactForm />
      <Support />
      <Footer />
      ...
    </>
  );
}
