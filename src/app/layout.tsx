import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/layouts/Navbar';

export const metadata: Metadata = {
  title: 'BDAI',
  icons: {
    icon: './bdai-logo.png',
    shortcut: './bdai-logo.png',
    apple: './bdai-logo.png',
  },
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
