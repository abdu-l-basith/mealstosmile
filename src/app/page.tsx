import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Vision from "@/components/Vision";
import Donate from "@/components/Donate";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Vision />
        <Donate />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
