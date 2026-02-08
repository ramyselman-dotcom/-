
import React, { useState } from 'react';
import { Match } from '../types';
import { fetchRealMatches } from '../services/geminiService';

interface Props {
  matches: Match[];
  onAnalyze: (m: Match) => void;
  onRefresh: (newMatches: Match[]) => void;
}

const MatchList: React.FC<Props> = ({ matches, onAnalyze, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const realMatches = await fetchRealMatches();
      onRefresh(realMatches);
    } catch (error) {
      alert("تعذر جلب البيانات الحية حالياً، حاول مرة أخرى.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const finishedMatches = matches.filter(m => m.status === 'finished');

  const renderSection = (title: string, data: Match[], color: string, badge?: string) => {
    if (data.length === 0) return null;
    
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${color === 'red' ? 'bg-red-500 animate-pulse' : color === 'green' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
            <h2 className="font-black text-xl text-white">{title}</h2>
          </div>
          {badge && <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-bold">{badge}</span>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map(match => (
            <div 
              key={match.id}
              className={`bg-[#1a1a1a] border ${match.status === 'upcoming' ? 'border-gray-800/60' : 'border-gray-800'} rounded-2xl overflow-hidden hover:border-green-500/40 transition-all group shadow-sm hover:shadow-green-500/5`}
            >
              <div className="bg-gray-800/40 px-4 py-2 flex items-center justify-between text-[10px] font-bold">
                <span className="text-gray-400 uppercase tracking-widest">{match.league}</span>
                {match.status === 'live' ? (
                  <span className="text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    دقيقة {match.minute}'
                  </span>
                ) : match.status === 'upcoming' ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <span className="opacity-70">🕒</span>
                    يبدأ في {match.time}
                  </span>
                ) : (
                  <span className="text-gray-500">انتهت</span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-xl shadow-inner border border-gray-700 group-hover:scale-110 transition-transform">
                      {match.homeTeam.logo || '⚽'}
                    </div>
                    <span className="text-white text-xs font-bold text-center">{match.homeTeam.name}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3">
                      {match.status === 'upcoming' ? (
                        <div className="flex flex-col items-center">
                          <span className="text-gray-600 text-sm font-bold mb-1">vs</span>
                          <div className="bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-700">
                             <span className="text-green-500 font-black text-sm">{match.time}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl font-black text-white">{match.homeScore}</span>
                          <span className="text-gray-700 text-lg font-bold">:</span>
                          <span className="text-3xl font-black text-white">{match.awayScore}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-xl shadow-inner border border-gray-700 group-hover:scale-110 transition-transform">
                      {match.awayTeam.logo || '⚽'}
                    </div>
                    <span className="text-white text-xs font-bold text-center">{match.awayTeam.name}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => onAnalyze(match)}
                  className="w-full mt-6 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-xl text-[10px] font-bold text-gray-400 hover:text-green-500 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>📋</span> {match.status === 'upcoming' ? 'توقع سير اللقاء' : 'تحليل فني للمباراة'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between gap-4 bg-gradient-to-l from-green-500/10 to-transparent p-4 rounded-2xl border border-green-500/20">
        <div>
          <h3 className="text-white font-black text-lg">نتائج حية ومباشرة</h3>
          <p className="text-gray-500 text-xs font-bold">يتم التحديث بناءً على نتائج الملاعب الحقيقية الآن.</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-green-500/20 active:scale-95 ${isRefreshing ? 'opacity-50 cursor-wait' : ''}`}
        >
          {isRefreshing ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              جاري المزامنة...
            </>
          ) : (
            <>
              <span>🔄</span> تحديث النتائج لحظياً
            </>
          )}
        </button>
      </div>

      {renderSection("مباريات جارية الآن", liveMatches, "red")}
      {renderSection("جدول مباريات اليوم", upcomingMatches, "green", "مرتقبة")}
      {renderSection("نتائج المباريات المنتهية", finishedMatches, "gray", "الأمس")}
      
      {matches.length === 0 && !isRefreshing && (
        <div className="text-center py-20 bg-[#1a1a1a] rounded-3xl border border-dashed border-gray-800">
          <div className="text-5xl mb-4 opacity-20">⚽</div>
          <p className="text-gray-500 font-bold">لا توجد مباريات متاحة حالياً. اضغط على تحديث النتائج.</p>
        </div>
      )}
    </div>
  );
};

export default MatchList;
