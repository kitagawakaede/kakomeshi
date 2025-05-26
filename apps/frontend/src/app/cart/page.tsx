'use client';

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/separator"
import { GraduationCap, Trash2, ShoppingCart, CreditCard, AlertCircle, RefreshCw } from "lucide-react"
import { useCart } from "@/app/contexts/CartContext"
import { Input } from "@/app/components/ui/input"
import { useEffect, useState } from "react"
import { useToast } from "@/app/components/ui/use-toast"

export default function CartPage() {
  const { cartItems, loading, error, removeFromCart, updateQuantity, refreshCart } = useCart();
  const { toast } = useToast();
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.saleData.price * item.quantity), 0);
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  // デバッグ用
  useEffect(() => {
    console.log('カートページに表示されるアイテム:', cartItems);
  }, [cartItems]);

  // カートアイテムを削除する処理
  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      setRemovingItemId(cartItemId);
      await removeFromCart(cartItemId);
      toast({
        title: "商品を削除しました",
        type: "success",
      });
    } catch (err) {
      toast({
        title: "削除に失敗しました",
        type: "error",
      });
    } finally {
      setRemovingItemId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-red-500 font-medium">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            再読み込み
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <GraduationCap className="w-6 h-6" />
            <span>過去問マスター</span>
          </Link>
          <Button>ログイン</Button>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <h1 className="text-3xl font-bold">ショッピングカート</h1>
            </div>
            <Button variant="outline" size="sm" onClick={refreshCart} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              更新
            </Button>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>カート内の商品 ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-4 py-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                            <GraduationCap className="w-8 h-8 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.saleData.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.saleData.fileFormat}形式</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-16"
                            />
                          </div>
                          <div className="text-right">
                            <div className="font-medium">¥{(item.saleData.price * item.quantity).toLocaleString()}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveFromCart(item.id)}
                            disabled={removingItemId === item.id}
                          >
                            {removingItemId === item.id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                            <span className="sr-only">削除</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/">← ショッピングを続ける</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>注文内容</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex justify-between">
                      <span>小計</span>
                      <span>¥{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>消費税 (10%)</span>
                      <span>¥{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>合計</span>
                      <span>¥{total.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      購入手続きへ
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="text-center p-8">
              <div className="flex flex-col items-center gap-4">
                <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                <CardTitle>カートは空です</CardTitle>
                <CardDescription>商品をカートに追加してください</CardDescription>
                <Button asChild>
                  <Link href="/">ショッピングを始める</Link>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">&copy; 2025 過去問マスター. All rights reserved.</p>
            <div className="flex gap-4 text-sm">
              <Link href="/about" className="text-muted-foreground hover:underline">
                会社概要
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:underline">
                利用規約
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:underline">
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:underline">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
