import { Wallet, TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  totalEarned: number;
  adsToday: number;
  maxAds: number;
}

export default function BalanceCard({ balance, totalEarned, adsToday, maxAds }: BalanceCardProps) {
  const progressPercent = (adsToday / maxAds) * 100;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main balance card */}
      <div className="relative rounded-3xl p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,204,0,0.15) 0%, rgba(255,140,0,0.08) 50%, rgba(255,204,0,0.05) 100%)',
          border: '1px solid rgba(255,204,0,0.3)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(255,204,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}>

        {/* Glow orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ffcc00 0%, transparent 70%)' }} />

        <div className="relative text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-yellow-400 opacity-80" />
            <span className="text-sm font-medium" style={{ color: 'rgba(255,204,0,0.8)' }}>رصيدك الحالي</span>
          </div>

          <div className="flex items-end justify-center gap-2 mb-1">
            <span className="font-bold" style={{ fontSize: '3.5rem', lineHeight: 1, color: '#ffcc00', textShadow: '0 0 30px rgba(255,204,0,0.5)' }}>
              {balance}
            </span>
            <span className="text-2xl font-semibold text-white/70 pb-1">جنيه</span>
          </div>

          <div className="text-sm text-white/40 mt-1">يجب الوصول إلى 100 جنيه للسحب</div>

          {/* Progress to withdrawal */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span>{balance} جنيه</span>
              <span>100 جنيه</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((balance / 100) * 100, 100)}%`,
                  background: 'linear-gradient(90deg, #ffcc00, #ff8c00)',
                  boxShadow: '0 0 8px rgba(255,204,0,0.6)',
                }}
              />
            </div>
            <div className="text-xs text-white/40 mt-1">{Math.max(0, 100 - balance)} جنيه متبقي للسحب</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="rounded-2xl p-4 text-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-xs text-white/50">إجمالي الأرباح</span>
          </div>
          <div className="text-xl font-bold text-green-400">{totalEarned} <span className="text-sm font-normal">جنيه</span></div>
        </div>

        <div className="rounded-2xl p-4 text-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <div className="text-xs text-white/50 mb-1">إعلانات اليوم</div>
          <div className="text-xl font-bold text-yellow-400">{adsToday} <span className="text-sm font-normal text-white/40">/ {maxAds}</span></div>
          <div className="h-1 rounded-full mt-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #ffcc00, #ff8c00)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
