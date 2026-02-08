
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { globalSportsSearch, testGeminiConnection } from '../services/geminiService';
import SearchModal from './SearchModal';

interface Props {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  liveCount: number;
}

const Navbar: React.FC<Props> = ({ currentPage, setCurrentPage, liveCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<'testing' | 'online' | 'offline'>('testing');

  useEffect(() => {
    const checkApi = async () => {
      const result = await testGeminiConnection();
      setApiStatus(result.success ? 'online' : 'offline');
    };
    checkApi();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setIsModalOpen(true);
    setSearchResult('');
    try {
      const result = await globalSportsSearch(searchQuery);
      setSearchResult(result);
    } catch (error) {
      setSearchResult('عذراً، حدث خطأ أثناء الاتصال بجوجل.');
    } finally {
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* شريط تنبيه إذا كان الـ API معطلاً */}
      {apiStatus === 'offline' && (
        <div className="bg-red-600 text-white text-[10px] py-1 text-center font-black animate-pulse uppercase tracking-widest z-[100] relative">
          ⚠️ تنبيه: مفتاح الـ API غير متصل أو غير صحيح - اذهب للوحة الإدارة للإصلاح
        </div>
      )}

      <nav className="bg-[#1a1a1a] text-white sticky top-0 z-50 border-b border-gray-800 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 group">
                <div className="bg-green-500 p-2 rounded-xl">
                  <span className="text-black font-bold">⚽</span>
                </div>
                <span className="text-2xl font-black tracking-tighter">كورة<span className="text-green-500">لايف</span></span>
              </button>

              <div className="hidden lg:flex items-center gap-2">
                <button onClick={() => setCurrentPage('home')} className={`px-4 py-2 text-sm font-black transition-all rounded-xl ${currentPage === 'home' ? 'text-green-500 bg-green-500/10' : 'text-gray-400 hover:text-white'}`}>الرئيسية</button>
                <button onClick={() => setCurrentPage('live')} className={`px-4 py-2 text-sm font-black transition-all rounded-xl flex items-center gap-2 ${currentPage === 'live' ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-white'}`}>بث مباشر {liveCount > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md">{liveCount}</span>}</button>
                
                {/* زر الإدارة بارز جداً */}
                <button
                  onClick={() => setCurrentPage('admin')}
                  className={`px-6 py-2.5 text-sm font-black transition-all rounded-2xl border-2 flex items-center gap-2 ${
                    currentPage === 'admin' 
                    ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' 
                    : 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black animate-bounce-slow'
                  }`}
                >
                  <span className="text-lg">⚙️</span>
                  لوحة الإدارة والحصول على API
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${apiStatus === 'online' ? 'bg-green-500/10 border-green-500/30 text-green-500' : apiStatus === 'offline' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500 animate-pulse' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-gray-500 animate-bounce'}`}></div>
                <span className="text-[10px] font-black uppercase">{apiStatus === 'online' ? 'Connected' : apiStatus === 'offline' ? 'Offline' : 'Testing'}</span>
              </div>
              
              <button className="lg:hidden p-2 text-gray-400 text-2xl" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '✕' : '☰'}</button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-[#1a1a1a] border-t border-gray-800 p-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setIsOpen(false); }} className="w-full text-right px-4 py-3 rounded-xl text-sm font-bold">الرئيسية</button>
            <button onClick={() => { setCurrentPage('admin'); setIsOpen(false); }} className="w-full text-right px-4 py-3 rounded-xl text-sm font-bold bg-amber-500 text-black">⚙️ لوحة الإدارة (الحصول على API)</button>
          </div>
        )}
      </nav>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} query={searchQuery || "جاري البحث..."} result={searchResult} isLoading={isSearching} />
    </>
  );
};

export default Navbar;
