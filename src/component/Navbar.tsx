import { useState, useEffect } from "react";

interface NavLink {
  label: string;
  id: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    function handleScroll(): void {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: "Introduction", id: "introduction" },
    { label: "About us", id: "about" },
    { label: "Project", id: "projects" },
  
    { label: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const pattern: number[][] = [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ];

  function renderPixelA(keyPrefix: string) {
    return (
      <div className="flex flex-col gap-[2px]">
        {pattern.map((row, r) => (
          <div key={`${keyPrefix}-row-${r}`} className="flex gap-[2px]">
            {row.map((cell, c) => (
              <div
                key={`${keyPrefix}-cell-${r}-${c}`}
                className={`w-[3px] h-[3px] ${cell ? "bg-white" : "bg-transparent"}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-center px-4 transition-all duration-300 ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div className="w-full max-w-5xl bg-[#FFC309] rounded-2xl overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-1.5">
            {renderPixelA("a1")}
            {renderPixelA("a2")}
          </div>

          <p className="hidden md:block text-white font-mono text-sm tracking-widest">
            Portfolio
          </p>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex flex-col gap-1.5 w-7"
          >
            <span
              className={`h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[600px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-[#f6ceb4]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-white text-xl border-b border-[#f6ceb4] hover:bg-[#f6ceb4] transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-3">
            <a
              href="https://github.com/Ayesh-A98"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-4 border border-[#f6ceb4] rounded-lg text-white text-sm font-mono tracking-wider hover:bg-[#f6ceb4] transition-colors text-center"
            >
              Github
            </a>

            <div className="flex gap-3">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-4 bg-[#f6ceb4] rounded-lg text-black text-sm font-mono tracking-wider hover:bg-white transition-colors text-center"
              >
                Whatsapp
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-4 bg-[#f6ceb4] rounded-lg text-black text-sm font-mono tracking-wider hover:bg-white transition-colors text-center"
              >
                Linkedin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}