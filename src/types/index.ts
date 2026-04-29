export interface EarningRecord {
  id: string;
  amount: number;
  timestamp: number;
  type: 'ad' | 'bonus';
}

export interface WithdrawRequest {
  id: string;
  amount: number;
  phone: string;
  method: 'vodafone' | 'instapay';
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

export interface AppState {
  balance: number;
  totalEarned: number;
  adsWatchedToday: number;
  earnings: EarningRecord[];
  withdrawals: WithdrawRequest[];
}
