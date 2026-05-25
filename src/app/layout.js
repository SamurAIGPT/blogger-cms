import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blogger CMS - Manage and Publish Blogs Easily",
  description: "Discover Blogger CMS, a powerful tool for managing and publishing blogs with advanced AI-powered editing and SEO features.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-dvh w-full" style={{ colorScheme: 'light' }}>
      <body className={`${inter.variable} ${outfit.variable} h-full w-full flex flex-col antialiased bg-slate-50 text-slate-900`}>
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
