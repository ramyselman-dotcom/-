
import React, { useState, useEffect } from 'react';
import { Match } from '../types';
import { analyzeMatch } from '../services/geminiService';

interface Props {
  match: Match;
  onBack: () => void;
}

const AIAnalysis: React.FC<Props> = ({ match, onBack }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      const result = await analyzeMatch(match);
      setAnalysis(result);
      setIsLoading(false);
    };
    fetchAnalysis();
  }, [match]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm"
      >
        <span>←</span> العودة للرئيسية
      </button>

      <div className="bg-gradient-to-br from-green-900/20 to-[#1a1a1a] border border-green-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-500 w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg">📈</div>
            <div>
              <h2 className="text-white font-black text-xl">تحليل فني متطور (Gemini)</h2>
              <p className="text-green-500/70 text-xs font-bold">بناءً على المعطيات الحالية وسير اللقاء</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-10 mb-10 bg-black/40 p-6 rounded-2xl border border-gray-800">
            <div className="text-center">
              <div className="text-2xl mb-1">{match.homeTeam.logo || '⚽'}</div>
              <div className="text-white font-bold text-sm">{match.homeTeam.name}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-500">{match.homeScore} - {match.awayScore}</div>
              <div className="text-gray-500 text-[10px] font-bold mt-1">
                {match.status === 'live' ? `الدقيقة ${match.minute}` : 'مباشر'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">{match.awayTeam.logo || '⚽'}</div>
              <div className="text-white font-bold text-sm">{match.awayTeam.name}</div>
            </div>
          </div>

          <div className="min-h-[150px] relative">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm animate-pulse">جاري صياغة التقرير الفني للمباراة...</p>
              </div>
            ) : (
              <div className="text-gray-200 text-lg leading-relaxed text-right p-4 bg-white/5 rounded-2xl border border-white/5 whitespace-pre-line animate-in fade-in duration-500">
                {analysis}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="text-[10px] text-gray-500 font-bold px-3 py-1 bg-black/30 rounded-full">
              Powered by Gemini Technology
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
