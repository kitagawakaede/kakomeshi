'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useFirebaseUser } from '@/hooks/useFirebaseUser';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getPendingCartRequest, clearPendingCartRequest } from '@/lib/pendingCartStorage';
import { useToast } from '@/app/components/ui/use-toast';

interface FirebaseUserContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  redirectToLogin: () => void;
}

const FirebaseUserContext = createContext<FirebaseUserContextType | undefined>(undefined);

export function FirebaseUserProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useFirebaseUser();
  const router = useRouter();
  const { toast } = useToast();
  const isAuthenticated = !!user;

  // ユーザー認証状態が変わったときに処理
  useEffect(() => {
    // ログイン完了時に実行
    if (user && !loading) {
      // 保存されたカートリクエストがあるか確認
      const pendingRequest = getPendingCartRequest();
      if (pendingRequest) {
        // 保存されたリクエストをクリア
        clearPendingCartRequest();
        
        // ホームページにリダイレクト（カートに追加するため）
        router.push('/');
        
        // 通知
        toast({
          title: "ログインしました",
          description: "カートに商品を追加します",
        });
      }
    }
  }, [user, loading, router, toast]);

  // ログイン画面へのリダイレクト処理
  const redirectToLogin = () => {
    router.push('/login');
  };

  return (
    <FirebaseUserContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated,
      redirectToLogin
    }}>
      {children}
    </FirebaseUserContext.Provider>
  );
}

export function useFirebaseUserContext() {
  const context = useContext(FirebaseUserContext);
  if (context === undefined) {
    throw new Error('useFirebaseUserContext must be used within a FirebaseUserProvider');
  }
  return context;
} 