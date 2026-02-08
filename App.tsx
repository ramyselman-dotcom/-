
import React, { useState, useEffect } from 'react';
import { Match, NewsItem, Page, UserSettings } from './types';
import { INITIAL_MATCHES, INITIAL_NEWS } from './constants';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MatchList from './components/MatchList';
import NewsSection from './components/NewsSection';
import AdminPanel from './components/AdminPanel';
import AIAnalysis from './components/AIAnalysis';
import SettingsPage from './components/SettingsPage';
import AdBanner from './components/AdBanner';

const App: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('kora_matches');
    return saved ? JSON.parse(saved) : INITIAL_MATCHES;
  });
  
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('kora_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('kora_settings');
    return saved ? JSON.parse(saved) : { theme: 'dark', favoriteLeagues: [] };
  });

  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedLeague, setSelectedLeague] = useState<string>('الكل');
  const [activeAnalysis, setActiveAnalysis] = useState<Match | null>(null);

  useEffect(() => {
    localStorage.setItem('kora_matches', JSON.stringify(matches));
    localStorage.setItem('kora_news', JSON.stringify(news));
    localStorage.setItem('kora_settings', JSON.stringify(settings));
    if (settings.theme === 'light') document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');
  }, [matches, news, settings]);

  const handleUpdateNews = (newNews: NewsItem[]) => setNews(newNews);
  const handleRefreshMatches = (newMatches: Match[]) => setMatches(newMatches);

  const renderContent = () => {
    switch (currentPage) {
      case 'admin':
        return <AdminPanel matches={matches} onAddMatch={m => setMatches([m, ...matches])} onUpdateMatch={m => setMatches(matches.map(x => x.id === m.id ? m : x))} onDeleteMatch={id => setMatches(matches.filter(x => x.id !== id))} />;
      case 'analysis':
        return activeAnalysis ? <AIAnalysis match={activeAnalysis} onBack={() => setCurrentPage('home')} /> : null;
      case 'settings':
        return <SettingsPage settings={settings} onUpdateSettings={setSettings} onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="hidden lg:block lg:col-span-3">
              <Sidebar selectedLeague={selectedLeague} setSelectedLeague={setSelectedLeague} matches={matches} favoriteLeagues={settings.favoriteLeagues} />
            </aside>
            <main className="lg:col-span-9 space-y-16">
              {/* Breaking News Ticker */}
              <div className="bg-red-600/10 border-y border-red-500/20 py-2 overflow-hidden whitespace-nowrap relative">
                <div className="absolute left-0 top-0 bottom-0 px-4 bg-red-600 text-white font-black flex items-center z-10 text-xs italic">عاجل</div>
                <div className="animate-marquee inline-block pr-[100%] text-sm font-bold text-gray-300">
                  {news.map(n => ` • ${n.title} [${n.category}] `).join('')}
                </div>
              </div>

              <div className="relative rounded-[3rem] overflow-hidden bg-[#151515] border border-white/5 p-12 shadow-2xl">
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="live-pulse w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-500 text-xs font-black tracking-widest uppercase">تغطية ذكية بواسطة جوجل</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">الكرة الأفريقية <br/> في <span className="text-green-500">جيبك</span></h1>
                  <p className="text-gray-400 text-xl max-w-lg leading-relaxed font-medium">متابعة شاملة لدوري أبطال أفريقيا، الكونفدرالية، والدوري المصري بذكاء اصطناعي حقيقي.</p>
                </div>
                <div className="absolute -left-20 -bottom-20 text-[300px] opacity-[0.03] select-none rotate-12">🏆</div>
              </div>

              {/* Match List Section */}
              <MatchList matches={selectedLeague === 'الكل' ? matches : matches.filter(m => m.league === selectedLeague)} onAnalyze={m => { setActiveAnalysis(m); setCurrentPage('analysis'); }} onRefresh={handleRefreshMatches} />
              
              {/* Mid-Page Ad Unit */}
              <AdBanner label="إعلان منتصف الصفحة" />

              {/* News Section */}
              <NewsSection news={news} onUpdateNews={handleUpdateNews} />
              
              {/* Bottom Ad Unit */}
              <AdBanner label="إعلان أسفل الموقع" />
            </main>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-['Cairo'] bg-[#0c0c0c]">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} liveCount={matches.filter(m => m.status === 'live').length} />
      <div className="flex-1 container mx-auto px-4 py-12">{renderContent()}</div>
      <footer className="bg-[#111] border-t border-white/5 py-20">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-green-500 p-2 rounded-xl text-black font-bold shadow-lg">🌍</div>
            <span className="text-3xl font-black text-white">كورة<span className="text-green-500">لايف</span></span>
          </div>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-loose">منصة معتمدة تقنياً لتقديم التحليل الرياضي الذكي. جميع الحقوق محفوظة لمحرك البحث كورة لايف.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
