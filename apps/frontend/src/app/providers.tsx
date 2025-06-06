'use client';

import { ReactNode } from 'react';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './components/ui/toast';
import { FirebaseUserProvider } from '@/app/contexts/FirebaseUserContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <FirebaseUserProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </FirebaseUserProvider>
    </ToastProvider>
  );
} 