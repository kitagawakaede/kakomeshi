"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ShoppingCart, GraduationCap, FileText, CheckCircle, BookOpen } from "lucide-react"

interface SaleData {
  saleDataId: string
  price: number
  universityName: string
  FacultyName: string
  DepartmentName: string
  className: string
  explanation: string
  Features1: string
  Features2: string
  Features3: string
  someday: string
  isNew?: boolean
}

export default function ExamDetailPage() {
  const params = useParams()
  const { id } = params as { id: string }
  const [exam, setExam] = useState<SaleData | null>(null)

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

  if (!exam) return <div className="p-10 text-center text-muted-foreground">読み込み中...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <GraduationCap className="w-6 h-6" />
            <span>過去問マスター</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                <span className="sr-only">カート</span>
              </Button>
            </Link>
            <Button>ログイン</Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex flex-col gap-6">
              <div>
                <Link href="/" className="text-sm text-muted-foreground hover:underline">
                  ← 検索結果に戻る
                </Link>
                <h1 className="mt-2 text-3xl font-bold">
                  {exam.universityName} {exam.className}
                </h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{exam.FacultyName}</Badge>
                  <Badge variant="outline">{exam.DepartmentName}</Badge>
                  <Badge variant="outline">{exam.someday}</Badge>
                  {exam.isNew && <Badge>新着</Badge>}
                </div>
              </div>

              <div className="aspect-video bg-muted relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <BookOpen className="h-16 w-16 text-gray-400" />
                </div>
              </div>

              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">商品説明</TabsTrigger>
                  <TabsTrigger value="contents">目次</TabsTrigger>
                  <TabsTrigger value="reviews">レビュー</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-4 border rounded-lg mt-2">
                  <div className="space-y-4">
                    <p>{exam.explanation}</p>
                    <h3 className="text-lg font-semibold">特徴</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {exam.Features1 && <li>{exam.Features1}</li>}
                      {exam.Features2 && <li>{exam.Features2}</li>}
                      {exam.Features3 && <li>{exam.Features3}</li>}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="contents" className="p-4 border rounded-lg mt-2">
                  <h3 className="text-lg font-semibold">目次</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                      <span>問題・解答・解説</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="reviews" className="p-4 border rounded-lg mt-2">
                  <p>レビュー機能は現在準備中です。</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">¥{exam.price.toLocaleString()}</CardTitle>
                <CardDescription>税込み価格</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>PDF形式</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>即時ダウンロード可能</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>解答・解説付き</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  カートに追加
                </Button>
                <Button variant="outline" className="w-full">
                  今すぐ購入
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
