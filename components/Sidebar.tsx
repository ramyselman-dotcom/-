
import React from 'react';
import { Match } from '../types';
import { LEAGUES } from '../constants';
import AdBanner from './AdBanner';

interface Props {
  selectedLeague: string;
  setSelectedLeague: (l: string) => void;
  matches: Match[];
  favoriteLeagues: string[];
}

const Sidebar: React.FC<Props> = ({ selectedLeague, setSelectedLeague, matches, favoriteLeagues }) => {
  const renderLeagueButton = (leagueName: string, logo: string) => {
    const count = matches.filter(m => m.league === leagueName).length;
    const isActive = selectedLeague === leagueName;
    return (
      <button 
        key={leagueName}
        onClick={() => setSelectedLeague(leagueName)}
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
          isActive ? 'bg-green-500/10 border border-green-500/30' : 'hover:bg-gray-800 border border-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{logo}</span>
          <span className={`text-sm font-bold ${isActive ? 'text-green-500' : 'text-gray-400'}`}>{leagueName}</span>
        </div>
        <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">{count}</span>
      </button>
    );
  };

  return (
    <div className="space-y-6 sticky top-24 pb-10">
      {/* Main Leagues Section */}
      <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-4 shadow-sm">
        <h2 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
          <span className="text-green-500">🏆</span> البطولات
        </h2>
        <div className="space-y-1">
          <button 
            onClick={() => setSelectedLeague('الكل')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              selectedLeague === 'الكل' ? 'bg-green-500/10 border border-green-500/30' : 'hover:bg-gray-800 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🌍</span>
              <span className={`text-sm font-bold ${selectedLeague === 'الكل' ? 'text-green-500' : 'text-gray-400'}`}>الكل</span>
            </div>
            <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">{matches.length}</span>
          </button>
          {LEAGUES.map(league => renderLeagueButton(league.name, league.logo))}
        </div>
      </div>

      {/* AdSense Vertical Unit */}
      <AdBanner format="vertical" label="إعلان جانبي" />

      <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-5 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
        <h2 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
          <span>📊</span> ترتيب الدوري
        </h2>
        <div className="space-y-4">
          {[
            { name: "الأهلي", pts: 45, pos: 1 },
            { name: "بيراميدز", pts: 42, pos: 2 },
          ].map(team => (
            <div key={team.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded flex items-center justify-center font-bold ${team.pos === 1 ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-500'}`}>{team.pos}</span>
                <span className="text-gray-200 font-bold">{team.name}</span>
              </div>
              <span className="text-amber-500 font-black">{team.pts} ن</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
