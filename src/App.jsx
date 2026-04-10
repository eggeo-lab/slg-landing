import React from "react";
import Noise from "./components/ui/Noise";
import Navbar from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Approach from "./components/sections/Approach";
import Systems from "./components/sections/Systems";
import SocialProof from "./components/sections/Proof";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

// TODO: Add routing for /terms, /privacy, /licensing (e.g., react-router-dom)
// TODO: Add analytics events and conversion tracking at the app level

function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-brand-bg">
      <Noise />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Approach />
        <div id="systems">
          <Systems />
        </div>
        <div id="trust">
          <SocialProof />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
