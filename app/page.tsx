'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  alert,
  type Theme,
  type Language,
  type Position,
  type AlertType,
} from '../src';
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Info,
  Loader2,
  HelpCircle,
  Undo2,
  Terminal,
  Copy,
  Check,
  Languages,
  Palette,
  Play,
  RotateCcw,
  Zap,
  Code2,
  Layers,
  ShieldCheck,
  BookOpen,
  Trash2,
  Plus,
  Menu,
  X,
} from 'lucide-react';
import { Footer } from '../components/Footer';

interface DemoItem {
  id: string;
  name: string;
  category: string;
  updatedAt: string;
}

const INITIAL_ITEMS: DemoItem[] = [
  { id: '1', name: 'वार्षिक बजेट रिपोर्ट (Annual Budget)', category: 'Finance', updatedAt: 'Just now' },
  { id: '2', name: 'कर्मचारी विवरण तालिका (Staff Directory)', category: 'HR', updatedAt: '2 hours ago' },
  { id: '3', name: 'परियोजना प्रस्तावना (Project Proposal)', category: 'Engineering', updatedAt: 'Yesterday' },
];

export default function SajiloAlertDemoPage() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('nepal');
  const [currentLang, setCurrentLang] = useState<Language>('ne');
  const [activeTab, setActiveTab] = useState<'vanilla' | 'react' | 'vue' | 'svelte'>('react');
  const [customizationTab, setCustomizationTab] = useState<'global' | 'scoped' | 'variables'>('global');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Confirm demo state
  const [confirmResult, setConfirmResult] = useState<string | null>(null);

  // Undo list state
  const [items, setItems] = useState<DemoItem[]>(INITIAL_ITEMS);

  // Playground state
  const [pgType, setPgType] = useState<AlertType>('success');
  const [pgTitle, setPgTitle] = useState('सफल भयो!');
  const [pgMessage, setPgMessage] = useState('तपाईंको कार्य सफलतापूर्वक सम्पन्न भयो।');
  const [pgPosition, setPgPosition] = useState<Position>('center');
  const [pgDuration, setPgDuration] = useState<number>(4000);
  const [pgIsToast, setPgIsToast] = useState(false);
  const [pgShowClose, setPgShowClose] = useState(true);

  // Synchronize SajiloAlert global configuration
  useEffect(() => {
    alert.configure({
      theme: currentTheme,
      language: currentLang,
    });
  }, [currentTheme, currentLang]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install sajilo-alert');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  // Demo: Basic Alerts
  const triggerBasicAlert = (type: 'success' | 'error' | 'warning' | 'info' | 'loading') => {
    if (currentLang === 'ne') {
      if (type === 'success') alert.success('काम सफल भयो! तपाईंको डाटा सुरक्षित गरिएको छ।');
      if (type === 'error') alert.error('केही समस्या भयो! कृपया इन्टरनेट जडान जाँच गर्नुहोस्।');
      if (type === 'warning') alert.warning('सावधान! यो कार्य फिर्ता गर्न सकिँदैन।');
      if (type === 'info') alert.info('नयाँ प्रणाली अपडेट उपलब्ध छ।');
      if (type === 'loading') {
        const id = alert.loading('सर्भरमा प्रक्रिया भइरहेको छ...');
        setTimeout(() => {
          alert.update(id, {
            type: 'success',
            title: 'सम्पन्न भयो!',
            message: 'सबै डाटा सफलतापूर्वक लोड भयो!',
          });
        }, 2200);
      }
    } else {
      if (type === 'success') alert.success('Operation succeeded! Data saved safely.');
      if (type === 'error') alert.error('An error occurred! Please check your connection.');
      if (type === 'warning') alert.warning('Warning! This action may have side effects.');
      if (type === 'info') alert.info('New system update is now available.');
      if (type === 'loading') {
        const id = alert.loading('Processing on server...');
        setTimeout(() => {
          alert.update(id, {
            type: 'success',
            title: 'Completed!',
            message: 'All records have been synchronized!',
          });
        }, 2200);
      }
    }
  };

  // Demo: Confirmation
  const triggerConfirm = async () => {
    setConfirmResult(currentLang === 'ne' ? 'प्रतीक्षा गर्दै...' : 'Waiting for decision...');
    const result = await alert.confirm({
      title: currentLang === 'ne' ? 'खाता हटाउने?' : 'Delete Account?',
      message: currentLang === 'ne' ? 'यो कार्य फिर्ता गर्न सकिँदैन। के तपाईं निश्चित हुनुहुन्छ?' : 'This action cannot be undone. Are you sure you want to proceed?',
      confirmText: currentLang === 'ne' ? 'हटाउनुहोस्' : 'Delete',
      cancelText: currentLang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel',
    });

    if (result) {
      setConfirmResult(currentLang === 'ne' ? 'पुष्टि भयो: true (Confirmed)' : 'Result: true (Confirmed)');
      alert.toast.success(currentLang === 'ne' ? 'खाता सफलतापूर्वक हटाइयो।' : 'Account deleted successfully.');
    } else {
      setConfirmResult(currentLang === 'ne' ? 'रद्द गरियो: false (Cancelled)' : 'Result: false (Cancelled)');
      alert.toast.info(currentLang === 'ne' ? 'कार्य रद्द गरियो।' : 'Action cancelled.');
    }
  };

  // Demo: Promise Success
  const triggerPromiseSuccess = async () => {
    const simulateApi = new Promise<{ status: string; id: number }>((resolve) => {
      setTimeout(() => resolve({ status: 'OK', id: 8941 }), 1800);
    });

    try {
      await alert.promise(simulateApi, {
        loading: currentLang === 'ne' ? 'डाटाबेस सिङ्क हुँदैछ...' : 'Syncing database...',
        success: (data) =>
          currentLang === 'ne'
            ? `सफल भयो! ट्रान्ज्याक्सन आईडी: #${data.id}`
            : `Success! Transaction ID: #${data.id}`,
        error: currentLang === 'ne' ? 'सिङ्क असफल भयो!' : 'Sync failed!',
      });
    } catch {
      // handled
    }
  };

  // Demo: Promise Failure
  const triggerPromiseFailure = async () => {
    const simulateFailApi = new Promise<void>((_, reject) => {
      setTimeout(() => reject(new Error(currentLang === 'ne' ? 'सर्भर प्रतिक्रिया ढिला भयो (504 Gateway Timeout)' : '504 Gateway Timeout')), 1800);
    });

    try {
      await alert.promise(simulateFailApi, {
        loading: currentLang === 'ne' ? 'भुक्तानी प्रक्रिया भइरहेको छ...' : 'Processing payment...',
        success: currentLang === 'ne' ? 'भुक्तानी सफल भयो!' : 'Payment succeeded!',
        error: (err) => (err as Error).message,
      });
    } catch {
      // error caught as expected
    }
  };

  // Demo: Undo Item Delete
  const handleDeleteItem = (itemToDelete: DemoItem) => {
    setItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));

    alert.undo({
      message: currentLang === 'ne' ? `"${itemToDelete.name}" मेटियो।` : `"${itemToDelete.name}" was deleted.`,
      duration: 5000,
      undoText: currentLang === 'ne' ? 'फिर्ता (Undo)' : 'Undo',
      onUndo: () => {
        setItems((prev) => [itemToDelete, ...prev.filter((i) => i.id !== itemToDelete.id)]);
        alert.toast.info(currentLang === 'ne' ? 'फाइल पुनर्स्थापित गरियो।' : 'Item restored.');
      },
    });
  };

  // Demo: Action Dialog
  const triggerActionDialog = () => {
    alert.action({
      title: currentLang === 'ne' ? 'नयाँ संस्करण v2.4 उपलब्ध छ' : 'New Version v2.4 Available',
      message: currentLang === 'ne' ? 'नवीनतम सुविधाहरू र सुरक्षा अपडेट प्राप्त गर्न अहिले अपग्रेड गर्नुहोस्।' : 'Upgrade now to get the latest performance and security enhancements.',
      actionText: currentLang === 'ne' ? 'अहिले अपग्रेड गर्नुहोस्' : 'Upgrade Now',
      onAction: () => {
        alert.toast.success(currentLang === 'ne' ? 'अपग्रेड सुरु भयो...' : 'Starting upgrade...');
      },
    });
  };

  // Demo: Toasts
  const triggerToast = (type: 'success' | 'error' | 'warning' | 'info' | 'loading') => {
    if (currentLang === 'ne') {
      if (type === 'success') alert.toast.success('बचत भयो!');
      if (type === 'error') alert.toast.error('इन्टरनेट जडान विच्छेद भयो!');
      if (type === 'warning') alert.toast.warning('ब्याट्री १०% भन्दा कम छ।');
      if (type === 'info') alert.toast.info('तपाईंसँग नयाँ सूचना छ।');
      if (type === 'loading') {
        const tId = alert.toast.loading('अपलोड हुँदैछ...');
        setTimeout(() => {
          alert.update(tId, { type: 'success', message: 'अपलोड सफल भयो!' });
        }, 2000);
      }
    } else {
      if (type === 'success') alert.toast.success('Changes saved!');
      if (type === 'error') alert.toast.error('Network disconnected!');
      if (type === 'warning') alert.toast.warning('Storage space is low.');
      if (type === 'info') alert.toast.info('You have 1 new notification.');
      if (type === 'loading') {
        const tId = alert.toast.loading('Uploading assets...');
        setTimeout(() => {
          alert.update(tId, { type: 'success', message: 'Upload completed!' });
        }, 2000);
      }
    }
  };

  // Live Playground Trigger
  const triggerPlayground = () => {
    if (pgIsToast) {
      alert.toast.custom({
        type: pgType,
        title: pgTitle || undefined,
        message: pgMessage,
        position: pgPosition,
        duration: pgDuration,
        theme: currentTheme,
        showClose: pgShowClose,
      });
    } else {
      if (pgType === 'confirm') {
        alert.confirm({
          title: pgTitle,
          message: pgMessage,
          position: pgPosition,
          theme: currentTheme,
          showClose: pgShowClose,
        });
      } else {
        alert[pgType as 'success']({
          title: pgTitle || undefined,
          message: pgMessage,
          position: pgPosition,
          duration: pgDuration,
          theme: currentTheme,
          showClose: pgShowClose,
        });
      }
    }
  };

  const playgroundCode = pgIsToast
    ? `import { alert } from "sajilo-alert";

alert.toast.${pgType === 'confirm' ? 'info' : pgType}({
  title: "${pgTitle}",
  message: "${pgMessage}",
  position: "${pgPosition}",
  duration: ${pgDuration},
  theme: "${currentTheme}"
});`
    : pgType === 'confirm'
    ? `import { alert } from "sajilo-alert";

const confirmed = await alert.confirm({
  title: "${pgTitle}",
  message: "${pgMessage}",
  position: "${pgPosition}",
  theme: "${currentTheme}"
});`
    : `import { alert } from "sajilo-alert";

alert.${pgType}({
  title: "${pgTitle}",
  message: "${pgMessage}",
  position: "${pgPosition}",
  duration: ${pgDuration},
  theme: "${currentTheme}"
});`;

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-sans antialiased selection:bg-[#DC143C] selection:text-white flex flex-col w-full max-w-full overflow-x-hidden pt-16">
      {/* Top Banner / Navigation - Fixed on scroll */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="/logo.png"
                alt="SajiloAlert Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <a href="#" className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 hover:opacity-90 transition truncate">
              Sajilo<span className="text-[#DC143C]">Alert</span>
            </a>
          </div>

          {/* Navigation Controls: Language switcher and Navigation Menu toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-full border border-slate-200 text-xs font-semibold">
              <button
                id="btn-lang-ne"
                onClick={() => setCurrentLang('ne')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                  currentLang === 'ne'
                    ? 'bg-slate-900 text-white shadow-xs font-bold font-serif text-[11px] sm:text-xs'
                    : 'text-slate-600 hover:text-slate-900 text-[11px] sm:text-xs'
                }`}
              >
                नेपाली
              </button>
              <button
                id="btn-lang-en"
                onClick={() => setCurrentLang('en')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                  currentLang === 'en'
                    ? 'bg-[#003893] text-white shadow-xs font-bold text-[11px] sm:text-xs'
                    : 'text-slate-600 hover:text-slate-900 text-[11px] sm:text-xs'
                }`}
              >
                EN
              </button>
            </div>

            {/* Navigation Menu Toggle Button */}
            <button
              id="btn-toggle-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:px-3.5 sm:py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition flex items-center gap-2 shadow-2xs font-semibold text-xs sm:text-sm"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="font-bold">{mobileMenuOpen ? (currentLang === 'ne' ? 'बन्द' : 'Close') : (currentLang === 'ne' ? 'मेनु' : 'Menu')}</span>
            </button>
          </div>
        </div>

        {/* Dropdown Navigation Menu Bar */}
        {mobileMenuOpen && (
          <div
            id="navigation-menu-drawer"
            className="border-t border-slate-200 bg-white px-4 sm:px-8 py-4 sm:py-5 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 max-w-full overflow-hidden"
          >
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Nav Links Grid */}
              <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
                <a
                  href="#section-basic-alerts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-[#DC143C] rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#DC143C] flex-shrink-0"></span>
                  <span className="truncate">Basic Alerts</span>
                </a>
                <a
                  href="#section-confirm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-[#003893] rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#003893] flex-shrink-0"></span>
                  <span className="truncate">Confirmation</span>
                </a>
                <a
                  href="#section-promise"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-purple-700 rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                  <span className="truncate">Promises</span>
                </a>
                <a
                  href="#section-toasts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-amber-700 rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                  <span className="truncate">Toasts</span>
                </a>
                <a
                  href="#section-undo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-emerald-700 rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600 flex-shrink-0"></span>
                  <span className="truncate">Undo System</span>
                </a>
                <a
                  href="#section-playground"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-[#DC143C] rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#DC143C] flex-shrink-0"></span>
                  <span className="truncate">Live Builder</span>
                </a>
                <a
                  href="#section-frameworks"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-700 rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                  <span className="truncate">Frameworks</span>
                </a>
                <a
                  href="#section-customization"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-indigo-700 rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600 flex-shrink-0"></span>
                  <span className="truncate">Customization</span>
                </a>
                <a
                  href="#section-api-reference"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 rounded-lg border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-600 flex-shrink-0"></span>
                  <span className="truncate">API Docs</span>
                </a>
              </nav>

              {/* Theme Selector & Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Theme:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    {(['nepal', 'light', 'dark', 'minimal'] as Theme[]).map((thm) => (
                      <button
                        key={thm}
                        id={`menu-theme-btn-${thm}`}
                        onClick={() => setCurrentTheme(thm)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md capitalize transition-all ${
                          currentTheme === thm
                            ? thm === 'nepal'
                              ? 'bg-[#003893] text-white shadow-xs'
                              : 'bg-white text-slate-900 shadow-xs border border-slate-300'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {thm}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  id="btn-close-all-menu"
                  onClick={() => {
                    alert.closeAll();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
                >
                  Clear All Popups
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <header className="bg-white py-8 sm:py-10 px-4 sm:px-8 lg:px-12 border-b border-slate-200 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
          <div className="min-w-0 max-w-full">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-[#DC143C] text-xs font-bold mb-4 shadow-2xs">
              <span className="truncate">SajiloAlert Library</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              SajiloAlert
            </h1>

            <p className="mt-3 text-slate-500 max-w-xl text-sm sm:text-base leading-relaxed">
              A framework-independent, accessible library for alerts, modals, and toasts. Zero dependencies, 100% customizable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto min-w-0">
            {/* Install Box */}
            <div className="bg-slate-900 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-slate-300 flex items-center justify-between gap-3 border border-slate-700 shadow-xl min-w-0 max-w-full">
              <div className="flex items-center gap-2 min-w-0 truncate">
                <span className="text-green-400 font-bold flex-shrink-0">$</span>
                <span className="text-slate-200 select-all font-medium truncate">npm install sajilo-alert</span>
              </div>
              <button
                id="btn-copy-install"
                onClick={handleCopyInstall}
                className="bg-slate-800 p-2 rounded hover:bg-slate-700 transition-colors text-slate-300 hover:text-white flex-shrink-0"
                title="Copy install command"
              >
                {copiedInstall ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              id="btn-trigger-hero-demo"
              onClick={() => {
                alert.success({
                  title: currentLang === 'ne' ? 'काम सफल भयो!' : 'Success!',
                  message:
                    currentLang === 'ne'
                      ? 'तपाईंको खाता सफलतापूर्वक सिर्जना गरिएको छ। अब तपाईं सबै सुविधाहरू प्रयोग गर्न सक्नुहुन्छ।'
                      : 'Your account has been successfully created. You can now access all features.',
                  confirmText: currentLang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close',
                });
              }}
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-[#DC143C] text-white rounded-lg font-bold shadow-lg shadow-red-200 hover:bg-[#b81032] active:scale-95 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{currentLang === 'ne' ? 'डेमो हेर्नुहोस् (Try Live)' : 'Try Live Alert'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Feature Highlights Grid */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-8 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shadow-2xs min-w-0">
            <div className="text-[#DC143C] font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Zero Dependencies</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Pure TypeScript & standard DOM. No bloated bundles.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shadow-2xs min-w-0">
            <div className="text-[#003893] font-bold text-sm flex items-center gap-2">
              <Languages className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Bilingual Built-in</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Nepali & English default labels. Seamless switching.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shadow-2xs min-w-0">
            <div className="text-emerald-700 font-bold text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Dual Modality</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Center dialogs & stacked toasts with max limits.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shadow-2xs min-w-0">
            <div className="text-amber-700 font-bold text-sm flex items-center gap-2">
              <Palette className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Nepal Theme</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Crimson and Himalayan Navy with geometric cues.</p>
          </div>
        </div>
      </section>

      {/* Main Interactive Demo Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 flex-1 w-full max-w-full overflow-hidden">
        {/* SECTION 1: BASIC ALERTS */}
        <section id="section-basic-alerts" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-red-100 text-red-800">Section 1</span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {currentLang === 'ne' ? 'आधारभूत अलर्टहरू (Basic Alerts)' : 'Core Modal Alerts'}
                </h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Standard modal dialogs with icon, title, message, animations, and accessible keyboard escape handling.
              </p>
            </div>
            <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700 font-semibold self-start md:self-auto">
              import &#123; alert &#125; from &quot;sajilo-alert&quot;;
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            <button
              id="btn-alert-success"
              onClick={() => triggerBasicAlert('success')}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Success</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition" />
              </div>
              <div className="mt-4">
                <code className="text-xs font-mono font-bold text-emerald-800 block">alert.success(...)</code>
                <span className="text-xs text-slate-500 mt-1 block">काम सफल भयो!</span>
              </div>
            </button>

            <button
              id="btn-alert-error"
              onClick={() => triggerBasicAlert('error')}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/30 transition text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Error</span>
                </div>
                <AlertOctagon className="w-4 h-4 text-red-600 group-hover:scale-110 transition" />
              </div>
              <div className="mt-4">
                <code className="text-xs font-mono font-bold text-red-800 block">alert.error(...)</code>
                <span className="text-xs text-slate-500 mt-1 block">केही समस्या भयो!</span>
              </div>
            </button>

            <button
              id="btn-alert-warning"
              onClick={() => triggerBasicAlert('warning')}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 transition text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Warning</span>
                </div>
                <AlertTriangle className="w-4 h-4 text-amber-600 group-hover:scale-110 transition" />
              </div>
              <div className="mt-4">
                <code className="text-xs font-mono font-bold text-amber-800 block">alert.warning(...)</code>
                <span className="text-xs text-slate-500 mt-1 block">कृपया फेरि जाँच गर्नुहोस्!</span>
              </div>
            </button>

            <button
              id="btn-alert-info"
              onClick={() => triggerBasicAlert('info')}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Info</span>
                </div>
                <Info className="w-4 h-4 text-blue-600 group-hover:scale-110 transition" />
              </div>
              <div className="mt-4">
                <code className="text-xs font-mono font-bold text-blue-800 block">alert.info(...)</code>
                <span className="text-xs text-slate-500 mt-1 block">नयाँ जानकारी उपलब्ध छ!</span>
              </div>
            </button>

            <button
              id="btn-alert-loading"
              onClick={() => triggerBasicAlert('loading')}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 transition text-left flex flex-col justify-between group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Loading</span>
                </div>
                <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
              </div>
              <div className="mt-4">
                <code className="text-xs font-mono font-bold text-indigo-800 block">alert.loading(...)</code>
                <span className="text-xs text-slate-500 mt-1 block">प्रक्रिया भइरहेको छ...</span>
              </div>
            </button>
          </div>
        </section>

        {/* SECTION 2: CONFIRMATION & ASYNC PROMISES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-full">
          {/* Confirmation Card */}
          <section id="section-confirm" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-blue-50 text-[#003893] border border-blue-100">Section 2</span>
                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {currentLang === 'ne' ? 'पुष्टि संवाद (Confirmation Dialog)' : 'Confirmation Dialog'}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">Promise&lt;boolean&gt;</span>
              </div>

              <p className="text-sm text-slate-600 mt-3">
                Returns a Promise that resolves <code className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">true</code> on confirm and{' '}
                <code className="font-bold text-red-700 bg-red-50 px-1 py-0.5 rounded">false</code> on cancel, backdrop click, or Escape. Never leaves unresolved promises.
              </p>

              {/* Code Snippet */}
              <div className="mt-4 bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto relative border border-slate-800 max-w-full">
                <button
                  onClick={() =>
                    handleCopy(
                      `const result = await alert.confirm({\n  title: "खाता हटाउने?",\n  message: "यो कार्य फिर्ता गर्न सकिँदैन।",\n  confirmText: "हटाउनुहोस्",\n  cancelText: "रद्द गर्नुहोस्"\n});`,
                      'confirm'
                    )
                  }
                  className="absolute top-2.5 right-2.5 p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded"
                  title="Copy snippet"
                >
                  {copiedCode === 'confirm' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <pre className="text-blue-300 overflow-x-auto">{`const result = await alert.confirm({
  title: "खाता हटाउने?",
  message: "यो कार्य फिर्ता गर्न सकिँदैन।",
  confirmText: "हटाउनुहोस्",
  cancelText: "रद्द गर्नुहोस्"
});`}</pre>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                id="btn-trigger-confirm"
                onClick={triggerConfirm}
                className="px-4 sm:px-5 py-2.5 rounded-lg bg-[#003893] hover:bg-[#002b70] text-white font-bold text-xs sm:text-sm transition shadow-md shadow-blue-100 flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                <span>{currentLang === 'ne' ? 'पुष्टि जाँच गर्नुहोस् (Test Confirm)' : 'Test Confirmation'}</span>
              </button>

              {confirmResult && (
                <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
                  {confirmResult}
                </div>
              )}
            </div>
          </section>

          {/* Promise Handling Card */}
          <section id="section-promise" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-purple-50 text-purple-800 border border-purple-100">Section 3</span>
                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {currentLang === 'ne' ? 'प्रमिस ह्यान्डलिङ (Promise Handling)' : 'Async Promise Engine'}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">alert.promise(...)</span>
              </div>

              <p className="text-sm text-slate-600 mt-3">
                Seamlessly connects an async Promise with loading spinner, success update on resolve, and error update on rejection.
              </p>

              {/* Code Snippet */}
              <div className="mt-4 bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto relative border border-slate-800 max-w-full">
                <button
                  onClick={() =>
                    handleCopy(
                      `await alert.promise(saveData(), {\n  loading: "प्रक्रिया भइरहेको छ...",\n  success: "काम सफल भयो!",\n  error: "काम असफल भयो!"\n});`,
                      'promise'
                    )
                  }
                  className="absolute top-2.5 right-2.5 p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded"
                >
                  {copiedCode === 'promise' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <pre className="text-blue-300 overflow-x-auto">{`await alert.promise(saveData(), {
  loading: "प्रक्रिया भइरहेको छ...",
  success: (data) => "काम सफल भयो!",
  error: (err) => "काम असफल भयो!"
});`}</pre>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                id="btn-promise-success"
                onClick={triggerPromiseSuccess}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{currentLang === 'ne' ? 'सफल प्रमिस (Resolve)' : 'Simulate Resolve'}</span>
              </button>
              <button
                id="btn-promise-error"
                onClick={triggerPromiseFailure}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#DC143C] hover:bg-[#b81032] text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-2xs"
              >
                <AlertOctagon className="w-4 h-4 flex-shrink-0" />
                <span>{currentLang === 'ne' ? 'असफल प्रमिस (Reject)' : 'Simulate Reject'}</span>
              </button>
            </div>
          </section>
        </div>

        {/* SECTION 3: TOAST NOTIFICATIONS & UNDO SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-full">
          {/* Toast Notification Matrix */}
          <section id="section-toasts" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-amber-50 text-amber-800 border border-amber-100">Section 4</span>
                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {currentLang === 'ne' ? 'टोस्ट सूचनाहरू (Toast Notifications)' : 'Toast Notification Stack'}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">alert.toast.*</span>
              </div>

              <p className="text-sm text-slate-600 mt-3">
                Non-blocking, keyboard accessible, self-stacking toasts with auto-dismiss timers and configurable max limits.
              </p>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <button
                  id="btn-toast-success"
                  onClick={() => triggerToast('success')}
                  className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition shadow-2xs min-w-0"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  <span className="truncate">Toast Success</span>
                </button>
                <button
                  id="btn-toast-error"
                  onClick={() => triggerToast('error')}
                  className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition shadow-2xs min-w-0"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
                  <span className="truncate">Toast Error</span>
                </button>
                <button
                  id="btn-toast-warning"
                  onClick={() => triggerToast('warning')}
                  className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition shadow-2xs min-w-0"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                  <span className="truncate">Toast Warning</span>
                </button>
                <button
                  id="btn-toast-info"
                  onClick={() => triggerToast('info')}
                  className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition shadow-2xs min-w-0"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                  <span className="truncate">Toast Info</span>
                </button>
                <button
                  id="btn-toast-loading"
                  onClick={() => triggerToast('loading')}
                  className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition shadow-2xs min-w-0"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                  <span className="truncate">Toast Loading</span>
                </button>
                <button
                  id="btn-toast-action"
                  onClick={triggerActionDialog}
                  className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition shadow-2xs min-w-0"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></span>
                  <span className="truncate">Action Modal</span>
                </button>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate">Positions: top-right, top-left, bottom-right, bottom-left, top, bottom</span>
            </div>
          </section>

          {/* Interactive Undo Card */}
          <section id="section-undo" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">Section 5</span>
                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {currentLang === 'ne' ? 'अनडु समर्थन (Interactive Undo)' : 'Undo Action Guarantee'}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">alert.undo(...)</span>
              </div>

              <p className="text-sm text-slate-600 mt-2">
                Click delete on any document below. An undo toast will appear with a strict single-execution guarantee!
              </p>

              {/* Items List */}
              <div className="mt-3.5 space-y-2">
                {items.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                    सबै फाइलहरू हटाइएका छन्।{' '}
                    <button
                      onClick={() => setItems(INITIAL_ITEMS)}
                      className="text-[#003893] font-bold hover:underline ml-1 inline-flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> रिसेट गर्नुहोस् (Reset)
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition shadow-2xs"
                    >
                      <div className="min-w-0 truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{item.category} • {item.updatedAt}</div>
                      </div>
                      <button
                        id={`btn-delete-item-${item.id}`}
                        onClick={() => handleDeleteItem(item)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition flex-shrink-0"
                        title="Delete file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setItems(INITIAL_ITEMS)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{currentLang === 'ne' ? 'सूची रिसेट गर्नुहोस्' : 'Reset List'}</span>
              </button>
              <span className="text-[11px] text-slate-400">Auto-expires in 5000ms</span>
            </div>
          </section>
        </div>

        {/* SECTION 4: INTERACTIVE CODE PLAYGROUND / LIVE BUILDER */}
        <section id="section-playground" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs w-full max-w-full overflow-hidden">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-rose-50 text-[#DC143C] border border-red-100">Interactive</span>
              <h2 className="text-xl font-extrabold text-slate-900 truncate">
                {currentLang === 'ne' ? 'लाइभ कोड जेनेरेटर (Live Option Builder)' : 'Live Interactive Playground'}
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Customize options in real-time, test the result immediately, and copy production-ready TypeScript code.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full max-w-full">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-4 min-w-0 max-w-full">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alert Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['success', 'error', 'warning', 'info', 'loading', 'confirm'] as AlertType[]).map((t) => (
                    <button
                      key={t}
                      id={`pg-type-${t}`}
                      onClick={() => {
                        setPgType(t);
                        if (t === 'success') {
                          setPgTitle(currentLang === 'ne' ? 'सफल भयो!' : 'Success!');
                          setPgMessage(currentLang === 'ne' ? 'तपाईंको कार्य सम्पन्न भयो।' : 'Your task was completed successfully.');
                        } else if (t === 'error') {
                          setPgTitle(currentLang === 'ne' ? 'त्रुटि भयो!' : 'Error occurred!');
                          setPgMessage(currentLang === 'ne' ? 'सर्भरमा त्रुटि फेला पर्यो।' : 'A server error was encountered.');
                        } else if (t === 'confirm') {
                          setPgTitle(currentLang === 'ne' ? 'पुष्टि गर्नुहोस्' : 'Are you sure?');
                          setPgMessage(currentLang === 'ne' ? 'के तपाईं अगाडि बढ्न चाहनुहुन्छ?' : 'Do you want to proceed?');
                        }
                      }}
                      className={`py-2 px-2.5 text-xs font-bold rounded-lg capitalize border transition truncate ${
                        pgType === t
                          ? 'bg-[#003893] text-white border-[#003893] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  id="pg-input-title"
                  type="text"
                  value={pgTitle}
                  onChange={(e) => setPgTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#DC143C] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  id="pg-input-message"
                  rows={2}
                  value={pgMessage}
                  onChange={(e) => setPgMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#DC143C] font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Position
                  </label>
                  <select
                    id="pg-select-position"
                    value={pgPosition}
                    onChange={(e) => setPgPosition(e.target.value as Position)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="center">center</option>
                    <option value="top">top</option>
                    <option value="bottom">bottom</option>
                    <option value="top-right">top-right</option>
                    <option value="top-left">top-left</option>
                    <option value="bottom-right">bottom-right</option>
                    <option value="bottom-left">bottom-left</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Duration (ms)
                  </label>
                  <input
                    id="pg-input-duration"
                    type="number"
                    step={500}
                    min={0}
                    value={pgDuration}
                    onChange={(e) => setPgDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    id="pg-checkbox-toast"
                    type="checkbox"
                    checked={pgIsToast}
                    onChange={(e) => {
                      setPgIsToast(e.target.checked);
                      if (e.target.checked && pgPosition === 'center') {
                        setPgPosition('top-right');
                      }
                    }}
                    className="w-4 h-4 text-[#DC143C] rounded"
                  />
                  <span>Render as Toast Notification</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    id="pg-checkbox-close"
                    type="checkbox"
                    checked={pgShowClose}
                    onChange={(e) => setPgShowClose(e.target.checked)}
                    className="w-4 h-4 text-[#DC143C] rounded"
                  />
                  <span>Show Close Button</span>
                </label>
              </div>

              <button
                id="btn-run-playground"
                onClick={triggerPlayground}
                className="w-full py-3 rounded-lg bg-[#DC143C] hover:bg-[#b81032] text-white font-bold text-sm shadow-md shadow-red-200 transition flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-98"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{currentLang === 'ne' ? 'अलर्ट चलाउनुहोस् (Run Custom Alert)' : 'Run Configured Alert'}</span>
              </button>
            </div>

            {/* Live Generated Code Snippet */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900 rounded-xl p-4 sm:p-5 text-slate-100 border border-slate-800 min-w-0 max-w-full overflow-hidden">
              <div className="min-w-0 max-w-full">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400 truncate">
                    <Code2 className="w-4 h-4 text-[#DC143C] flex-shrink-0" />
                    <span className="truncate">TypeScript / JS Snippet</span>
                  </div>
                  <button
                    onClick={() => handleCopy(playgroundCode, 'playground')}
                    className="flex items-center gap-1 text-xs font-sans font-semibold bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition flex-shrink-0"
                  >
                    {copiedCode === 'playground' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'playground' ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="font-mono text-xs sm:text-sm text-blue-300 overflow-x-auto p-2 leading-relaxed max-w-full">
                  {playgroundCode}
                </pre>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <span>Theme: <strong className="text-white capitalize">{currentTheme}</strong></span>
                <span>Language: <strong className="text-white">{currentLang === 'ne' ? 'नेपाली (ne)' : 'English (en)'}</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FRAMEWORK INTEGRATION GUIDE */}
        <section id="section-frameworks" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs w-full max-w-full overflow-hidden">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">Universal</span>
              <h2 className="text-xl font-extrabold text-slate-900 truncate">
                {currentLang === 'ne' ? 'सबै फ्रेमवर्कमा प्रयोग (Framework Support)' : 'Framework-Independent Integration'}
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Zero dependencies. Works seamlessly with Vanilla JS, TypeScript, React, Next.js, Vue 3, Svelte, and Vite.
            </p>
          </div>

          {/* Framework Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto max-w-full">
            {(['react', 'vanilla', 'vue', 'svelte'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab === 'react' ? 'React / Next.js' : tab === 'vanilla' ? 'Vanilla JS / TS' : tab === 'vue' ? 'Vue 3' : 'Svelte'}
              </button>
            ))}
          </div>

          <div className="mt-4 bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto relative border border-slate-800 max-w-full">
            <button
              onClick={() => {
                const codes = {
                  react: `import React from 'react';\nimport { alert } from 'sajilo-alert';\n\nexport function DeleteButton({ userId }) {\n  const handleDelete = async () => {\n    const confirmed = await alert.confirm({\n      title: 'के तपाईं निश्चित हुनुहुन्छ?',\n      message: 'यो प्रयोगकर्ता हटाइनेछ।'\n    });\n    if (confirmed) {\n      await deleteUser(userId);\n      alert.toast.success('प्रयोगकर्ता सफलतापूर्वक हटाइयो।');\n    }\n  };\n  return <button onClick={handleDelete}>Delete</button>;\n}`,
                  vanilla: `import { alert } from 'sajilo-alert';\n\ndocument.getElementById('save-btn').addEventListener('click', async () => {\n  const id = alert.loading('डाटा बचत हुँदैछ...');\n  try {\n    await fetch('/api/save', { method: 'POST' });\n    alert.update(id, { type: 'success', message: 'बचत भयो!' });\n  } catch {\n    alert.update(id, { type: 'error', message: 'त्रुटि भयो!' });\n  }\n});`,
                  vue: `<script setup>\nimport { alert } from 'sajilo-alert';\n\nasync function onSubmit() {\n  await alert.promise(submitForm(), {\n    loading: 'पेश हुँदैछ...',\n    success: 'फारम पेश भयो!',\n    error: 'फारम पेश गर्न सकिएन!'\n  });\n}\n</script>`,
                  svelte: `<script>\n  import { alert } from 'sajilo-alert';\n\n  function triggerNotification() {\n    alert.toast.success('Svelte सँग सजिलै काम गर्छ!');\n  }\n</script>\n\n<button on:click={triggerNotification}>Alert</button>`,
                };
                handleCopy(codes[activeTab], 'framework');
              }}
              className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded"
            >
              {copiedCode === 'framework' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {activeTab === 'react' && (
              <pre className="text-blue-300">{`import React from 'react';
import { alert } from 'sajilo-alert';

export function DeleteButton({ userId }) {
  const handleDelete = async () => {
    const confirmed = await alert.confirm({
      title: 'के तपाईं निश्चित हुनुहुन्छ?',
      message: 'यो प्रयोगकर्ता हटाइनेछ।',
      confirmText: 'हटाउनुहोस्',
      cancelText: 'रद्द गर्नुहोस्'
    });

    if (confirmed) {
      await deleteUser(userId);
      alert.toast.success('प्रयोगकर्ता सफलतापूर्वक हटाइयो।');
    }
  };

  return <button onClick={handleDelete}>Delete Account</button>;
}`}</pre>
            )}

            {activeTab === 'vanilla' && (
              <pre className="text-blue-300">{`import { alert } from 'sajilo-alert';

document.getElementById('save-btn').addEventListener('click', async () => {
  const id = alert.loading('डाटा बचत हुँदैछ...');
  
  try {
    await fetch('/api/save', { method: 'POST' });
    alert.update(id, {
      type: 'success',
      message: 'बचत सफल भयो!'
    });
  } catch (err) {
    alert.update(id, {
      type: 'error',
      message: 'बचत असफल भयो!'
    });
  }
});`}</pre>
            )}

            {activeTab === 'vue' && (
              <pre className="text-blue-300">{`<script setup>
import { alert } from 'sajilo-alert';

async function onSubmit() {
  await alert.promise(submitForm(), {
    loading: 'पेश हुँदैछ...',
    success: 'फारम पेश भयो!',
    error: 'फारम पेश गर्न सकिएन!'
  });
}
</script>

<template>
  <button @click="onSubmit">Submit Data</button>
</template>`}</pre>
            )}

            {activeTab === 'svelte' && (
              <pre className="text-blue-300">{`<script>
  import { alert } from 'sajilo-alert';

  function triggerNotification() {
    alert.toast.success('Svelte सँग सजिलै काम गर्छ!');
  }
</script>

<button on:click={triggerNotification}>Notify</button>`}</pre>
            )}
          </div>
        </section>

        {/* SECTION 6: CUSTOMIZATION & CSS VARIABLES OVERRIDES */}
        <section id="section-customization" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs w-full max-w-full overflow-hidden">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">Customization</span>
              <h2 className="text-xl font-extrabold text-slate-900 truncate">
                {currentLang === 'ne' ? 'अनुकूलन र ब्रान्डिङ (CSS Variables & Overrides)' : 'Customization & CSS Variables'}
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {currentLang === 'ne'
                ? 'तपाईंको ब्रान्ड रङ, बर्डर रेडियस, फन्ट, र छायाँहरू मिलाउन सजिलै CSS Variables ओभरराइड गर्नुहोस्।'
                : 'Brand SajiloAlert to your product by overriding CSS custom properties in your global stylesheet or scoped classes without touching library internals.'}
            </p>
          </div>

          {/* Customization Sub-tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto max-w-full">
            <button
              id="tab-custom-global"
              onClick={() => setCustomizationTab('global')}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition whitespace-nowrap flex-shrink-0 ${
                customizationTab === 'global'
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              1. Global Override (:root)
            </button>
            <button
              id="tab-custom-scoped"
              onClick={() => setCustomizationTab('scoped')}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition whitespace-nowrap flex-shrink-0 ${
                customizationTab === 'scoped'
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              2. Scoped & Theme Classes
            </button>
            <button
              id="tab-custom-variables"
              onClick={() => setCustomizationTab('variables')}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition whitespace-nowrap flex-shrink-0 ${
                customizationTab === 'variables'
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              3. Variable Reference Table
            </button>
          </div>

          {/* TAB 1: Global Overrides */}
          {customizationTab === 'global' && (
            <div className="mt-5 space-y-4 min-w-0 max-w-full">
              <p className="text-xs sm:text-sm text-slate-600">
                Add these custom properties to your global CSS file (such as <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">globals.css</code> or <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">styles.css</code>) inside <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">:root</code> to apply your brand palette universally across all alerts and toasts.
              </p>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto relative border border-slate-800 max-w-full">
                <button
                  onClick={() => {
                    const code = `/* globals.css - Override SajiloAlert CSS variables */
:root {
  /* Brand primary action & button colors */
  --sa-primary: #DC143C;            /* Nepali Crimson */
  --sa-primary-hover: #b81032;
  --sa-primary-text: #ffffff;

  /* Secondary action / cancel button */
  --sa-secondary: #003893;          /* Himalayan Navy */
  --sa-secondary-hover: #002b70;
  --sa-secondary-text: #ffffff;

  /* Status semantic colors */
  --sa-success: #16a34a;
  --sa-danger: #dc2626;
  --sa-warning: #d97706;
  --sa-info: #2563eb;

  /* Surfaces, text & borders */
  --sa-background: #ffffff;
  --sa-surface: #f8fafc;
  --sa-text: #0f172a;
  --sa-text-muted: #64748b;
  --sa-border: #e2e8f0;

  /* Geometry & Typography */
  --sa-radius: 12px;                /* Modal & toast corners */
  --sa-radius-sm: 8px;              /* Button corner radius */
  --sa-font-family: 'Noto Sans Devanagari', 'Mukta', system-ui, sans-serif;
  --sa-backdrop: rgba(15, 23, 42, 0.45);
}`;
                    handleCopy(code, 'css-global');
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded flex items-center gap-1.5 text-xs font-sans font-semibold"
                >
                  {copiedCode === 'css-global' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'css-global' ? 'Copied!' : 'Copy CSS'}</span>
                </button>

                <pre className="text-blue-300 leading-relaxed overflow-x-auto">{`/* globals.css - Override SajiloAlert CSS variables */
:root {
  /* Brand primary action & button colors */
  --sa-primary: #DC143C;            /* Nepali Crimson */
  --sa-primary-hover: #b81032;
  --sa-primary-text: #ffffff;

  /* Secondary action / cancel button */
  --sa-secondary: #003893;          /* Himalayan Navy */
  --sa-secondary-hover: #002b70;
  --sa-secondary-text: #ffffff;

  /* Status semantic colors */
  --sa-success: #16a34a;
  --sa-danger: #dc2626;
  --sa-warning: #d97706;
  --sa-info: #2563eb;

  /* Surfaces, text & borders */
  --sa-background: #ffffff;
  --sa-surface: #f8fafc;
  --sa-text: #0f172a;
  --sa-text-muted: #64748b;
  --sa-border: #e2e8f0;

  /* Geometry & Typography */
  --sa-radius: 12px;                /* Modal & toast corners */
  --sa-radius-sm: 8px;              /* Button corner radius */
  --sa-font-family: 'Noto Sans Devanagari', 'Mukta', system-ui, sans-serif;
  --sa-backdrop: rgba(15, 23, 42, 0.45);
}`}</pre>
              </div>
            </div>
          )}

          {/* TAB 2: Scoped Theme Classes */}
          {customizationTab === 'scoped' && (
            <div className="mt-5 space-y-4 min-w-0 max-w-full">
              <p className="text-xs sm:text-sm text-slate-600">
                You can scope CSS variable overrides to specific built-in themes (<code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">.sa-theme-nepal</code>, <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">.sa-theme-dark</code>, <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">.sa-theme-light</code>, <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">.sa-theme-minimal</code>) or create custom dark mode / tenant skins.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-full">
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto relative border border-slate-800 min-w-0 max-w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400 font-sans text-xs font-bold gap-2">
                    <span className="truncate">Dark Theme Overrides</span>
                    <button
                      onClick={() => {
                        const code = `.sa-theme-dark {
  --sa-background: #0f172a;
  --sa-surface: #1e293b;
  --sa-text: #f8fafc;
  --sa-text-muted: #94a3b8;
  --sa-border: #334155;
  --sa-primary: #38bdf8;
  --sa-primary-text: #0f172a;
  --sa-backdrop: rgba(0, 0, 0, 0.75);
}`;
                        handleCopy(code, 'css-dark');
                      }}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white flex-shrink-0"
                    >
                      {copiedCode === 'css-dark' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <pre className="text-blue-300 overflow-x-auto">{`.sa-theme-dark {
  --sa-background: #0f172a;
  --sa-surface: #1e293b;
  --sa-text: #f8fafc;
  --sa-text-muted: #94a3b8;
  --sa-border: #334155;
  --sa-primary: #38bdf8;
  --sa-primary-text: #0f172a;
  --sa-backdrop: rgba(0, 0, 0, 0.75);
}`}</pre>
                </div>

                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto relative border border-slate-800 min-w-0 max-w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400 font-sans text-xs font-bold gap-2">
                    <span className="truncate">Nepali Flag Accent Theme</span>
                    <button
                      onClick={() => {
                        const code = `.sa-theme-nepal {
  --sa-primary: #DC143C;       /* Crimson Red */
  --sa-secondary: #003893;     /* Deep Blue */
  --sa-accent-line: #DC143C;   /* Decorative Line */
  --sa-radius: 10px;
  --sa-shadow: 0 20px 25px -5px rgba(220, 20, 60, 0.12);
}`;
                        handleCopy(code, 'css-nepal');
                      }}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white flex-shrink-0"
                    >
                      {copiedCode === 'css-nepal' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <pre className="text-blue-300 overflow-x-auto">{`.sa-theme-nepal {
  --sa-primary: #DC143C;       /* Crimson Red */
  --sa-secondary: #003893;     /* Deep Blue */
  --sa-accent-line: #DC143C;   /* Decorative Line */
  --sa-radius: 10px;
  --sa-shadow: 0 20px 25px -5px rgba(220, 20, 60, 0.12);
}`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Complete Variable Reference Table */}
          {customizationTab === 'variables' && (
            <div className="mt-5 overflow-x-auto max-w-full">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                    <th className="py-2.5 px-3">CSS Variable</th>
                    <th className="py-2.5 px-3">Default Value</th>
                    <th className="py-2.5 px-3">Nepal Theme</th>
                    <th className="py-2.5 px-3">Target Element / Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-primary</td>
                    <td className="py-2.5 px-3 text-slate-600">#1e3a8a</td>
                    <td className="py-2.5 px-3 text-[#DC143C] font-semibold">#DC143C</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Primary action buttons & key accents</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-primary-hover</td>
                    <td className="py-2.5 px-3 text-slate-600">#172554</td>
                    <td className="py-2.5 px-3 text-[#DC143C] font-semibold">#b81032</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Hover background for primary button</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-primary-text</td>
                    <td className="py-2.5 px-3 text-slate-600">#ffffff</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">#ffffff</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Text color inside primary button</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-secondary</td>
                    <td className="py-2.5 px-3 text-slate-600">#dc2626</td>
                    <td className="py-2.5 px-3 text-[#003893] font-semibold">#003893</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Secondary action & cancel buttons</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-background</td>
                    <td className="py-2.5 px-3 text-slate-600">#ffffff</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">#ffffff</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Main modal card and toast background</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-surface</td>
                    <td className="py-2.5 px-3 text-slate-600">#f8fafc</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">#fafaf9</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Auxiliary surface and progress bar track</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-text</td>
                    <td className="py-2.5 px-3 text-slate-600">#0f172a</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">#1c1917</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Title, message text, and headings</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-border</td>
                    <td className="py-2.5 px-3 text-slate-600">#e2e8f0</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">#e7e5e4</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Modal border and card divider lines</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-radius</td>
                    <td className="py-2.5 px-3 text-slate-600">12px</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">12px</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Outer border radius for modals & toasts</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-radius-sm</td>
                    <td className="py-2.5 px-3 text-slate-600">8px</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">8px</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Button and interactive element radius</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-font-family</td>
                    <td className="py-2.5 px-3 text-slate-600">system-ui, Mukta...</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">system-ui, Mukta...</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Font stack supporting Nepali Devanagari</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">--sa-backdrop</td>
                    <td className="py-2.5 px-3 text-slate-600">rgba(15, 23, 42, 0.45)</td>
                    <td className="py-2.5 px-3 text-slate-700 font-semibold">rgba(15, 23, 42, 0.45)</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Backdrop modal screen overlay shadow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* SECTION 7: COMPLETE API REFERENCE */}
        <section id="section-api-reference" className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs w-full max-w-full overflow-hidden">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-blue-50 text-[#003893] border border-blue-100">Documentation</span>
              <h2 className="text-xl font-extrabold text-slate-900 truncate">
                {currentLang === 'ne' ? 'पूर्ण एपीआई विवरण (API Reference)' : 'Complete API Reference'}
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Deterministic, strictly typed methods and configuration options.
            </p>
          </div>

          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-3 px-4">Method / Property</th>
                  <th className="py-3 px-4">Arguments</th>
                  <th className="py-3 px-4">Returns</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                <tr>
                  <td className="py-3 px-4 font-bold text-[#DC143C] whitespace-nowrap">alert.success()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">message: string | AlertOptions</td>
                  <td className="py-3 px-4 text-[#003893] whitespace-nowrap">string (id)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Opens a success modal dialog</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#DC143C] whitespace-nowrap">alert.error()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">message: string | AlertOptions</td>
                  <td className="py-3 px-4 text-[#003893] whitespace-nowrap">string (id)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Opens an error alert modal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#DC143C] whitespace-nowrap">alert.warning()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">message: string | AlertOptions</td>
                  <td className="py-3 px-4 text-[#003893] whitespace-nowrap">string (id)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Opens a warning alert modal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#DC143C] whitespace-nowrap">alert.info()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">message: string | AlertOptions</td>
                  <td className="py-3 px-4 text-[#003893] whitespace-nowrap">string (id)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Opens an information alert modal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#DC143C] whitespace-nowrap">alert.loading()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">message?: string | AlertOptions</td>
                  <td className="py-3 px-4 text-[#003893] whitespace-nowrap">string (id)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Opens infinite loading spinner modal</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#003893] whitespace-nowrap">alert.confirm()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">options: ConfirmOptions</td>
                  <td className="py-3 px-4 text-purple-700 whitespace-nowrap">Promise&lt;boolean&gt;</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Displays confirm & cancel dialog</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-purple-700 whitespace-nowrap">alert.promise()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">promise, options: PromiseOptions</td>
                  <td className="py-3 px-4 text-purple-700 whitespace-nowrap">Promise&lt;T&gt;</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Handles async loading, success, and error</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-emerald-700 whitespace-nowrap">alert.undo()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">options: UndoOptions</td>
                  <td className="py-3 px-4 text-[#003893] whitespace-nowrap">string (id)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Undo toast with guaranteed single run</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">alert.toast.*</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">success | error | warning | info | loading</td>
                  <td className="py-3 px-4 text-[#003893] whitespace-nowrap">string (id)</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Non-blocking stacked toast notifications</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">alert.setLanguage()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">lang: &apos;ne&apos; | &apos;en&apos;</td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">void</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Switches default system label language</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">alert.configure()</td>
                  <td className="py-3 px-4 text-slate-600 font-sans">config: Partial&lt;GlobalConfig&gt;</td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">void</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Configures theme, position, duration, etc.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
