import { useState, useEffect } from "react";
import { IntroBlocks } from "./animation";

interface PageIntroRevealProps {
  onPhaseChange?: (phase: "intro" | "revealing" | "main") => void;
}

export default function PageIntroReveal({ onPhaseChange }: PageIntroRevealProps) {
  const [phase, setPhase] = useState<"intro" | "revealing" | "main">("intro");
  const [fade, setFade] = useState(0);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (phase !== "revealing") return;
    let raf: number;
    function step() {
      setFade((f) => {
        const next = f + 0.03;
        if (next >= 1) {
          setPhase("main");
          return 1;
        }
        raf = requestAnimationFrame(step);
        return next;
      });
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // 🔧 FIX: fully unmount the overlay once done, instead of leaving
  // an empty fixed full-viewport div sitting behind everything forever.
 if (phase === "main") return null;

return (
  <div
    style={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100dvh",
      zIndex: 0,
   
    }}
  >
    {/* phase is guaranteed to be "intro" or "revealing" here — no need to check !== "main" */}
    {phase === "intro" && (
      <div style={{ position: "absolute", inset: 0, opacity: 1 - fade }}>
        <IntroBlocks onDone={() => setPhase("revealing")} />
      </div>
    )}
    {phase === "revealing" && (
      <div style={{ position: "absolute", inset: 0, opacity: fade }} />
    )}
  </div>
);
  
}