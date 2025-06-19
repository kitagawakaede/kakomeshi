"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ShoppingCart, GraduationCap, CheckCircle } from "lucide-react"
import { useCart } from "@/app/contexts/CartContext"
import { useFirebaseUserContext } from "@/app/contexts/FirebaseUserContext"
import { signInWithGoogle } from "@/lib/firebaseAuth"
import { savePendingCartRequest } from "@/lib/pendingCartStorage"
import Header from "@/app/components/Header"

interface SaleData {
  id: number
  title: string
  universityName: string
  facultyName: string
  departmentName: string
  graduationYear: string
  examUrl: string
  price: number
  description: string
  createdAt: string
  updatedAt: string
}

export default function ExamDetailPage() {
  const params = useParams()
  const { id } = params as { id: string }
  const [exam, setExam] = useState<SaleData | null>(null)
  const { addToCart, cartItems } = useCart()
  const { user, isAuthenticated } = useFirebaseUserContext()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/sale-data/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExam(data);
        console.log("取得した詳細データ:", data);
      })
      .catch((err) => console.error("詳細データ取得エラー:", err))
  }, [id])

  // 商品がカートに既に存在するかチェック
  const isInCart = (examId: number) => {
    return cartItems.some(item => item.saleDataId === examId);
  }

  // カートに追加する処理
  const handleAddToCart = async () => {
    if (!exam) return;
    setLoading(true);
    
    try {
      // 未ログインの場合、先にログイン処理を行う
      if (!isAuthenticated) {
        console.log("未ログイン状態でカート追加を試みました。ログイン処理を開始します。");
        
        // カート追加リクエストを保存
        savePendingCartRequest(exam.id, 1);
        
        // ログイン処理を実行
        const loggedInUser = await signInWithGoogle();
        
        // ログインが完了した場合 (リダイレクト認証に切り替わった場合は null が返される)
        if (loggedInUser) {
          // リダイレクトは FirebaseUserContext 内で自動的に行われるため、
          // ここでは何もしない
          console.log("ログインが完了しました。ホームページにリダイレクトします。");
        }
        
        // ローディング状態を解除して処理を終了
        setLoading(false);
        return;
      }
      
      // ログイン済みの場合は直接カートに追加
      await actuallyAddToCart();
    } catch (error) {
      console.error("カート追加またはログイン処理中にエラーが発生しました:", error);
      setLoading(false);
    }
  };
  
  // 実際のカート追加処理（ログイン済みであることが前提）
  const actuallyAddToCart = async () => {
    if (!exam) return;
    
    try {
      await addToCart(exam.id, 1);
      setSuccess(true);
      
      // 3秒後に成功メッセージを非表示にする
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!exam) return <div className="p-10 text-center text-muted-foreground">読み込み中...</div>

  const inCart = isInCart(exam.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Header />

      <main className="container px-4 py-8 mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex flex-col gap-6">
              <div>
                <Link href="/" className="text-sm text-muted-foreground hover:underline">
                  ← 検索結果に戻る
                </Link>
                <h1 className="mt-2 text-3xl font-bold">
                  {exam.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{exam.universityName}</Badge>
                  <Badge variant="outline">{exam.facultyName}</Badge>
                  <Badge variant="outline">{exam.departmentName}</Badge>
                  <Badge variant="outline">{exam.graduationYear}</Badge>
                  {new Date(exam.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                    <Badge variant="success">新着</Badge>
                  )}
                </div>
              </div>

              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">商品説明</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-4 border rounded-lg mt-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">商品説明</h3>
                    <p className="text-muted-foreground">{exam.description}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">¥{exam.price ? exam.price.toLocaleString() : "価格未設定"}</CardTitle>
                <CardDescription>税込み価格</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {success && (
                  <div className="bg-green-50 text-green-700 p-2 rounded border border-green-200 text-center">
                    カートに追加しました！
                  </div>
                )}
                {inCart && !loading && !success && (
                  <div className="bg-blue-50 text-blue-700 p-2 rounded border border-blue-200 text-center">
                    この商品はカートに追加済みです
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className={`w-full ${inCart ? 'bg-gray-400 hover:bg-gray-500' : 'bg-indigo-400 hover:bg-indigo-500'} text-white`} 
                  onClick={handleAddToCart} 
                  disabled={inCart || loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent rounded-full" />
                      処理中...
                    </span>
                  ) : inCart ? (
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      カート追加済み
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      カートに追加
                    </span>
                  )}
                </Button>
                <Link href="/cart" className="w-full">
                  <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    カートを見る
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
