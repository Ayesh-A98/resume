import React, { useState, useRef, useMemo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, XCircle, Loader2 } from "lucide-react";

/* =========================================================
   1. CONTINUOUS FALLING BRICKS BACKGROUND
   ========================================================= */
interface Brick {
  id: number;
  size: number;
  initialX: string;
  initialY: string;
  targetX: number;
  targetY: number;
  color: string;
  borderColor: string;
  fallSpeed: number;
  initialRotation: number;
  delay: number;
  repeatDelay: number;
}

const FallingBricksBackground: React.FC = () => {
  const bricks = useMemo<Brick[]>(() => {
    const totalCols = 10;
    const totalRows = 4;
    const brickSize = 28;
    const gap = 12;

    const list: Brick[] = [];
    let count = 0;

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalCols; col++) {
        // Skip specific slots to build a dynamic grid pattern
        if ((row + col) % 3 === 0) continue;

        const isYellow = count % 2 === 0;

        // Target coordinates centered at the bottom of the section
        const targetX = (col - totalCols / 2) * (brickSize + gap);
        const targetY = row * (brickSize + gap);

        list.push({
          id: count,
          size: brickSize,
          initialX: `${Math.random() * 80 + 10}vw`,
          initialY: `-${Math.random() * 60 + 20}vh`,
          targetX,
          targetY,
          color: isYellow ? "rgba(234, 179, 8, 0.85)" : "rgba(255, 255, 255, 0.9)",
          borderColor: isYellow ? "rgba(202, 138, 4, 0.4)" : "rgba(203, 213, 225, 0.8)",
          fallSpeed: Math.random() * 0.8 + 1.2,
          initialRotation: (Math.random() - 0.5) * 180,
          delay: Math.random() * 4,
          repeatDelay: Math.random() * 2 + 1,
        });

        count++;
      }
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white">
      {/* Anchor for the pattern formed at the bottom */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-0 h-0">
        {bricks.map((brick) => (
          <motion.div
            key={brick.id}
            style={{
              position: "absolute",
              width: brick.size,
              height: brick.size,
              backgroundColor: brick.color,
              border: `1px solid ${brick.borderColor}`,
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
            initial={{
              y: brick.initialY,
              x: brick.initialX,
              rotate: brick.initialRotation,
              opacity: 0,
            }}
            animate={{
              // Keyframes: drop -> lock into pattern -> fade out -> loop continuously
              y: [brick.initialY, brick.targetY, brick.targetY, brick.targetY],
              x: [brick.initialX, brick.targetX, brick.targetX, brick.targetX],
              rotate: [brick.initialRotation, 0, 0, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: brick.fallSpeed + 2,
              delay: brick.delay,
              repeat: Infinity,
              repeatDelay: brick.repeatDelay,
              times: [0, 0.4, 0.85, 1],
              ease: ["easeIn", "linear", "easeOut"],
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   2. CONTACT FORM & MAIN COMPONENT
   ========================================================= */
const CONFIG = {
  SERVICE_ID: "service_yzzild8",
  TEMPLATE_ID: "template_v25e7h8",
  PUBLIC_KEY: "OEBLwwC_MFWiMu6Ry",
};

type Status = "idle" | "sending" | "success" | "error";

interface FormValues {
  title: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>({
    title: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    emailjs
      .sendForm(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, formRef.current, {
        publicKey: CONFIG.PUBLIC_KEY,
      })
      .then(() => {
        setStatus("success");
        setValues({ title: "", name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-white"
    >
      {/* Background with continuous falling bricks */}
      <FallingBricksBackground />

      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-yellow-600 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full mb-4">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Let's build something
          </h2>
          <p className="text-gray-500 mt-2">
            Have a project in mind? Drop a message and I'll get back to you.
          </p>
        </div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-md border border-yellow-100 rounded-2xl shadow-[0_10px_40px_-15px_rgba(234,179,8,0.25)] p-6 sm:p-8 space-y-5"
        >
          <Field
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Subject of your message"
            required
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <Field
            label="Phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="+92 3xx xxxxxxx"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell me a bit more..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100 resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 text-gray-900 font-semibold py-3.5 rounded-xl transition-colors duration-200 shadow-[0_8px_20px_-8px_rgba(234,179,8,0.6)]"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send message
              </>
            )}
          </motion.button>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3"
              >
                <CheckCircle2 size={18} />
                Message sent! I'll reply soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
              >
                <XCircle size={18} />
                Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
      />
    </div>
  );
}