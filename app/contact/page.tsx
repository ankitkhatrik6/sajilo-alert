'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, MessageSquare, Check, User, HelpCircle, ArrowLeft, Bug, Lightbulb, Github } from 'lucide-react';
import { SubHeader } from '../../components/SubHeader';
import { Footer } from '../../components/Footer';
import { alert } from '../../src';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert.error({
        title: 'आवश्यक विवरणहरू खाली छन्',
        message: 'कृपया नाम, इमेल र सन्देश सबै भर्नुहोस्।',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/ankitkhatrik6@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _subject: `SajiloAlert Inquiry [${subject.toUpperCase()}]: ${name.trim()}`,
          inquiryType: subject,
          message: message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        alert.toast.success({
          title: 'सन्देश सफलतापूर्वक पठाइयो!',
          message: 'तपाईंको सन्देश ankitkhatrik6@gmail.com मा पठाइएको छ।',
          position: 'top-right',
        });
      } else {
        throw new Error('Failed to deliver form');
      }
    } catch {
      alert.toast.error({
        title: 'सन्देश पठाउन सकिएन',
        message: 'कृपया पुन: प्रयास गर्नुहोस् वा सिधै ankitkhatrik6@gmail.com मा इमेल गर्नुहोस्।',
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pt-16">
      <SubHeader currentPageTitle="Contact & Support" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <span className="text-[#DC143C]">Contact & Support</span>
        </div>

        {/* Hero title */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-red-50 text-[#DC143C] border border-red-100">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#DC143C] uppercase tracking-wider">Direct Reach & Community</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Contact & Support</h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions, feedback, integration inquiries, or found a bug? Get in touch directly with the creator and maintainer of SajiloAlert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quick Contact Cards */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-[#DC143C] flex items-center justify-center mb-3">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Direct Email</h3>
            <p className="text-xs text-slate-500 mb-3">For business inquiries, collaborations, and questions.</p>
            <a
              href="mailto:ankitkhatrik6@gmail.com"
              className="text-xs font-bold text-[#003893] hover:underline break-all"
            >
              ankitkhatrik6@gmail.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#003893] flex items-center justify-center mb-3">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Author & Maintainer</h3>
            <p className="text-xs text-slate-500 mb-1">Lead Developer</p>
            <p className="text-xs font-bold text-slate-800">Ankit Khatri KC</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <Bug className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Issue Reporting</h3>
            <p className="text-xs text-slate-500 mb-3">Report technical bugs or request new features.</p>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
              Open Source Support
            </span>
          </div>
        </div>

        {/* Interactive Contact Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-slate-900">Send a Message</h2>
            <p className="text-xs sm:text-sm text-slate-500">Fill out this form and we will get back to you promptly.</p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-emerald-900">धन्यवाद! Message Sent Successfully</h3>
              <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                Your inquiry has been received. You can also reach out directly at <span className="font-mono font-semibold">ankitkhatrik6@gmail.com</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-2 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Name (तपाईंको नाम) *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Ankit Khatri"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#DC143C] font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address (इमेल ठेगाना) *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#DC143C] font-medium"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Inquiry Type (विषय)
                </label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#DC143C] font-medium bg-white"
                >
                  <option value="general">General Inquiry / Feedback</option>
                  <option value="bug">Report a Bug / Technical Issue</option>
                  <option value="feature">Feature Request / Suggestion</option>
                  <option value="integration">Project Integration Support</option>
                  <option value="commercial">Commercial / Sponsorship</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Message (सन्देश) *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Type your message or inquiry here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#DC143C] font-medium resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#DC143C] text-white font-bold text-xs sm:text-sm hover:bg-[#b81032] shadow-xs transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>पठाउँदैछ...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Back navigation */}
        <div className="text-center">
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
