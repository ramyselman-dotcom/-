
import React from 'react';
import { UserSettings } from '../types';
import { LEAGUES } from '../constants';

interface Props {
  settings: UserSettings;
  onUpdateSettings: (s: UserSettings) => void;
  onBack: () => void;
}

const SettingsPage: React.FC<Props> = ({ settings, onUpdateSettings, onBack }) => {
  const toggleTheme = () => {
    onUpdateSettings({
      ...settings,
      theme: settings.theme === 'dark' ? 'light' : 'dark'
    });
  };

  const toggleLeague = (leagueName: string) => {
    const isFav = settings.favoriteLeagues.includes(leagueName);
    const newFavs = isFav 
      ? settings.favoriteLeagues.filter(l => l !== leagueName)
      : [...settings.favoriteLeagues, leagueName];
    
    onUpdateSettings({
      ...settings,
      favoriteLeagues: newFavs
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-white">الإعدادات والشخصية</h2>
        <button 
          onClick={onBack}
          className="bg-white/5 hover:bg-white/10 text-gray-400 px-4 py-2 rounded-xl text-sm font-bold transition-all"
        >
          تم
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl p-8 space-y-10 shadow-2xl">
        {/* Theme Section */}
        <section className="space-y-4">
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest border-r-4 border-green-500 pr-3">مظهر التطبيق</h3>
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{settings.theme === 'dark' ? '🌙' : '☀️'}</span>
              <div>
                <p className="text-white font-bold text-sm">الوضع {settings.theme === 'dark' ? 'الليلي' : 'النهاري'}</p>
                <p className="text-gray-500 text-xs">تخصيص ألوان الواجهة المفضلة لك</p>
              </div>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-14 h-8 rounded-full relative transition-all duration-300 ${settings.theme === 'dark' ? 'bg-green-600' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${settings.theme === 'dark' ? 'right-7' : 'right-1'}`}></div>
            </button>
          </div>
        </section>

        {/* Favorite Leagues Section */}
        <section className="space-y-4">
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest border-r-4 border-amber-500 pr-3">البطولات المفضلة</h3>
          <p className="text-gray-500 text-xs mb-4 leading-relaxed">اختر البطولات التي تود متابعتها بشكل خاص لتظهر في قسم "المفضلة" الجانبي لسرعة الوصول.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LEAGUES.map(league => {
              const isFav = settings.favoriteLeagues.includes(league.name);
              return (
                <button
                  key={league.id}
                  onClick={() => toggleLeague(league.name)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-95 ${
                    isFav 
                      ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                      : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{league.logo}</span>
                    <span className="text-sm font-bold">{league.name}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isFav ? 'bg-green-500 border-green-500' : 'border-gray-700'
                  }`}>
                    {isFav && <span className="text-[10px] text-black font-black">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="text-center">
        <p className="text-gray-600 text-[10px] font-bold">يتم حفظ هذه التفضيلات محلياً في هذا الجهاز فقط.</p>
      </div>
    </div>
  );
};

export default SettingsPage;
