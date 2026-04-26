import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform,
  useMotionValueEvent
} from "motion/react";
import { cn } from "../../lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";

export const Navbar = ({ navItems }: { navItems: any[] }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Removed scroll-hide logic as requested to make navbar always visible

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={cn(
            "flex w-full fixed top-0 inset-x-0 mx-auto z-[5000] px-8 h-14 items-center justify-between",
            "bg-primary-dark"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-dark font-bold text-base">B</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              BD<span className="text-primary-light">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative group px-1">
                <a
                  href={item.href}
                  className="px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-white transition-colors flex items-center gap-1 rounded-full hover:bg-white/10"
                  onMouseEnter={() => {}}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform opacity-50" />}
                </a>
                
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-[5001]">
                    <div className="glass p-2 rounded-2xl overflow-hidden border border-white/40 shadow-2xl bg-white/95 backdrop-blur-xl">
                      {item.children.map((child: any, cIdx: number) => (
                        <a
                          key={cIdx}
                          href={child.href}
                          className="block px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-ebony/60 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </motion.nav>
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[6000] bg-primary-dark md:hidden p-6 flex flex-col text-white"
          >
            <div className="flex justify-between items-center mb-8 text-white">
              <span className="text-2xl font-bold font-display">BD<span className="text-primary-light">AI</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {navItems.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <a 
                    href={item.href} 
                    className="text-xl font-bold uppercase tracking-widest text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.children && (
                    <div className="pl-4 space-y-3 border-l border-white/10">
                      {item.children.map((child: any, cIdx: number) => (
                        <a 
                          key={cIdx} 
                          href={child.href} 
                          className="block text-white/60 font-medium uppercase tracking-widest text-xs hover:text-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
