"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// APIのベースURL
const API_BASE_URL = 'http://localhost:3001';

interface CartItem {
  id: number;
  saleDataId: number;
  quantity: number;
  saleData: {
    id: number;
    title: string;
    price: number;
    fileFormat: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (saleDataId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get<CartItem[]>(`${API_BASE_URL}/cart`);
      console.log('カートデータ取得:', response.data);
      
      if (Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        console.warn('カートデータが配列ではありません:', response.data);
        setCartItems([]);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('カート取得エラー:', err);
      setError(`カートの取得に失敗しました: ${err.message || 'Unknown error'}`);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const refreshCart = async () => {
    await fetchCartItems();
  };

  const addToCart = async (saleDataId: number, quantity: number) => {
    try {
      console.log('カートに追加:', { saleDataId, quantity });
      const response = await axios.post(`${API_BASE_URL}/cart/add`, { saleDataId, quantity });
      console.log('カート追加レスポンス:', response.data);
      
      // 追加後に最新のカート情報を取得
      await fetchCartItems();
      setError(null);
      return Promise.resolve();
    } catch (err: any) {
      console.error('カート追加エラー:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
      setError(`カートへの追加に失敗しました: ${errorMessage}`);
      return Promise.reject(err);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      console.log('カートから削除リクエスト:', cartItemId);
      const response = await axios.delete(`${API_BASE_URL}/cart/${cartItemId}`);
      console.log('カート削除レスポンス:', response.data);
      
      // 削除後に最新のカート情報を取得するのではなく、ローカルステートを更新
      setCartItems(prevItems => {
        const newItems = prevItems.filter(item => item.id !== cartItemId);
        console.log('削除後の新しいカートアイテム:', newItems);
        return newItems;
      });
      
      setError(null);
      return Promise.resolve();
    } catch (err: any) {
      console.error('カート削除エラー:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
      setError(`カートからの削除に失敗しました: ${errorMessage}`);
      return Promise.reject(err);
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) {
      setError('数量は1以上を指定してください');
      return;
    }
    
    try {
      console.log('数量更新:', { cartItemId, quantity });
      const response = await axios.post(`${API_BASE_URL}/cart/update/${cartItemId}`, { quantity });
      console.log('数量更新レスポンス:', response.data);
      
      // 更新後に最新のカート情報を取得
      await fetchCartItems();
      setError(null);
    } catch (err: any) {
      console.error('数量更新エラー:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
      setError(`数量の更新に失敗しました: ${errorMessage}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 