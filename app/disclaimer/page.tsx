import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldAlert, Code2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { SubHeader } from '../../components/SubHeader';
import { Footer } from '../../components/Footer';

export const metadata = {
  title: 'Disclaimer — SajiloAlert',
  description: 'Legal disclaimer and warranty notices for the SajiloAlert open-source library.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pt-16">
      <SubHeader currentPageTitle="Disclaimer" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <span className="text-[#DC143C]">Disclaimer</span>
        </div>

        {/* Hero title */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Terms & Safety</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Legal Disclaimer</h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Please read this disclaimer carefully before integrating SajiloAlert into your commercial or personal software applications.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {/* Section 1: Provided "AS IS" */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-3">
              <Code2 className="w-5 h-5 text-[#DC143C]" />
              <h2 className="text-lg font-bold text-slate-900">1. &ldquo;AS IS&rdquo; Software Provision</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              SajiloAlert is provided as open-source software under the MIT License &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;, without warranty of any kind, either express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              While we strive to provide a robust, cross-browser, highly accessible modal and alert utility, the author does not guarantee that the software will be uninterrupted, error-free, or compatible with every legacy browser environment.
            </p>
          </div>

          {/* Section 2: Limitation of Liability */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldAlert className="w-5 h-5 text-[#003893]" />
              <h2 className="text-lg font-bold text-slate-900">2. Limitation of Liability</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              In no event shall the author, contributors, or copyright holders (including Ankit Khatri KC) be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Developers integrating this library into financial, medical, critical infrastructure, or sensitive authentication workflows are solely responsible for testing and ensuring adequate fallbacks.
            </p>
          </div>

          {/* Section 3: Interactive Demo & Playground Code */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">3. Interactive Demos & Code Examples</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              The code snippets and interactive demonstrations on this portal are provided for educational and illustrative purposes. Developers should adapt configuration options, promise timeouts, and keyboard focus traps according to their own application&rsquo;s specific requirements.
            </p>
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
