import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/src/layouts/Navbar';

export const metadata: Metadata = {
  title: 'BDAI',
  description:
    'BanglaDesh Sectoral Knowledge Graphs and Large Language Models for Artificial Intelligence-Driven Insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#ecf0f1] font-sans">
          <Navbar />
          <div className="pt-14">{children}</div>
        </div>
      </body>
    </html>
  );
}
