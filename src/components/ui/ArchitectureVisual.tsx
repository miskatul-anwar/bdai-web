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
    number: "01",
    name: "Master Plan Layer",
    desc: "Governs the overall strategy and SDG alignment (SDGs 2, 4, 9, 10, 17).",
    icon: Map,
    color: "text-primary-dark",
    bg: "bg-primary/10",
    depth: 0
  },
  {
    id: "analysis",
    number: "02",
    name: "Analysis Layer",
    desc: "Provides descriptive, diagnostic, predictive, and prescriptive insights.",
    icon: BarChart3,
    color: "text-primary",
    bg: "bg-primary/5",
    depth: 1
  },
  {
    id: "application",
    number: "03",
    name: "Application Layer",
    desc: "Natural Language Interfaces (NLI) and AI-powered interactions for end-users.",
    icon: Layout,
    color: "text-primary-light",
    bg: "bg-primary/5",
    depth: 2
  },
  {
    id: "federation",
    number: "04",
    name: "Federation Layer (Model, Meta)",
    desc: "Managed metadata and unified models linking diverse sectoral datasets.",
    icon: Network,
    color: "text-primary-dark",
    bg: "bg-primary/10",
    depth: 3
  },
  {
    id: "knowledge-graph",
    number: "05",
    name: "Knowledge Graph (Semantic Layer)",
    desc: "The core semantic enriched layer using ontologies and linked data principles.",
    icon: Cpu,
    color: "text-primary",
    bg: "bg-primary/5",
    depth: 4
  },
  {
    id: "semantic",
    number: "06",
    name: "Semantic Layer",
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
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-6 md:mb-12">
            <h1 className="text-4xl md:text-8xl font-serif italic text-ebony leading-none mb-4">
              System <span className="text-primary not-italic font-display font-black uppercase tracking-tighter text-2xl md:text-5xl block mt-2">Architecture</span>
            </h1>
            <p className="text-ebony/60 max-w-2xl mx-auto font-medium text-sm md:text-lg">
              A comprehensive multi-layered ecosystem designed for seamless data flow, 
              robust security, and intelligent AI-driven insights for Bangladesh.
            </p>
          </div>
        }
      >
        <div className="bg-white/95 backdrop-blur-3xl h-full w-full rounded-2xl flex flex-col p-6 md:p-10 items-center overflow-auto border border-white/40 shadow-2xl">
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-primary/10">
             <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
             </div>

          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {ARCH_LAYERS.map((layer, idx) => (
              <div
                key={layer.id}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={cn(
                  "relative group cursor-pointer transition-all duration-500",
                  "glass-card p-4 md:p-6 flex items-start gap-4 rounded-3xl",
                  hoveredLayer === layer.id ? "bg-white shadow-2xl ring-1 ring-primary/20 -translate-y-1" : "border-white/40 opacity-80"
                )}
              >
                <div className={cn(
                  "p-3 md:p-4 rounded-2xl transition-all duration-300 shrink-0",
                  layer.bg,
                  hoveredLayer === layer.id ? "scale-110 shadow-lg bg-primary text-white" : ""
                )}>
                   <layer.icon className={cn("w-6 h-6", hoveredLayer === layer.id ? "text-white" : layer.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                      {layer.number}
                    </span>
                    <h3 className="text-sm md:text-base font-black text-ebony uppercase tracking-tight">
                      {layer.name}
                    </h3>
                  </div>
                  <p className="text-ebony/60 text-xs font-medium leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </ContainerScroll>
    </div>
  );
};
