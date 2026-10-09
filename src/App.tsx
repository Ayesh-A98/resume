import "./App.css";
import Navbar from "./component/Navbar";
import PageIntroReveal from "./component/loader";
import IntroPage from "./pages/Introduction";
import About from "./pages/Aboutpage"
import Swiperabout from "./pages/Swiperabout"
import Contact from "./pages/Contact"
import Footer from "./pages/Footer"
 // adjust path if introduction.tsx is in pages/ or component/

import { useState } from "react";

function App() {
  const [phase, setPhase] = useState<"intro" | "revealing" | "main">("intro");

  return (
    <>
      {/* Your existing Loader component */}
      <PageIntroReveal onPhaseChange={setPhase} />

      {/* Render Navbar and Main Intro content once the loader reaches "main" phase */}
      {phase === "main" && (
        <>
          <Navbar />

          <main className="relative z-10 w-full ">
            <IntroPage />
           <About/>
            <Swiperabout/>
            <Contact/>
            <Footer/>
          </main>
        </>
      )}
    </>
  );
}

export default App;