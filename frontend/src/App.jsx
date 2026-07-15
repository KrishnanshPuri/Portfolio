import "./App.css";
import { Toaster } from "sonner";
import { ParticleBackground } from "./components/ParticleBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills.component.jsx";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import ReactGA from "react-ga4";
import { useEffect } from "react";
const TRACKING_ID = "G-1EF5KHBN57"

function App() {
  useEffect(() => {
    
    ReactGA.initialize(TRACKING_ID);
    
   
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  return (
    <div className="App grain relative min-h-screen bg-[#050505] text-white">
       <Toaster
  position="top-right"
  richColors
  closeButton
  expand
  duration={3500}
  theme="dark"
  toastOptions={{
    style: {
      background: "#0A0A0A",
      border: "1px solid rgba(0,255,163,0.35)",
      color: "#ffffff",
      fontFamily: "JetBrains Mono, monospace",
      borderRadius: "0px",
      padding: "16px",
    },
  }}
/>

      
      <ParticleBackground />
      
     
      <div className="relative z-10">
        <Navbar />
        
       
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;