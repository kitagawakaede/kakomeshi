// カート追加リクエストの型定義
interface PendingCartRequest {
  saleDataId: number;
  quantity: number;
  timestamp: number;
}

// 保存時のキー
const PENDING_CART_KEY = 'pending_cart_request';

// カート追加リクエストを保存
export const savePendingCartRequest = (saleDataId: number, quantity: number): void => {
  const request: PendingCartRequest = {
    saleDataId,
    quantity,
    timestamp: Date.now(), // 時間制限を設けるために現在のタイムスタンプを保存
  };
  
  localStorage.setItem(PENDING_CART_KEY, JSON.stringify(request));
};

// 保存されたカート追加リクエストを取得
export const getPendingCartRequest = (): PendingCartRequest | null => {
  try {
    const stored = localStorage.getItem(PENDING_CART_KEY);
    if (!stored) return null;
    
    const request: PendingCartRequest = JSON.parse(stored);
    
    // 30分以上経過したリクエストは無視
    const thirtyMinutesInMs = 30 * 60 * 1000;
    if (Date.now() - request.timestamp > thirtyMinutesInMs) {
      clearPendingCartRequest();
      return null;
    }
    
    return request;
  } catch (error) {
    console.error('保存されたカートリクエストの取得エラー:', error);
    return null;
  }
};

// 保存されたカート追加リクエストを削除
export const clearPendingCartRequest = (): void => {
  localStorage.removeItem(PENDING_CART_KEY);
}; 