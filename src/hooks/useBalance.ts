import { useState, useEffect, useCallback } from 'react';
import { AppState, EarningRecord, WithdrawRequest } from '@/types';

const STORAGE_KEY = 'arbaah_platform_state';
const MAX_ADS_PER_DAY = 50;
const TODAY_KEY = 'arbaah_today';

function getTodayString() {
  return new Date().toDateString();
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    console.log('Error loading state');
  }
  return {
    balance: 0,
    totalEarned: 0,
    adsWatchedToday: 0,
    earnings: [],
    withdrawals: [],
  };
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useBalance() {
  const [state, setState] = useState<AppState>(loadState);
  const [adsToday, setAdsToday] = useState<number>(() => {
    const savedDay = localStorage.getItem(TODAY_KEY + '_date');
    const savedCount = localStorage.getItem(TODAY_KEY + '_count');
    if (savedDay === getTodayString() && savedCount) {
      return parseInt(savedCount);
    }
    return 0;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    localStorage.setItem(TODAY_KEY + '_date', getTodayString());
    localStorage.setItem(TODAY_KEY + '_count', String(adsToday));
  }, [adsToday]);

  const addEarning = useCallback((amount: number) => {
    const record: EarningRecord = {
      id: Date.now().toString(),
      amount,
      timestamp: Date.now(),
      type: 'ad',
    };
    setState(prev => ({
      ...prev,
      balance: prev.balance + amount,
      totalEarned: prev.totalEarned + amount,
      earnings: [record, ...prev.earnings].slice(0, 50),
    }));
    setAdsToday(prev => prev + 1);
    console.log('Earning added:', amount, 'New ads today:', adsToday + 1);
  }, [adsToday]);

  const submitWithdraw = useCallback((phone: string, method: 'vodafone' | 'instapay') => {
    const request: WithdrawRequest = {
      id: Date.now().toString(),
      amount: state.balance,
      phone,
      method,
      status: 'pending',
      timestamp: Date.now(),
    };
    setState(prev => ({
      ...prev,
      balance: 0,
      withdrawals: [request, ...prev.withdrawals],
    }));
    console.log('Withdraw submitted:', request);
    return request;
  }, [state.balance]);

  const canWatchAd = adsToday < MAX_ADS_PER_DAY;
  const remainingAds = MAX_ADS_PER_DAY - adsToday;

  return {
    state,
    adsToday,
    canWatchAd,
    remainingAds,
    maxAds: MAX_ADS_PER_DAY,
    addEarning,
    submitWithdraw,
  };
}
