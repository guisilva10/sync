"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { ChevronRight, Menu, X, Moon, Sun, CompassIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

import { useTheme } from "next-themes";
import Support from "./_components/support";
import HeroSection from "./_components/landingpage/hero-section";
import FeaturesSection from "./_components/landingpage/features-section";
import HowItWorks from "./_components/landingpage/how-it-works";
import { TestimonialsMarquee } from "./_components/landingpage/testimonials-section";
import FAQSection from "./_components/landingpage/faq-section";
import CTASection from "./_components/landingpage/cta-section";
import Footer from "./_components/landingpage/footer";
import AcceptCookies from "./_components/landingpage/accept-cookies";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <AcceptCookies />
      <div className="flex min-h-[100dvh] flex-col">
        <header
          className={`sticky top-0 z-50 w-full px-6 backdrop-blur-lg transition-all duration-300 ${
            isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
          }`}
        >
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <div className="from-primary to-primary/70 flex size-8 items-center justify-center rounded-lg bg-gradient-to-r text-white">
                <CompassIcon className="size-4 text-white" />
              </div>
              <span>Sync</span>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="size-[18px]" />
                ) : (
                  <Moon className="size-[18px]" />
                )}
                <span className="sr-only">Alternar tema</span>
              </Button>
              <Button className="rounded-full" asChild>
                <Link href="/auth/sign-in" className="flex items-center">
                  Comece Agora
                  <ChevronRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="size-[18px]" />
                ) : (
                  <Moon className="size-[18px]" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
                <span className="sr-only">Alternar menu</span>
              </Button>
            </div>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-background/95 absolute inset-x-0 top-16 border-b backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2 border-t pt-2">
                  <Button className="rounded-full" asChild>
                    <Link href="/auth/sign-in" className="flex items-center">
                      Comece Agora
                      <ChevronRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </header>
        <main className="relative w-full lg:max-w-screen">
          <div className="bg-background absolute inset-0 -z-10 h-screen w-full animate-pulse bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] transition-all duration-1000 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] after:absolute after:inset-0 after:bg-[#9f1239] after:opacity-20 after:blur-3xl dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]" />
          <HeroSection />
          <FeaturesSection />
          <HowItWorks />
          <TestimonialsMarquee />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
      <Support />
    </>
  );
}
