import { Clock, TrendingDown } from 'lucide-react';
import { EarningRecord, WithdrawRequest } from '@/types';

interface EarningsHistoryProps {
  earnings: EarningRecord[];
  withdrawals: WithdrawRequest[];
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (minutes < 1) return 'الآن';
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  return `منذ ${Math.floor(hours / 24)} يوم`;
}

const statusLabels: Record<string, string> = {
  pending: 'قيد المراجعة',
  approved: 'تمت الموافقة',
  rejected: 'مرفوض',
};

const statusColors: Record<string, string> = {
  pending: '#ffcc00',
  approved: '#22c55e',
  rejected: '#ef4444',
};

export default function EarningsHistory({ earnings, withdrawals }: EarningsHistoryProps) {
  const hasAny = earnings.length > 0 || withdrawals.length > 0;

  if (!hasAny) {
    return (
      <div className="w-full max-w-lg mx-auto mt-8">
        <div className="rounded-2xl p-8 text-center"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <Clock className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/30 text-sm">لا يوجد سجل بعد. ابدأ بمشاهدة الإعلانات!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-8 pb-8">
      <h3 className="text-base font-semibold text-white/60 mb-4 px-1">سجل الأرباح والسحوبات</h3>

      <div className="flex flex-col gap-2">
        {withdrawals.slice(0, 3).map(w => (
          <div key={w.id} className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.2)' }}>
              <TrendingDown className="w-4 h-4 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/80">طلب سحب</div>
              <div className="text-xs text-white/30 mt-0.5 flex items-center gap-2">
                <span>{w.method === 'vodafone' ? 'فودافون كاش' : 'إنستا باي'}</span>
                <span>·</span>
                <span>{timeAgo(w.timestamp)}</span>
              </div>
            </div>
            <div className="text-left shrink-0">
              <div className="text-base font-bold text-red-400">-{w.amount} جنيه</div>
              <div className="text-xs mt-0.5" style={{ color: statusColors[w.status] }}>{statusLabels[w.status]}</div>
            </div>
          </div>
        ))}

        {earnings.slice(0, 10).map(e => (
          <div key={e.id} className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
              style={{ background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.2)' }}>
              📺
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/70">مشاهدة إعلان</div>
              <div className="text-xs text-white/30 mt-0.5">{timeAgo(e.timestamp)}</div>
            </div>
            <div className="text-base font-bold text-yellow-400 shrink-0">+{e.amount} جنيه</div>
          </div>
        ))}
      </div>
    </div>
  );
}
