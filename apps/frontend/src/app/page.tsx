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
import { Search, ShoppingCart, BookOpen, GraduationCap, User, PlusCircle, History, Menu } from "lucide-react"

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-indigo-50 border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <GraduationCap className="w-6 h-6" />
            <span className="hidden sm:inline">過去問マスター</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                <span className="sr-only">カート</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/exam-purchase-history" className="flex items-center cursor-pointer">
                    <History className="mr-2 h-4 w-4" />
                    <span>購入履歴</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sell" className="flex items-center cursor-pointer">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>過去問を出品する</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>ログイン / 登録</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">過去問検索</h2>
            <p className="text-muted-foreground">様々な試験の過去問を検索して購入できます。</p>
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
                <Link href={`/exams/${exam.id}`} key={exam.id}>
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
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{exam.departmentName}</Badge>
                            <Badge variant="outline">{exam.graduationYear}</Badge>
                          </div>
                          <div className="font-bold">¥{exam.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
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
          &copy; 2024 過去問マスター. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
