import { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, Lock, Zap } from 'lucide-react';

interface AdWatchSectionProps {
  canWatch: boolean;
  remainingAds: number;
  onAdComplete: (amount: number) => void;
}

type AdState = 'idle' | 'loading' | 'playing' | 'complete';

const AD_DURATION = 5; // seconds

export default function AdWatchSection({ canWatch, remainingAds, onAdComplete }: AdWatchSectionProps) {
  const [adState, setAdState] = useState<AdState>('idle');
  const [countdown, setCountdown] = useState(AD_DURATION);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function startAd() {
    if (!canWatch || adState !== 'idle') return;
    console.log('Starting ad watch...');
    setAdState('loading');
    setCountdown(AD_DURATION);
    setProgress(0);

    // Simulate ad loading
    setTimeout(() => {
      setAdState('playing');
      let elapsed = 0;
      intervalRef.current = setInterval(() => {
        elapsed += 0.1;
        const pct = (elapsed / AD_DURATION) * 100;
        setProgress(Math.min(pct, 100));
        setCountdown(Math.max(0, Math.ceil(AD_DURATION - elapsed)));

        if (elapsed >= AD_DURATION) {
          clearInterval(intervalRef.current!);
          setAdState('complete');
          onAdComplete(1);
          console.log('Ad completed, earned 1 EGP');
          setTimeout(() => {
            setAdState('idle');
            setProgress(0);
            setCountdown(AD_DURATION);
          }, 2000);
        }
      }, 100);
    }, 800);
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
              : adState !== 'idle'
              ? 'linear-gradient(135deg, rgba(255,204,0,0.3), rgba(255,140,0,0.2))'
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

            {adState === 'loading' && (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin" />
                <span className="text-yellow-400 font-medium">جاري تحميل الإعلان...</span>
              </div>
            )}

            {adState === 'playing' && (
              <div className="flex flex-col items-center w-full gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-yellow-400 font-medium text-sm">يتم تشغيل الإعلان...</span>
                  <span className="text-white/60 text-sm">{countdown} ثانية</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #ffcc00, #ff8c00)' }}
                  />
                </div>
              </div>
            )}

            {adState === 'complete' && (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">تم! +1 جنيه 🎉</span>
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
