import { useState } from 'react';
import { Play, CheckCircle, Lock, Zap } from 'lucide-react';

interface AdWatchSectionProps {
  canWatch: boolean;
  remainingAds: number;
  onAdComplete: (amount: number) => void;
}

type AdState = 'idle' | 'complete';

export default function AdWatchSection({ canWatch, remainingAds, onAdComplete }: AdWatchSectionProps) {
  const [adState, setAdState] = useState<AdState>('idle');

  function startAd() {
    if (!canWatch || adState !== 'idle') return;

    // 1. تنفيذ إضافة الجنيه وفتح الإعلان فوراً (الموجودين في Index.tsx)
    onAdComplete(1);

    // 2. إظهار علامة النجاح لثانية واحدة فقط لإعطاء انطباع بالربح
    setAdState('complete');
    
    setTimeout(() => {
      setAdState('idle');
    }, 1500);
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      {/* Ad Watch Button */}
      <button
        onClick={startAd}
        disabled={!canWatch || adState !== 'idle'}
        className="w-full relative overflow-hidden rounded-2xl transition-all duration-300 group"
        style={{
          padding: '0',
          border: 'none',
          cursor: canWatch && adState === 'idle' ? 'pointer' : 'not-allowed',
        }}
      >
        <div
          className="relative w-full py-5 px-6 rounded-2xl transition-all duration-300"
          style={{
            background: !canWatch
              ? 'rgba(255,255,255,0.05)'
              : adState === 'complete'
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : 'linear-gradient(135deg, #ffcc00, #ff8c00)',
            boxShadow: canWatch && adState === 'idle' ? '0 0 30px rgba(255,204,0,0.4), 0 8px 32px rgba(255,140,0,0.3)' : 'none',
          }}
        >
          {/* Shimmer effect */}
          {adState === 'idle' && canWatch && (
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', transform: 'skewX(-20deg)' }}
            />
          )}

          <div className="flex items-center justify-center gap-3 relative z-10">
            {adState === 'idle' && canWatch && (
              <>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <Play className="w-5 h-5 text-black fill-black" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-black text-lg">شاهد إعلان واربح</div>
                  <div className="text-sm text-black/70">+1 جنيه لكل إعلان</div>
                </div>
                <div className="mr-auto flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.15)' }}>
                  <Zap className="w-4 h-4 text-black" />
                  <span className="font-bold text-black text-sm">{remainingAds} متبقي</span>
                </div>
              </>
            )}

            {adState === 'complete' && (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">تم فتح الإعلان بنجاح 🎉</span>
              </div>
            )}

            {!canWatch && adState === 'idle' && (
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-white/40" />
                <div className="text-right">
                  <div className="text-white/60 font-medium">وصلت للحد اليومي</div>
                  <div className="text-sm text-white/30">عد غداً لمزيد من الأرباح</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Info */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/30">
        <span>الحد الأقصى اليومي: 50 إعلان = 50 جنيه</span>
      </div>
    </div>
  );
}
