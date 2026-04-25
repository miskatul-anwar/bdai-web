import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  Globe, 
  ExternalLink,
  ChevronRight,
  ArrowRightLeft,
  Sparkles,
  BarChart,
  Bot,
  Network,
  Users
} from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { StickyFooter } from './components/layout/StickyFooter';
import { InteractiveNodes } from './components/ui/InteractiveNodes';
import { TextHoverEffect } from './components/ui/text-hover-effect';
import { BentoGrid, BentoGridItem } from './components/ui/BentoGrid';
import { DeviceMockup } from './components/ui/DeviceMockup';
import { ArchitectureVisual } from './components/ui/ArchitectureVisual';
import { CometCard } from './components/ui/comet-card';
import { APP_DATA } from './constants';
import { cn } from './lib/utils';

import { BangladeshMap } from './components/BangladeshMap';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects for background glows
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden pb-32">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Background Liquid Glows with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="fixed top-[-5%] left-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"
      />
      <motion.div 
        style={{ y: y2 }}
        className="fixed top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary-dark/10 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div 
        style={{ y: y3 }}
        className="fixed bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-primary-light/20 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      <Navbar navItems={APP_DATA.menuItems} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-start pt-12 md:pt-16 overflow-hidden bg-primary-dark">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-100 pointer-events-none scale-90 md:scale-75">
          <BangladeshMap />
        </div>
        
        <InteractiveNodes className="py-2 md:py-4 px-4 bg-transparent w-full" containerClassName="bg-transparent">
        <div className="max-w-6xl mx-auto text-center space-y-6 md:space-y-12">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display tracking-tight text-white leading-none max-w-6xl mx-auto drop-shadow-2xl text-center"
          >
            <div className="h-[15rem] md:h-[25rem] xl:h-[30rem] w-full flex items-center justify-center -mt-20 md:-mt-32 -mb-10 md:-mb-24">
              <TextHoverEffect text="BDAI" />
            </div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl md:text-3xl lg:text-5xl font-serif italic text-white leading-[1.3] block relative z-10 px-4 mt-8 max-w-5xl mx-auto"
            >
              Leveraging <span className="font-bold not-italic text-primary-light">B</span>angla <span className="font-bold not-italic text-primary-light">D</span>esh Sectoral 
              Knowledge Graphs and Large 
              Language Models for <span className="font-bold not-italic text-primary-light">A</span>rtificial{" "}
              <span className="font-bold not-italic text-primary-light">I</span>ntelligence-Driven Insights
            </motion.span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-12 pt-12 md:pt-20"
          >
            {APP_DATA.hero.stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + idx * 0.1 }}
                className="text-center min-w-[70px] md:min-w-0"
              >
                <div className="text-2xl md:text-5xl font-bold text-primary-light">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        </InteractiveNodes>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="space-y-12">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="space-y-6"
            >
              <span className="text-primary font-display font-black uppercase tracking-[0.3em] text-xs">Our Vision</span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-ebony leading-[1.1]">
                {APP_DATA.about.vision.title} <span className="text-primary-dark/20 text-4xl md:text-6xl uppercase not-italic font-display font-black tracking-tighter">in Bangladesh.</span>
              </h2>
              <p className="text-xl md:text-2xl text-ebony/70 leading-relaxed font-medium">
                {APP_DATA.about.vision.text}
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="space-y-6 pt-12 border-t border-ebony/5"
            >
              <span className="text-primary-dark/40 font-display font-black uppercase tracking-[0.3em] text-xs">Our Mission</span>
              <h3 className="text-3xl md:text-5xl font-serif italic text-ebony leading-tight">
                {APP_DATA.about.mission.title}
              </h3>
              <p className="text-lg text-ebony/60 leading-relaxed">
                {APP_DATA.about.mission.text}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 mb-4"
            >
              <span className="text-ebony/30 font-display font-black uppercase tracking-[0.3em] text-[10px]">Research Pillars</span>
            </motion.div>
            {APP_DATA.about.researchAreas.map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-[2rem] glass-card border-none bg-white/40 hover:bg-white transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-6 shadow-inner">
                  <area.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-ebony mb-3 uppercase tracking-tight">{area.title}</h4>
                <p className="text-sm text-ebony/60 leading-relaxed font-medium">
                  {area.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-10 md:py-16 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4 md:gap-6"
        >
          <div className="max-w-2xl space-y-1 md:space-y-4">
            <h2 className="text-3xl md:text-6xl font-serif italic text-ebony">Key Focus <span className="text-primary not-italic font-display font-black uppercase tracking-tighter text-2xl md:text-4xl">Sectors</span></h2>
            <p className="text-sm md:text-base text-ebony/60 font-medium">Revolutionizing diverse industries through integrated AI knowledge ecosystems.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 group text-sm">
            View All Sectors <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {APP_DATA.sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, rotateZ: 2 }}
              className="glass p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center text-center space-y-3 md:space-y-6 hover:shadow-2xl transition-all"
            >
              <div className={cn("p-3 md:p-5 rounded-xl md:rounded-3xl bg-primary/5 text-primary shadow-sm")}>
                <sector.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h3 className="font-bold font-display text-sm md:text-lg">{sector.name}</h3>
                <p className="text-[10px] md:text-sm text-ebony/60 leading-tight md:leading-relaxed">{sector.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Objectives Section - Bento Grid */}
      <section id="objectives" className="py-10 md:py-12 px-6 relative overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] opacity-30 pointer-events-none" 
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-8 space-y-2 md:space-y-3"
          >
            <h2 className="text-4xl md:text-7xl font-serif italic text-ebony leading-none">Strategic <span className="text-primary not-italic font-display font-black uppercase tracking-tighter text-2xl md:text-4xl block mt-1 md:mt-2">Objectives</span></h2>
            <p className="text-sm md:text-base text-ebony/60 max-w-2xl mx-auto font-medium">Our roadmap to a digitized, AI-empowered knowledge environment for Bangladesh.</p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto mt-8 md:mt-12 overflow-hidden rounded-3xl md:rounded-[2.5rem] glass border border-white/40 shadow-2xl relative">
            {/* Scroll Hint for Mobile */}
            <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse pointer-events-none opacity-40">
              <div className="bg-primary/20 backdrop-blur-xl p-4 rounded-full border border-primary/30 shadow-xl">
                <ArrowRightLeft className="w-8 h-8 text-primary shadow-primary" />
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[700px] md:min-w-0">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="py-4 md:py-6 px-4 md:px-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 border-b border-primary/10">No.</th>
                    <th className="py-4 md:py-6 px-4 md:px-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 border-b border-primary/10">Strategic Objectives</th>
                    <th className="py-4 md:py-6 px-4 md:px-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 border-b border-primary/10">Assigned Researcher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {APP_DATA.objectives.map((obj, i) => (
                    <motion.tr 
                      key={i}
                      id={obj.id.toLowerCase()}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group hover:bg-primary/[0.02] transition-colors"
                    >
                      <td className="py-6 md:py-8 px-4 md:px-8 align-top">
                        <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 text-primary font-black text-[10px] md:text-xs group-hover:scale-110 transition-transform">
                          {obj.id}
                        </span>
                      </td>
                      <td className="py-6 md:py-8 px-4 md:px-8 align-top space-y-2 md:space-y-3">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="p-1.5 md:p-2 rounded-lg bg-ebony/5 text-ebony group-hover:text-primary transition-colors">
                            <obj.icon className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-ebony uppercase tracking-tight">{obj.title}</h3>
                        </div>
                        <p className="text-xs md:text-sm text-ebony/60 leading-relaxed max-w-2xl">
                          {obj.details}
                        </p>
                      </td>
                      <td className="py-6 md:py-8 px-4 md:px-8 align-top">
                        <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-ebony/5 text-[9px] md:text-[11px] font-bold text-ebony/80 uppercase tracking-wider group-hover:bg-primary/10 group-hover:text-primary transition-colors whitespace-nowrap">
                          <Users className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          {obj.researcher}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-xs md:text-sm font-medium text-ebony/60 italic">
              **We plan to hire <span className="text-primary font-bold">1</span> PostDoc, <span className="text-primary font-bold">3</span> PhDs, <span className="text-primary font-bold">4</span> Masters, <span className="text-primary font-bold">1</span> Research Associate, and <span className="text-primary font-bold">2</span> Research Assistants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Visual */}
      <section id="architecture" className="py-16 px-6">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <ArchitectureVisual />
        </motion.div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-10 md:py-12 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8 space-y-1"
        >
          <h2 className="text-4xl md:text-6xl font-serif italic text-ebony leading-none">Research <span className="text-primary not-italic font-display font-black uppercase tracking-tighter text-xl md:text-3xl block mt-1">Leadership</span></h2>
          <p className="text-ebony/60 max-w-2xl mx-auto font-medium text-sm md:text-base">Leading AI Experts in Bangladesh based at the University of Chittagong.</p>
        </motion.div>

        <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 justify-center items-stretch px-2 md:px-0">
          {APP_DATA.team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex-1 min-w-0"
            >
              <CometCard className="group h-full" rotateDepth={8}>
                <div className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-white/60 h-full flex flex-col transition-all duration-500 hover:bg-white hover:shadow-2xl">
                  {/* Inset Image Container */}
                  <div className="p-1 sm:p-2 md:p-3 pb-0">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg md:rounded-xl bg-primary/5">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-xs md:text-2xl font-bold">
                           {member.initials}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ebony/20 via-transparent to-transparent opacity-40"></div>
                    </div>
                  </div>
                  
                  {/* Compact Content */}
                  <div className="p-1.5 sm:p-3 md:p-5 flex flex-col flex-grow text-center items-center">
                    <div className="inline-block px-1 md:px-2 py-0.25 md:py-0.5 rounded-full bg-primary/10 text-[5px] sm:text-[7px] md:text-[9px] font-bold text-primary mb-1 md:mb-2 uppercase tracking-widest">
                      {member.role}
                    </div>
                    <h3 className="text-[7px] sm:text-[10px] md:text-base font-bold font-display text-ebony leading-tight mb-0.5 md:mb-1 truncate w-full">{member.name}</h3>
                    <p className="text-[5px] sm:text-[7px] md:text-[10px] text-ebony/60 uppercase tracking-tighter font-semibold mb-1 md:mb-2 line-clamp-1">{member.sub}</p>
                    <div className="mt-auto pt-1 md:pt-3 border-t border-slate-100 w-full text-[5px] sm:text-[6px] md:text-[10px] font-bold text-primary/70 tracking-tighter sm:tracking-widest uppercase truncate">
                      {member.specialty}
                    </div>
                  </div>
                </div>
              </CometCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners & Contact Section */}
      <section id="contact" className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-10 md:p-12 rounded-[3.5rem] relative overflow-hidden text-center space-y-12 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-light/10 blur-[100px] -z-10"></div>

          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif italic text-ebony leading-tight italic">
              Get in <span className="text-primary not-italic font-display font-black uppercase tracking-tighter">Touch.</span>
            </h2>
            <p className="text-ebony/60 font-medium">
              Collaborating with global institutions to build the future of AI in Bangladesh.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <a href="mailto:rudra@cu.ac.bd" className="group flex items-center gap-3 px-6 py-3 glass-card !rounded-full !p-3 pr-6 transition-all hover:scale-105 active:scale-95 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-ebony/80 uppercase tracking-widest">Email Us</span>
              </a>
              <a href="tel:+8801778155342" className="group flex items-center gap-3 px-6 py-3 glass-card !rounded-full !p-3 pr-6 transition-all hover:scale-105 active:scale-95 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-ebony/80 uppercase tracking-widest">+8801778155342</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <StickyFooter />
    </div>
  );
}
