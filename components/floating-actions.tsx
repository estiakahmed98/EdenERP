"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "8801842781978";
const WHATSAPP_MESSAGE =
  "Hi, আমি Adon ERP সম্পর্কে জানতে চাই। আপনাদের ERP সলিউশন সম্পর্কে বিস্তারিত জানাবেন?";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 400);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {showScrollTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-background/90 text-primary shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#25D366] bg-background/90 text-[#25D366] shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-xl"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  );
}
