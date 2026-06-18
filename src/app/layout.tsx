import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bista AI — Autonomous AI Agents & Intelligent Automation",
  description:
    "We build AI-powered products, Intelligent Document Processing, AI agents, and workflow automation systems that reduce manual effort and accelerate business growth.",
  keywords: [
    "AI agents",
    "Intelligent Document Processing",
    "Workflow Automation",
    "Agentic AI",
    "Bista Doc AI",
    "Enterprise Automation",
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
