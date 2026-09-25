import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { APP_DATA } from '../../constants';
import { fetchSiteSettings } from '@/lib/api';

export function StickyFooter() {
  const { scrollY } = useScroll();
  const [partnerLogos, setPartnerLogos] = useState(APP_DATA.partners);

  useEffect(() => {
    fetchSiteSettings().then((s) => {
      if (s?.partners && s.partners.length > 0) {
        setPartnerLogos(
          s.partners.map((p) => ({
            name: p.name,
            logo: p.logo,
          }))
        );
      }
    });
  }, []);
  
  // Show the footer after scrolling past 300px
  const y = useTransform(scrollY, [200, 400], [100, 0]);
  const opacity = useTransform(scrollY, [200, 400], [0, 1]);

  return (
    <motion.footer 
      style={{ y, opacity }}
      className="fixed bottom-0 left-0 right-0 z-[50]"
    >
      <div className="w-full glass border-t border-white/40 shadow-2xl px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 -z-10 blur-xl"></div>
        
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ebony/40 whitespace-nowrap">
            Supported By
          </span>
          <div className="h-4 w-px bg-ebony/10 hidden md:block"></div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-6 md:gap-10 flex-grow">
          {partnerLogos.map((partner, i) => (
            <motion.img 
              key={i} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.1, filter: "grayscale(0)" }}
              transition={{ delay: i * 0.1 }}
              src={partner.logo} 
              alt={partner.name}
              className="h-6 md:h-8 w-auto grayscale transition-all duration-500 cursor-pointer object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
