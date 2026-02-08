
import React, { useState } from 'react';
import { NewsItem } from '../types';
import { fetchLiveNews } from '../services/geminiService';

interface Props {
  news: NewsItem[];
  onUpdateNews: (news: NewsItem[]) => void;
}

const NewsSection: React.FC<Props> = ({ news, onUpdateNews }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    const liveNews = await fetchLiveNews();
    if (liveNews.length > 0) {
      onUpdateNews(liveNews);
    }
    setIsUpdating(false);
  };

  const featuredNews = news.slice(0, 2);
  const otherNews = news.slice(2);

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-green-500/20">
            <span className="text-lg">🗞️</span>
          </div>
          <h2 className="text-white font-black text-3xl tracking-tight">آخر الأخبار الرياضية</h2>
        </div>
        <button 
          onClick={handleUpdate}
          disabled={isUpdating}
          className="bg-white/5 hover:bg-white/10 text-gray-300 px-6 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border border-white/5 shadow-sm active:scale-95"
        >
          {isUpdating ? <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div> : '🔄'}
          تحديث من جوجل
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredNews.map((item) => (
          <div key={item.id} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/5">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-10 space-y-4">
              <span className="bg-green-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase">{item.category}</span>
              <h3 className="text-white font-black text-3xl leading-tight group-hover:text-green-400 transition-colors">{item.title}</h3>
              <div className="flex items-center gap-4 text-gray-400 text-xs font-bold pt-2">
                <span>🕒 {item.date}</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>المصدر: جوجل سيرش</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {otherNews.map((item) => (
          <div key={item.id} className="group bg-[#161616] border border-gray-800/50 rounded-3xl overflow-hidden hover:border-green-500/30 transition-all">
            <div className="relative aspect-video overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-gray-100 font-bold text-sm leading-relaxed group-hover:text-green-500 transition-colors line-clamp-2">{item.title}</h3>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 text-gray-500 text-[10px] font-bold uppercase">
                <span>{item.date}</span>
                <span className="text-green-500">التفاصيل ←</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
