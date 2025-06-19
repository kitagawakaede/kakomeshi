"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { useToast } from "@/app/components/ui/use-toast"
import { useFirebaseUserContext } from '../contexts/FirebaseUserContext'
import { Edit, Trash2, PlusCircle } from "lucide-react"
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

export default function MyListings() {
  const [listings, setListings] = useState<SaleData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const { isAuthenticated, user } = useFirebaseUserContext()

  useEffect(() => {
    console.log('認証状態:', isAuthenticated); // デバッグ用
    console.log('ユーザー情報:', user); // デバッグ用
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user?.uid) {
      fetchMyListings()
    }
  }, [isAuthenticated, user])

  const fetchMyListings = async () => {
    try {
      if (!user?.uid) {
        throw new Error('ユーザーIDが取得できません');
      }
      console.log('ユーザーID:', user.uid); // デバッグ用
      console.log('ユーザー情報全体:', user); // デバッグ用
      
      const response = await fetch(`http://localhost:3001/sale-data/user/${user.uid}`)
      console.log('APIレスポンス:', response); // デバッグ用
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('APIエラーレスポンス:', errorText); // デバッグ用
        throw new Error(`出品データの取得に失敗しました: ${response.status} ${errorText}`);
      }
      
      const data = await response.json()
      console.log('取得したデータ:', data); // デバッグ用
      setListings(data)
    } catch (error) {
      console.error('出品データ取得エラー:', error)
      toast({
        title: "エラーが発生しました",
        description: "出品データの取得に失敗しました",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('本当にこの商品を削除しますか？')) return

    try {
      const response = await fetch(`http://localhost:3001/sale-data/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('商品の削除に失敗しました')

      toast({
        title: "削除完了",
        description: "商品を削除しました",
      })

      // リストを更新
      setListings(listings.filter(item => item.id !== id))
    } catch (error) {
      console.error('削除エラー:', error)
      toast({
        title: "エラーが発生しました",
        description: "商品の削除に失敗しました",
      })
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/sell/edit/${id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Header />
        <main className="container px-4 py-8 mx-auto">
          <div className="text-center">読み込み中...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Header />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">出品した商品一覧</h1>
          <Button
            onClick={() => router.push('/sell')}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            新規出品
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {listings.length > 0 ? (
            listings.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.universityName}</Badge>
                    <Badge variant="outline">{item.facultyName}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">¥{item.price.toLocaleString()}</div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          編集
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          削除
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-muted-foreground">
              出品した商品はありません。
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 