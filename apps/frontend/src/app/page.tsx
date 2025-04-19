import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card } from "@/app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
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

export default function Home() {
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
              <DropdownMenuContent align="end" className="w-56">
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

      <div className="container px-4 py-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">過去問で学習効率アップ</h1>
          <p className="text-lg text-muted-foreground mb-6">様々な試験の過去問を検索・購入できるプラットフォーム</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700" size="lg" asChild>
              <Link href="#search">過去問を探す</Link>
            </Button>
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50" size="lg" asChild>
              <Link href="/sell">
                <PlusCircle className="mr-2 h-4 w-4" />
                過去問を出品する
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 pb-8 mx-auto" id="search">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">過去問検索</h2>
            <p className="text-muted-foreground">様々な試験の過去問を検索して購入できます。</p>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
            <Input placeholder="キーワードで検索..." className="pl-10 h-12 border-blue-200" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Select>
              <SelectTrigger className="border-blue-200 h-12">
                <SelectValue placeholder="カテゴリー" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="university">大学入試</SelectItem>
                <SelectItem value="highschool">高校入試</SelectItem>
                <SelectItem value="certification">資格試験</SelectItem>
                <SelectItem value="language">語学試験</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="border-blue-200 h-12">
                <SelectValue placeholder="科目" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="math">数学</SelectItem>
                <SelectItem value="japanese">国語</SelectItem>
                <SelectItem value="english">英語</SelectItem>
                <SelectItem value="science">理科</SelectItem>
                <SelectItem value="social">社会</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {examData.map((exam) => (
              <Link href={`/exams/${exam.id}`} key={exam.id}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-md border-blue-100">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 relative flex items-center justify-center shrink-0">
                      <BookOpen className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex flex-col h-full">
                        <div>
                          {exam.isNew && (
                            <Badge className="mb-1 bg-amber-100 text-amber-700 hover:bg-amber-200 border-transparent text-xs">
                              新着
                            </Badge>
                          )}
                          <h3 className="font-medium text-sm line-clamp-2">{exam.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {exam.category} | {exam.year}年
                          </p>
                        </div>
                        <div className="mt-auto pt-2 flex justify-between items-center">
                          <div className="font-bold">¥{exam.price.toLocaleString()}</div>
                          <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700">
                            カートに追加
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
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

// Sample data
const examData = [
  {
    id: 1,
    title: "東京大学 2023年度 前期試験 数学",
    category: "大学入試",
    subject: "数学",
    year: 2023,
    price: 1200,
    isNew: true,
  },
  {
    id: 2,
    title: "京都大学 2023年度 一般入試 英語",
    category: "大学入試",
    subject: "英語",
    year: 2023,
    price: 1200,
    isNew: true,
  },
  {
    id: 3,
    title: "センター試験 2022年度 国語",
    category: "大学入試",
    subject: "国語",
    year: 2022,
    price: 980,
    isNew: false,
  },
  {
    id: 4,
    title: "TOEIC 公式問題集 2023",
    category: "語学試験",
    subject: "英語",
    year: 2023,
    price: 3500,
    isNew: true,
  },
]
