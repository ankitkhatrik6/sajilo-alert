import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface SubHeaderProps {
  currentPageTitle?: string;
}

export function SubHeader({ currentPageTitle }: SubHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 transition group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="SajiloAlert Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Sajilo<span className="text-[#DC143C]">Alert</span>
            </span>
          </Link>
          {currentPageTitle && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>/</span>
              <span className="text-slate-700">{currentPageTitle}</span>
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Documentation & Demos</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SubHeader;
