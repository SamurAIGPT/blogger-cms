"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaCoins, FaUser, FaBlog, FaSignOutAlt, FaGoogle } from "react-icons/fa";
import { SiVercel } from "react-icons/si";
import clsx from "clsx";

const navLinks = [
  { name: "Blog Editor", href: "/" },
  { name: "My Blogs", href: "/manage/blog-list" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          <FaBlog className="text-indigo-600 text-lg" />
          <span>Blogger CMS</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm font-semibold transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 underline underline-offset-4 decoration-2"
                    : "text-slate-500 dark:text-slate-400"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full shadow-sm">
              <FaCoins className="text-amber-500 text-xs animate-bounce" />
              <span>{session.user.credits ?? 0} Credits</span>
            </span>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-slate-700 shadow-inner">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                    <FaUser className="text-xs" />
                  </div>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-slate-700 dark:text-slate-300">
                {session.user.name?.split(" ")[0]}
              </span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <FaSignOutAlt className="text-xs" />
              <span className="hidden md:inline">Sign out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-750 rounded-lg shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <FaGoogle className="text-xs" />
            <span>Sign in with Google</span>
          </button>
        )}

        <a
          href="https://vercel.com/new/clone?repository-url=https://github.com/SamurAIGPT/blogger-cms"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-all font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-slate-900/10"
        >
          <SiVercel className="text-xs" />
          Deploy
        </a>
      </div>
    </nav>
  );
}
