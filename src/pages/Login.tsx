import { useState } from 'react';
import { Coins, Chrome, Loader2 } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface LoginPageProps {
  onLogin: (name: string) => void;
}

export default function Login({ onLogin }: LoginPageProps) {
  const [loading, setLoading] = useState(false);

  function handleGoogleLogin() {
    if (loading) return;
    setLoading(true);
    console.log('Simulating Google login...');
    setTimeout(() => {
      setLoading(false);
      onLogin('ميدو');
    }, 1500);
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen relative flex items-center justify-center overflow-hidden px-4"
      style={{ background: 'linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, #ffcc00 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #00d2ff 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #ffcc00, #ff8c00)', boxShadow: '0 0 40px rgba(255,204,0,0.5)' }}
          >
            <Coins className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">منصة الأرباح</h1>
          <p className="text-white/40 text-sm mt-1">شاهد الإعلانات واربح جنيهات يومياً</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-1">
            أهلاً بك 👋
          </h2>
          <p className="text-white/40 text-sm text-center mb-8">
            سجّل دخولك لبدء كسب الأرباح
          </p>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-base transition-all duration-300 group"
            style={{
              background: loading ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: loading ? 'rgba(255,255,255,0.4)' : 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={e => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={e => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white/60" />
                <span>جاري الاتصال بـ Google...</span>
              </>
            ) : (
              <>
                <Chrome className="w-5 h-5 text-white/80" />
                <span>تسجيل الدخول بـ Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-xs text-white/25">أو</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Guest Button */}
          <button
            onClick={() => onLogin('ضيف')}
            className="w-full py-3 rounded-2xl text-sm font-medium transition-all duration-200 hover:bg-white/5"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
            }}
          >
            الدخول كضيف
          </button>

          {/* Terms */}
          <p className="text-white/20 text-xs text-center mt-5 leading-relaxed">
            بالدخول أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </p>
        </div>

        {/* Feature hints */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: '📺', label: 'شاهد إعلانات' },
            { icon: '💰', label: 'اكسب جنيهات' },
            { icon: '📱', label: 'اسحب لحسابك' },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="text-xl mb-1">{f.icon}</div>
              <div className="text-xs text-white/35">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
