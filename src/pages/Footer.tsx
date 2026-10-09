import { Mail, ArrowUpRight } from "lucide-react";



const NAME = "Ayesha";
const ROLE = "Software Engineer";
const EMAIL = "browine.222@gmaill.com";

interface ExploreLink {
  label: string;
  id: string;
}

interface ConnectLink {
  label: string;
  href: string;
  icon?: typeof Mail;
}

const links: { explore: ExploreLink[]; connect: ConnectLink[] } = {
  explore: [
    { label: "Home", id: "introduction" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ],
  connect: [
    { label: "GitHub", href: "https://github.com/Ayesh-A98" },
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
    { label: "Email", href: `mailto:${EMAIL}`, icon: Mail },
  ],
};

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#FDC700] text-white relative overflow-hidden">
      {/* subtle dot-grid texture, dev-desk feel */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Top: availability strip */}
        <div className="flex items-center gap-2 mb-12 text-sm font-mono text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          available for internships &amp; freelance work
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight">{NAME}</h2>
            <p className="text-white mt-1 font-mono text-sm"> {ROLE}</p>
            <p className="text-white mt-4 max-w-sm leading-relaxed">
              Building clean, functional interfaces and full-stack projects —
              from dashboards to design systems. Currently exploring React,
              Next.js, and everything in between.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {links.explore.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/90 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {links.connect.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-white hover:text-white transition-colors duration-150 inline-flex items-center gap-2"
                  >
                    {Icon && <Icon size={16} />}
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white">
          <p>&copy; {new Date().getFullYear()} {NAME}. All rights reserved.</p>
          <p className="font-mono">built with React &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  );
}