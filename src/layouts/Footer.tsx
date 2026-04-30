import React from 'react';
import { Copyright } from 'lucide-react';
const Footer: React.FC = () => {
    return (
        <footer className="sticky bottom-0 w-full bg-[#0c2461] border-t border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Left: BIKE 2024-2026 */}
                    <div className="text-sm font-semibold text-white/80">
                        <Copyright size={14} className="inline-block -mt-0.5" />
                        BIKE 2024-2026
                    </div>

                    {/* Right: Developed By */}
                    <div className="text-sm text-white/70">
                        Developed By{' '}
                        <a
                            href="https://web.bike-csecu.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#60a5fa] hover:text-white transition-colors"
                        >
                            BIKE LAB
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
