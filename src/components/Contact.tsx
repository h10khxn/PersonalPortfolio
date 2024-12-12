"use client";
import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    // Required field validation
    if (!formState.name) {
      newErrors.name = "Name is required.";
    }

    if (!formState.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!formState.message) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't submit the form if there are validation errors
    }

    setIsSending(true);

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      message: formState.message,
    };

    emailjs
      .send("service_yo42mm6", "template_apklrji", templateParams, "eom1943uSKtoTVMXh")
      .then(() => {
        setIsSent(true);
        setFormState({ name: "", email: "", message: "" });

        // Hide the notification after 3 seconds
        setTimeout(() => setIsSent(false), 3000);
      })
      .catch((error) => console.error("Failed to send email:", error))
      .finally(() => setIsSending(false));
  };

  // Hover Border Gradient Component
  const HoverBorderGradient = ({
    children,
    containerClassName,
    className,
    as: Tag = "button",
    duration = 1,
    clockwise = true,
    ...props
  }: React.PropsWithChildren<
    {
      as?: React.ElementType;
      containerClassName?: string;
      className?: string;
      duration?: number;
      clockwise?: boolean;
    } & React.HTMLAttributes<HTMLElement>
  >) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [direction, setDirection] = useState<Direction>("TOP");

    const rotateDirection = (currentDirection: Direction): Direction => {
      const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    };

    const movingMap: Record<Direction, string> = {
      TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
      LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
      BOTTOM:
        "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
      RIGHT:
        "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    };

    const highlight =
      "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

    useEffect(() => {
      if (!hovered) {
        const interval = setInterval(() => {
          setDirection((prevState) => rotateDirection(prevState));
        }, duration * 1000);
        return () => clearInterval(interval);
      }
    }, [hovered]);

    return (
      <Tag
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex rounded-lg border content-center bg-black/20 hover:bg-black/10 transition duration-300 dark:bg-white/20 items-center justify-center overflow-visible p-px ${containerClassName}`}
        {...props}
      >
        <div className={`w-full text-white z-10 bg-black px-4 py-2 rounded-lg ${className}`}>
          {children}
        </div>
        <motion.div
          className="flex-none inset-0 overflow-hidden absolute z-0 rounded-lg"
          style={{
            filter: "blur(3px)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          initial={{ background: movingMap[direction] }}
          animate={{
            background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
          }}
          transition={{ ease: "linear", duration: 0.4 }}
        />
        <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-lg" />
      </Tag>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Gradient Title */}
        <h2 className="text-5xl font-bold text-center mb-12 animated-gradient-text">
          And That's It! Thank you For Visiting My Portfolio. What's Next? Get In Touch
        </h2>

        {/* Centered Success Notification */}
        {isSent && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#3275F8] to-[#ffffff] text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500 opacity-100 z-50">
            <p className="font-medium">Message sent successfully!</p>
          </div>
        )}

        {/* Error messages */}
        {Object.values(errors).length > 0 && (
          <div className="text-red-500 mb-4">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
              value={formState.message}
              onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
            />
          </div>

          {/* Hover Border Gradient Button */}
          <HoverBorderGradient
            containerClassName="rounded-lg"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-6 py-2"
          >
            {isSending ? (
              <>
                <span>Sending...</span>
                <Send className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </HoverBorderGradient>
        </form>
      </div>
    </section>
  );
}
