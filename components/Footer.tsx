import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer id="main-footer" className="border-t border-slate-200 bg-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 rounded-md overflow-hidden flex-shrink-0 transition group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="SajiloAlert Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">
              Sajilo<span className="text-[#DC143C]">Alert</span>
            </span>
          </Link>
        </div>

        {/* Legal & Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
          <Link
            href="/privacy"
            className="hover:text-[#DC143C] transition-colors py-1"
          >
            Privacy Policy
          </Link>
          <Link
            href="/disclaimer"
            className="hover:text-[#DC143C] transition-colors py-1"
          >
            Disclaimer
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#DC143C] transition-colors py-1"
          >
            Terms & License
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#003893] transition-colors py-1"
          >
            Contact & Support
          </Link>
        </nav>

        {/* Attribution */}
        <div className="text-xs sm:text-sm font-medium text-slate-500 text-center md:text-right">
          Developed by <span className="font-semibold text-slate-800">Ankit Khatri KC</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
