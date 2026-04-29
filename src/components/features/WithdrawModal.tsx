import { useState } from 'react';
import { X, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

interface WithdrawModalProps {
  balance: number;
  onClose: () => void;
  onSubmit: (phone: string, method: 'vodafone' | 'instapay') => void;
}

const MIN_WITHDRAW = 100;

export default function WithdrawModal({ balance, onClose, onSubmit }: WithdrawModalProps) {
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState<'vodafone' | 'instapay'>('vodafone');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const canWithdraw = balance >= MIN_WITHDRAW;

  function handleSubmit() {
    setError('');
    if (!phone.trim()) {
      setError('يرجى إدخال رقم الهاتف');
      return;
    }
    if (!/^(010|011|012|015)\d{8}$/.test(phone.trim())) {
      setError('يرجى إدخال رقم هاتف مصري صحيح (10 أرقام)');
      return;
    }
    console.log('Processing withdrawal:', { phone, method, balance });
    onSubmit(phone.trim(), method);
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1a1535 0%, #0f0c29 100%)',
          border: '1px solid rgba(255,204,0,0.2)',
          boxShadow: '0 0 80px rgba(255,204,0,0.15)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <h2 className="text-xl font-bold text-white">طلب سحب الأرباح</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            /* Success state */
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}>
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تم إرسال طلبك بنجاح!</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                سيتم مراجعة طلبك خلال 24-48 ساعة وإرسال المبلغ على الرقم المسجل
              </p>
              <button onClick={onClose} className="mt-6 px-8 py-3 rounded-2xl font-bold text-black transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #ffcc00, #ff8c00)' }}>
                حسناً
              </button>
            </div>
          ) : !canWithdraw ? (
            /* Insufficient balance */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(255,100,50,0.15)', border: '1px solid rgba(255,100,50,0.3)' }}>
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">رصيد غير كافٍ</h3>
              <p className="text-white/50 text-sm">الحد الأدنى للسحب هو <span className="text-yellow-400 font-bold">100 جنيه</span></p>
              <p className="text-white/40 text-sm mt-1">رصيدك الحالي: <span className="text-white font-semibold">{balance} جنيه</span></p>
              <p className="text-white/40 text-sm mt-1">تحتاج: <span className="text-yellow-400 font-semibold">{100 - balance} جنيه إضافي</span></p>
              <button onClick={onClose} className="mt-6 px-8 py-3 rounded-2xl font-medium text-white/60 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                إغلاق
              </button>
            </div>
          ) : (
            /* Withdrawal form */
            <>
              {/* Amount display */}
              <div className="rounded-2xl p-4 text-center mb-5"
                style={{ background: 'rgba(255,204,0,0.08)', border: '1px solid rgba(255,204,0,0.2)' }}>
                <div className="text-sm text-white/50 mb-1">المبلغ الذي ستسحبه</div>
                <div className="text-3xl font-bold text-yellow-400">{balance} <span className="text-lg font-normal text-white/60">جنيه</span></div>
              </div>

              {/* Payment method */}
              <div className="mb-5">
                <label className="text-sm font-medium text-white/70 block mb-3">طريقة الاستلام</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['vodafone', 'instapay'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className="py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: method === m ? 'rgba(255,204,0,0.15)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${method === m ? 'rgba(255,204,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
                        color: method === m ? '#ffcc00' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {m === 'vodafone' ? '📱 فودافون كاش' : '💳 إنستا باي'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone input */}
              <div className="mb-5">
                <label className="text-sm font-medium text-white/70 block mb-2">رقم الهاتف</label>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${error ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.12)'}` }}>
                  <Phone className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setError(''); }}
                    placeholder="01XXXXXXXXX"
                    className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-right"
                    style={{ direction: 'ltr', textAlign: 'right' }}
                    maxLength={11}
                  />
                </div>
                {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 rounded-2xl font-bold text-black text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #ffcc00, #ff8c00)', boxShadow: '0 0 20px rgba(255,204,0,0.3)' }}
              >
                تأكيد طلب السحب
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
