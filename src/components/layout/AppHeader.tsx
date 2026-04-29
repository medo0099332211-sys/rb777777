import { Coins, LogOut } from 'lucide-react';

interface AppHeaderProps {
  userName: string;
  onLogout: () => void;
}

export default function AppHeader({ userName, onLogout }: AppHeaderProps) {
  return (
    <header className="w-full py-6 px-2">
      <div className="flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #ffcc00, #ff8c00)', boxShadow: '0 0 20px rgba(255,204,0,0.4)' }}>
            <Coins className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">منصة الأرباح</h1>
            <p className="text-xs text-white/35 leading-tight">اربح جنيهات يومياً</p>
          </div>
        </div>

        {/* User + Logout */}
        <div className="flex items-center gap-3">
          <div className="text-left">
            <div className="text-xs text-white/30 leading-tight">مرحباً،</div>
            <div className="text-sm font-bold text-yellow-400 leading-tight">{userName}</div>
          </div>
          <button
            onClick={onLogout}
            title="تسجيل الخروج"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-red-500/20"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <LogOut className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>
    </header>
  );
}
