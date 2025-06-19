"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { useToast } from "@/app/components/ui/use-toast"
import { useFirebaseUserContext } from '@/app/contexts/FirebaseUserContext'
import Header from "@/app/components/Header"
import { use } from "react"

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
}

export default function EditListing({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [formData, setFormData] = useState<SaleData>({
    id: 0,
    title: "",
    universityName: "",
    facultyName: "",
    departmentName: "",
    graduationYear: "",
    examUrl: "",
    price: 0,
    description: ""
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { isAuthenticated } = useFirebaseUserContext()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchListing()
  }, [isAuthenticated])

  const fetchListing = async () => {
    try {
      const response = await fetch(`http://localhost:3001/sale-data/${resolvedParams.id}`)
      if (!response.ok) throw new Error('商品データの取得に失敗しました')
      const data = await response.json()
      setFormData(data)
    } catch (error) {
      console.error('商品データ取得エラー:', error)
      toast({
        title: "エラーが発生しました",
        description: "商品データの取得に失敗しました",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`http://localhost:3001/sale-data/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('商品の更新に失敗しました')

      toast({
        title: "更新完了",
        description: "商品情報を更新しました",
      })

      router.push('/my-listings')
    } catch (error) {
      console.error('更新エラー:', error)
      toast({
        title: "エラーが発生しました",
        description: "商品の更新に失敗しました",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">商品情報の編集</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">タイトル</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">大学名</label>
              <Input
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">学部名</label>
              <Input
                name="facultyName"
                value={formData.facultyName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">学科名</label>
              <Input
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">卒業年</label>
              <Input
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">価格</label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">説明</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "更新中..." : "更新する"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/my-listings')}
              >
                キャンセル
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 