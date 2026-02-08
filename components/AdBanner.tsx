
import React from 'react';

interface Props {
  format?: 'horizontal' | 'vertical' | 'rectangle';
  label?: string;
}

const AdBanner: React.FC<Props> = ({ format = 'horizontal', label = "مساحة إعلانية" }) => {
  const getStyles = () => {
    switch(format) {
      case 'vertical': return 'h-[600px] w-full';
      case 'rectangle': return 'h-[250px] w-full';
      default: return 'h-[120px] w-full';
    }
  };

  return (
    <div className={`ad-placeholder border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group ${getStyles()}`}>
      <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 text-[8px] text-gray-500 rounded uppercase font-bold tracking-widest border border-white/10">
        AdSense Slot
      </div>
      <div className="text-gray-700 font-black text-sm group-hover:text-gray-600 transition-colors uppercase">
        {label}
      </div>
      <p className="text-[10px] text-gray-800 mt-1">يظهر الإعلان هنا بعد تفعيل حسابك</p>
      
      {/* 
        هنا يتم وضع كود الوحدة الإعلانية من جوجل عند التفعيل:
        <ins class="adsbygoogle" ...></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  );
};

export default AdBanner;
