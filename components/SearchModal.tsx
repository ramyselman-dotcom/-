
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  result: string;
  isLoading: boolean;
}

const SearchModal: React.FC<Props> = ({ isOpen, onClose, query, result, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-[#1a1a1a] w-full max-w-2xl rounded-[2.5rem] border border-green-500/20 shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-transparent"></div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-black shadow-lg">
                🔍
              </div>
              <div>
                <h3 className="text-white font-black text-lg">نتائج البحث الذكي</h3>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Powered by Google Search</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl">✕</button>
          </div>

          <div className="bg-black/40 rounded-2xl p-6 border border-gray-800">
            <p className="text-green-500 text-xs font-bold mb-2">سؤالك:</p>
            <p className="text-white font-bold text-lg">"{query}"</p>
          </div>

          <div className="min-h-[200px] text-gray-200 leading-relaxed text-lg">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm animate-pulse">جاري جلب المعلومات من محرك بحث جوجل...</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 whitespace-pre-line">
                {result}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-gray-500 font-bold">مصدر البيانات: Google News & Live Data</span>
            </div>
            <button 
              onClick={onClose}
              className="bg-green-500 hover:bg-green-400 text-black px-8 py-2.5 rounded-xl font-black text-sm transition-all active:scale-95"
            >
              فهمت ذلك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
