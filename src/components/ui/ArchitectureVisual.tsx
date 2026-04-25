import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Network, 
  Database, 
  Layers, 
  Cpu, 
  Layout, 
  BarChart3, 
  Map,
  ChevronRight,
  Sparkles,
  Smartphone
} from "lucide-react";
import { cn } from "../../lib/utils";
import { ContainerScroll } from "./container-scroll-animation";

const ARCH_LAYERS = [
  {
    id: "master",
    name: "Master plan Layer",
    desc: "Governs the overall strategy and SDG alignment (SDGs 2, 4, 9, 10, 17).",
    icon: Map,
    color: "text-primary-dark",
    bg: "bg-primary/10",
    depth: 0
  },
  {
    id: "analysis",
    name: "Analysis Layer",
    desc: "Provides descriptive, diagnostic, predictive, and prescriptive insights.",
    icon: BarChart3,
    color: "text-primary",
    bg: "bg-primary/5",
    depth: 1
  },
  {
    id: "application",
    name: "Application Layer",
    desc: "Natural Language Interfaces (NLI) and AI-powered interactions for end-users.",
    icon: Layout,
    color: "text-primary-light",
    bg: "bg-primary/5",
    depth: 2
  },
  {
    id: "federation",
    name: "Federation Layer (Model, Meta)",
    desc: "Managed metadata and unified models linking diverse sectoral datasets.",
    icon: Network,
    color: "text-primary-dark",
    bg: "bg-primary/10",
    depth: 3
  },
  {
    id: "semantic",
    name: "Knowledge Graph (semantic layer)",
    desc: "The core semantic enriched layer using ontologies and linked data principles.",
    icon: Cpu,
    color: "text-primary",
    bg: "bg-primary/5",
    depth: 4
  },
  {
    id: "data",
    name: "Data Layer",
    desc: "Raw data sources (RDF, PDF, Text, XML, Databases) processed for ingestion.",
    icon: Database,
    color: "text-primary-dark",
    bg: "bg-primary/10",
    depth: 5
  }
];

export const ArchitectureVisual = () => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  return (
    <div className="flex flex-col overflow-hidden py-8">
      <ContainerScroll
        className="max-w-[360px] md:max-w-[420px] aspect-[9/19] h-[500px] md:h-[650px]"
        titleComponent={
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-8xl font-serif italic text-ebony leading-none mb-3">
              Project <span className="text-primary not-italic font-display font-black uppercase tracking-tighter text-2xl md:text-4xl block mt-2">Architecture</span>
            </h1>
            <p className="text-ebony/60 max-w-2xl mx-auto font-medium text-sm md:text-base">
              A multi-layered ecosystem for seamless data flow and intelligent processing, 
              visualized in a hierarchical stack.
            </p>
          </div>
        }
      >
        <div className="bg-white/80 backdrop-blur-xl h-full w-full rounded-2xl flex flex-col p-3 md:p-5 items-center overflow-y-auto overflow-x-hidden border border-white/40 hide-scrollbar shadow-2xl">
          <div className="w-full flex items-center justify-between mb-4 md:mb-6 pb-3 border-b border-primary/10">
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             </div>
          </div>

          <div className="w-full space-y-2 relative pb-12">
            {ARCH_LAYERS.map((layer, idx) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: idx * 0.1 }
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={cn(
                  "relative group cursor-pointer transition-all duration-300",
                  "glass-card p-2 md:p-3 flex items-center gap-2 md:gap-3 rounded-2xl md:rounded-3xl",
                  hoveredLayer === layer.id ? "scale-[1.03] border-primary/30 bg-white shadow-lg" : "border-white/40"
                )}
              >
                <div className={cn(
                  "p-2.5 md:p-3 rounded-xl transition-all duration-300 shrink-0",
                  layer.bg,
                  hoveredLayer === layer.id ? "scale-110 shadow-sm" : ""
                )}>
                  <layer.icon className={cn("w-5 h-5", layer.color)} />
                </div>
                
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="text-xs md:text-sm font-bold text-ebony truncate uppercase tracking-wide">
                    {layer.name}
                  </h3>
                  <AnimatePresence>
                    {hoveredLayer === layer.id && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-ebony/60 text-[10px] mt-1 font-medium leading-tight"
                      >
                        {layer.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hierarchical Connecting Line */}
                {idx < ARCH_LAYERS.length - 1 && (
                  <div className="absolute left-[34px] md:left-[42px] top-full h-3 w-px bg-primary/10 -z-10" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-auto pt-6 text-center w-full">
             <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-ebony/30">
                BDAI Hierarchical Model
             </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
};
