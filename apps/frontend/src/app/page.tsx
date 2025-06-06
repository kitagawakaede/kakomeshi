"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card } from "@/app/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Badge } from "@/app/components/ui/badge"
import { Search, ShoppingCart, BookOpen, GraduationCap, User, PlusCircle, History, Menu, Trash2, Info, Newspaper, School, CheckCircle } from "lucide-react"
import { useCart } from "./contexts/CartContext"
import { useToast } from "@/app/components/ui/use-toast"
import { Toast, ToastProvider } from "@/app/components/ui/toast"
import Header from "@/app/components/Header"
import { getPendingCartRequest, clearPendingCartRequest, savePendingCartRequest } from '@/lib/pendingCartStorage';
import { useFirebaseUserContext } from './contexts/FirebaseUserContext';
import { signInWithGoogle } from "@/lib/firebaseAuth"

// 型定義
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
  fileFormat: string
  hasAnswer: boolean
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [saleDataList, setSaleDataList] = useState<SaleData[]>([])
  const [filteredData, setFilteredData] = useState<SaleData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [subject, setSubject] = useState("all")
  const { addToCart, cartItems } = useCart()
  const { toast } = useToast()
  const { isAuthenticated } = useFirebaseUserContext();
  const [loadingItemId, setLoadingItemId] = useState<number | null>(null)

  useEffect(() => {
    fetch("http://localhost:3001/sale-data")
      .then((res) => res.json())
      .then((data) => {
        setSaleDataList(data)
        setFilteredData(data)
        console.log("取得したデータ:", data)
      })
      .catch((err) => console.error("取得エラー:", err))
  }, [])

  // ページロード時にペンディング中のカートリクエストを処理
  useEffect(() => {
    const processPendingCartRequest = async () => {
      // ログイン済みかつカート追加リクエストが保存されている場合
      if (isAuthenticated) {
        const pendingRequest = getPendingCartRequest();
        if (pendingRequest) {
          try {
            console.log('保存されたカートリクエストを処理:', pendingRequest);
            await addToCart(pendingRequest.saleDataId, pendingRequest.quantity);
            clearPendingCartRequest();
            
            toast({
              title: "カートに追加しました",
              description: `商品をカートに追加しました`,
            });
          } catch (error) {
            console.error('保存されたカートリクエスト処理エラー:', error);
          }
        }
      }
    };
    
    processPendingCartRequest();
  }, [isAuthenticated, addToCart, toast]);

  // 検索とフィルタリングのロジック
  useEffect(() => {
    let results = saleDataList

    // キーワード検索
    if (searchQuery) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // カテゴリーフィルタリング
    if (category !== "all") {
      if (category === "university") {
        results = results.filter(item => item.universityName)
      }
    }

    // 科目フィルタリング
    if (subject !== "all") {
      results = results.filter(item => item.facultyName.toLowerCase().includes(subject.toLowerCase()))
    }

    setFilteredData(results)
  }, [saleDataList, searchQuery, category, subject])

  // 検索入力のハンドラ
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // カートに追加する処理
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>, exam: SaleData) => {
    e.preventDefault() // リンクの遷移を防止
    e.stopPropagation() // イベントの伝播を防止

    // ローディング状態を設定
    setLoadingItemId(exam.id)
    
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
        setLoadingItemId(null);
        return;
      }
      
      // ログイン済みの場合は直接カートに追加
      await actuallyAddToCart(exam);
    } catch (error) {
      console.error("カート追加またはログイン処理中にエラーが発生しました:", error);
      toast({
        title: "エラーが発生しました",
        description: "もう一度お試しください",
      })
    } finally {
      setLoadingItemId(null);
    }
  }
  
  // 実際のカート追加処理（ログイン済みであることが前提）
  const actuallyAddToCart = async (exam: SaleData) => {
    try {
      await addToCart(exam.id, 1)
      toast({
        title: "カートに追加しました",
        description: `${exam.title}をカートに追加しました`,
      })
    } catch (error) {
      console.error("カート追加エラー:", error);
      toast({
        title: "カートへの追加に失敗しました",
        description: "もう一度お試しください",
      })
    }
  }

  // 商品がカートに既に存在するかチェック
  const isInCart = (examId: number) => {
    return cartItems.some(item => item.saleDataId === examId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Header />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">検索</h2>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
            <Input 
              placeholder="キーワードで検索..." 
              className="pl-10 h-12 border-blue-200" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredData.length > 0 ? (
              filteredData.map((exam) => (
                <div key={exam.id} className="relative group">
                  <Link href={`/exams/${exam.id}`}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md border-blue-100">
                      <div className="flex">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 relative flex items-center justify-center shrink-0">
                          <BookOpen className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{exam.universityName}</Badge>
                            <Badge variant="outline">{exam.facultyName}</Badge>
                            {new Date(exam.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                              <Badge variant="success">新着</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold line-clamp-1">{exam.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {exam.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline">{exam.departmentName}</Badge>
                              <Badge variant="outline">{exam.graduationYear}</Badge>
                            </div>
                            <div className="font-bold mr-2">¥{exam.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                  {isInCart(exam.id) ? (
                    <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-300">
                      カート追加済み
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-400 hover:bg-indigo-500 text-white"
                      onClick={(e) => handleAddToCart(e, exam)}
                      disabled={loadingItemId === exam.id}
                    >
                      {loadingItemId === exam.id ? (
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent mr-1" />
                      ) : (
                        <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                      )}
                      追加
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                該当する過去問が見つかりませんでした。
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-4 px-4 border-t bg-white/80">
        <div className="text-center text-xs text-muted-foreground">
          &copy; 2025 かこメシ. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
