import React from 'react';
import Link from 'next/link';
import { Scale, BookOpen, Check, FileCode, ArrowLeft } from 'lucide-react';
import { SubHeader } from '../../components/SubHeader';
import { Footer } from '../../components/Footer';

export const metadata = {
  title: 'Terms of Service & License — SajiloAlert',
  description: 'Terms of Service, open source MIT licensing, and conditions of use for SajiloAlert.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pt-16">
      <SubHeader currentPageTitle="Terms & License" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <span className="text-[#DC143C]">Terms & License</span>
        </div>

        {/* Hero title */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#003893] border border-blue-100">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#003893] uppercase tracking-wider">Open Source License</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Terms of Service & License</h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            SajiloAlert is distributed as open-source software under the permissive MIT License. You are free to use it in both commercial and private projects.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {/* Section 1: MIT License Text */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <FileCode className="w-5 h-5 text-[#DC143C]" />
              <h2 className="text-lg font-bold text-slate-900">1. MIT License</h2>
            </div>
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-xs sm:text-sm leading-relaxed border border-slate-800">
              <p className="text-slate-400 mb-3">Copyright (c) 2026 Ankit Khatri KC</p>
              <p className="mb-3">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the &quot;Software&quot;), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
              <p className="mb-3">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
              <p className="text-slate-400 uppercase text-[11px]">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </div>
          </div>

          {/* Section 2: Permissions & Restrictions */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4">
              <BookOpen className="w-5 h-5 text-[#003893]" />
              <h2 className="text-lg font-bold text-slate-900">2. Permitted Uses & Guidelines</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>You Are Allowed To:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-900">
                  <li>• Use in commercial software and SaaS apps.</li>
                  <li>• Modify the source code and build custom wrappers.</li>
                  <li>• Bundle with React, Vue, Svelte, or Vanilla JS projects.</li>
                  <li>• Distribute and fork under the MIT license terms.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#DC143C]"></span>
                  <span>Conditions:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>• Retain original copyright notice and license text.</li>
                  <li>• Do not hold the creator liable for production defects.</li>
                  <li>• Respect community contribution standards.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-xs sm:text-sm shadow-2xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to SajiloAlert Documentation</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
