"use client"

import React, { createContext, useState, useEffect, ReactNode } from 'react'

export interface ToastProps {
  title: string
  description?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastContextType {
  toast: (props: ToastProps) => void
  toasts: ToastProps[]
  removeToast: (index: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const newToast = {
      ...props,
      duration: props.duration || 3000,
      type: props.type || 'success'
    }
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (index: number) => {
    setToasts(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast, index) => (
          <Toast 
            key={index} 
            {...toast} 
            onClose={() => removeToast(index)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastComponentProps extends ToastProps {
  onClose: () => void
}

export function Toast({ title, description, type = 'success', duration = 3000, onClose }: ToastComponentProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-white border-gray-200 text-gray-800'
    }
  }

  return (
    <div className={`p-4 rounded-lg shadow-md border ${getTypeStyles()} max-w-sm w-full animate-slide-in`}>
      <div className="flex justify-between">
        <div className="font-medium">{title}</div>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      {description && <div className="mt-1 text-sm">{description}</div>}
    </div>
  )
}

// アニメーションのためのCSSをグローバルに追加
// 実際のプロジェクトではtailwind.config.jsに追加するか、globals.cssに記述してください
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease-out forwards;
    }
  `
  document.head.appendChild(style)
} 