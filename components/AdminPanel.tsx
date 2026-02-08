
import React, { useState } from 'react';
import { Match, Team } from '../types';
import { TEAMS, LEAGUES } from '../constants';
import { testGeminiConnection } from '../services/geminiService';

interface Props {
  matches: Match[];
  onAddMatch: (m: Match) => void;
  onUpdateMatch: (m: Match) => void;
  onDeleteMatch: (id: string) => void;
}

const AdminPanel: React.FC<Props> = ({ matches, onAddMatch, onUpdateMatch, onDeleteMatch }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{success: boolean, message: string} | null>(null);

  const [formData, setFormData] = useState({
    homeTeamId: 'ahly',
    awayTeamId: 'zamalek',
    homeScore: 0,
    awayScore: 0,
    league: 'الدوري المصري',
    status: 'upcoming' as Match['status'],
    time: '20:00',
    minute: 0
  });

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testGeminiConnection();
    setTestResult(result);
    setIsTesting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const homeTeam = TEAMS.find(t => t.id === formData.homeTeamId)!;
    const awayTeam = TEAMS.find(t => t.id === formData.awayTeamId)!;
    const newMatch: Match = {
      id: Math.random().toString(36).substr(2, 9),
      homeTeam,
      awayTeam,
      homeScore: formData.homeScore,
      awayScore: formData.awayScore,
      league: formData.league,
      status: formData.status,
      time: formData.time,
      minute: formData.status === 'live' ? formData.minute : undefined
    };
    onAddMatch(newMatch);
    alert("تمت إضافة المباراة بنجاح!");
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* 🚀 قسم الحصول على API - Google AI Studio */}
      <div className="bg-[#1a1a1a] border-2 border-green-500/30 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="bg-green-500 p-4 text-black text-center font-black text-lg">
          🚀 كيف تحصل على مفتاح API مجاني من جوجل؟
        </div>
        <div className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-xl font-black text-green-500">1</div>
              <p className="text-white font-bold">افتح موقع AI Studio</p>
              <a href="https://aistudio.google.com/" target="_blank" className="inline-block bg-white text-black px-4 py-2 rounded-lg text-xs font-black hover:bg-green-500 transition-colors">اضغط هنا لفتح الموقع ↗</a>
            </div>
            <div className="space-y-4 text-center border-x border-white/5">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-xl font-black text-green-500">2</div>
              <p className="text-white font-bold">أنشئ مفتاح جديد</p>
              <p className="text-gray-500 text-xs leading-relaxed">اضغط على زر <span className="text-white font-bold">"Get API key"</span> في القائمة الجانبية ثم أنشئ مفتاحاً لمشروع جديد.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-xl font-black text-green-500">3</div>
              <p className="text-white font-bold">ضع المفتاح في الكود</p>
              <p className="text-gray-500 text-xs leading-relaxed">انسخ الكود الذي يبدأ بـ <span className="text-green-500 font-bold">AIzaSy</span> وضعه في ملف الإعدادات الخاص بك.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
             <div className="bg-black/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-white font-black">اختبار المفتاح الحالي</h4>
                  <p className="text-gray-500 text-xs">تأكد إذا كان المفتاح الذي وضعته يعمل الآن أم لا.</p>
                </div>
                <div className="flex items-center gap-4">
                  {testResult && (
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold border ${testResult.success ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                      {testResult.message}
                    </div>
                  )}
                  <button 
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="bg-green-500 text-black font-black px-8 py-3 rounded-xl hover:bg-green-400 transition-all text-sm shadow-xl"
                  >
                    {isTesting ? 'جاري الفحص...' : '⚡ اختبر المفتاح الآن'}
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* نموذج إضافة المباريات */}
      <div className="bg-[#1a1a1a] border border-amber-500/20 rounded-[2.5rem] p-10 shadow-2xl">
        <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
          <span className="bg-amber-500 p-2 rounded-xl text-black text-xl">🛡️</span> 
          إدارة محتوى المباريات
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold">الفريق المضيف</label>
            <select value={formData.homeTeamId} onChange={e => setFormData({...formData, homeTeamId: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none">
              {TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold">الفريق الضيف</label>
            <select value={formData.awayTeamId} onChange={e => setFormData({...formData, awayTeamId: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none">
              {TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold">البطولة</label>
            <select value={formData.league} onChange={e => setFormData({...formData, league: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none">
              {LEAGUES.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold">الحالة</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none">
              <option value="upcoming">قادمة</option>
              <option value="live">مباشر</option>
              <option value="finished">انتهت</option>
            </select>
          </div>
          <button type="submit" className="md:col-span-4 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl px-8 py-4 transition-all text-lg shadow-xl shadow-amber-500/20 active:scale-95">
            ➕ نشر المحتوى في الصفحة الرئيسية
          </button>
        </form>
      </div>

      {/* دليل الربح من أدسنس */}
      <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-[3rem] p-10">
        <h2 className="text-white font-black text-2xl mb-4">💰 تفعيل أرباح جوجل أدسنس</h2>
        <p className="text-gray-400 text-sm leading-loose">
          لتحويل هذا الموقع إلى مصدر دخل، يجب عليك ربط دومين خاص (مثل koralive.com) ثم التوجه إلى <a href="https://adsense.google.com" className="text-blue-500 underline">Google AdSense</a> وتقديم طلب مراجعة. الموقع جاهز برمجياً بأماكن مخصصة للإعلانات (Ad Slots) ستظهر بمجرد تفعيل حسابك.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
