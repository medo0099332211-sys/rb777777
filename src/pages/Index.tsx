import { useState, useEffect } from 'react';
import { useBalance } from '@/hooks/useBalance';
import AppHeader from '@/components/layout/AppHeader';
import BalanceCard from '@/components/features/BalanceCard';
import AdWatchSection from '@/components/features/AdWatchSection';
import WithdrawModal from '@/components/features/WithdrawModal';
import EarningsHistory from '@/components/features/EarningsHistory';
import heroBg from '@/assets/hero-bg.jpg';

interface IndexProps {
  userName: string;
  onLogout: () => void;
}

export default function Index({ userName, onLogout }: IndexProps) {
  // ملاحظة: الـ 50 إعلان لازم تتعدل كمان في ملف useBalance.ts عشان السيستم يقبلها برمجياً
  const { state, adsToday, canWatchAd, remainingAds, maxAds, addEarning, submitWithdraw } = useBalance();
  const [showWithdraw, setShowWithdraw] = useState(false);

  // دالة التعامل مع الإعلانات عند الضغط
  function handleAdComplete(amount: number) {
    // 1. تشغيل كود Monetag عند النقر (الموني تاج بيفتح الإعلان تلقائياً بناءً على الـ Script المدمج)
    // وفي حال كنت تستخدم Direct Link يمكنك استخدام window.open هنا
    
    // 2. إضافة الجنيه للرصيد (وهمي)
    addEarning(amount);
    
    console.log("تمت مشاهدة الإعلان وإضافة 1 جنيه");
  }

  function handleWithdrawSubmit(phone: string, method: 'vodafone' | 'instapay') {
    submitWithdraw(phone, method);
    // التنبيه بيظهر تلقائياً من خلال الـ Hook أو الـ Modal
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        fontFamily: "'Segoe UI', 'Cairo', Arial, sans-serif",
      }}
    >
      {/* كود Monetag المدمج في الصفحة */}
      <script src="https://quge5.com/88/tag.min.js" data-zone="234711" async data-cfasync="false"></script>

      {/* Hero background overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #ffcc00 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #00d2ff 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative z-10 max-w-lg mx-auto px-4">
        <AppHeader userName={userName} onLogout={onLogout} />

        <BalanceCard
          balance={state.balance}
          totalEarned={state.totalEarned}
          adsToday={adsToday}
          maxAds={50} // تحديث الواجهة لـ 50 إعلان
        />

        <AdWatchSection
          canWatch={canWatchAd}
          remainingAds={remainingAds}
          onAdComplete={handleAdComplete}
        />

        {/* Withdraw button */}
        <div className="mt-4 w-full max-w-lg mx-auto">
          <button
            onClick={() => setShowWithdraw(true)}
            className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'rgba(0, 210, 255, 0.1)',
              border: '1px solid rgba(0, 210, 255, 0.3)',
              color: '#00d2ff',
              backdropFilter: 'blur(10px)',
            }}
          >
            💳 طلب سحب الأرباح
          </button>
        </div>

        {/* تعليمات المنصة المحدثة */}
        <div className="mt-6 rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-sm font-semibold text-white/50 mb-3">كيف تعمل المنصة؟</h3>
          <div className="flex flex-col gap-2">
            {[
              { icon: '📺', text: 'شاهد إعلانًا واكسب 1 جنيه لكل مشاهدة' },
              { icon: '🔄', text: 'يمكنك مشاهدة حتى 50 إعلانًا يوميًا' },
              { icon: '💰', text: 'اجمع 100 جنيه واطلب السحب' },
              { icon: '📱', text: 'استلم أموالك عبر فودافون كاش أو إنستا باي خلال 1-3 أيام' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/40">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <EarningsHistory earnings={state.earnings} withdrawals={state.withdrawals} />
      </div>

      {showWithdraw && (
        <WithdrawModal
          balance={state.balance}
          onClose={() => setShowWithdraw(false)}
          onSubmit={(phone, method) => {
            handleWithdrawSubmit(phone, method);
          }}
        />
      )}
    </div>
  );
}
