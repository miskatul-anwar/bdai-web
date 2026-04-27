import React, { useState } from 'react';
import { Search, Play, Code } from 'lucide-react';

export default function SparqlTool() {
  const [query, setQuery] = useState(`SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}
LIMIT 25`);

  return (
    <main className="min-h-screen bg-[#ecf0f1] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0c2461] flex items-center justify-center text-white">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c2461]">SPARQL Tool</h1>
            <p className="text-sm text-gray-500">Query the BDAI Knowledge Graph</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Query editor */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0c2461]/5 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[#0c2461]">
                <Code className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">SPARQL Query</span>
              </div>
              <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0c2461] text-white text-xs font-bold rounded-full hover:bg-[#1a3a8a] transition-colors">
                <Play className="w-3 h-3" /> Run
              </button>
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-56 p-4 font-mono text-sm text-gray-700 resize-none focus:outline-none bg-white"
              spellCheck={false}
            />
          </div>

          {/* Endpoint info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0c2461] mb-3 text-sm">Endpoint</h3>
              <div className="bg-gray-50 rounded-xl px-3 py-2">
                <p className="font-mono text-xs text-gray-500 break-all">https://sparql.bdai.example/query</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">— Placeholder endpoint</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0c2461] mb-3 text-sm">Example Queries</h3>
              <div className="space-y-2">
                {['List all sectors', 'Find researchers', 'Show objectives', 'Count triples'].map((ex, i) => (
                  <button
                    key={i}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-[#0c2461]/5 text-xs text-gray-600 font-medium transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results placeholder */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-[#0c2461]/5 border-b border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0c2461]/60">Results</span>
          </div>
          <div className="p-6 text-center text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm italic">— Run a query to see results here.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
