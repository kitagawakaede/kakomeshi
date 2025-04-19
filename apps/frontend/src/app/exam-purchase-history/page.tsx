import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import {
  GraduationCap,
  Download,
  Search,
  FileText,
  Calendar,
  ShoppingCart,
  MoreHorizontal,
  Eye,
  Star,
  Filter,
  BookOpen,
  School,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function ExamPurchaseHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-indigo-50 border-b">
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
            <Button>ログアウト</Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">過去問購入履歴</h1>
            <p className="text-muted-foreground">購入した過去問題集の一覧です。ダウンロードや閲覧が可能です。</p>
          </div>

          <div className="flex flex-col gap-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="bg-white/70 p-1">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  >
                    すべて
                  </TabsTrigger>
                  <TabsTrigger
                    value="university"
                    className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  >
                    大学入試
                  </TabsTrigger>
                  <TabsTrigger
                    value="certification"
                    className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                  >
                    資格試験
                  </TabsTrigger>
                  <TabsTrigger
                    value="language"
                    className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700"
                  >
                    語学試験
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                    <Input placeholder="過去問を検索..." className="pl-9 border-blue-200 focus-visible:ring-blue-300" />
                  </div>
                  <Button variant="outline" size="icon" className="border-blue-200 hover:bg-blue-50 text-blue-600">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">フィルター</span>
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{examPurchaseHistory.length}件の購入履歴があります</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">並び替え:</span>
                  <select className="text-sm border rounded-md px-2 py-1">
                    <option>購入日（新しい順）</option>
                    <option>購入日（古い順）</option>
                    <option>価格（高い順）</option>
                    <option>価格（安い順）</option>
                  </select>
                </div>
              </div>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {examPurchaseHistory.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden border-blue-100 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="sm:flex">
                        <div className="w-full sm:w-64 h-40 sm:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0">
                          {item.examType === "大学入試" && <School className="h-16 w-16 text-blue-500" />}
                          {item.examType === "資格試験" && <FileText className="h-16 w-16 text-purple-500" />}
                          {item.examType === "語学試験" && <BookOpen className="h-16 w-16 text-emerald-500" />}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge
                                  variant={
                                    item.examType === "大学入試"
                                      ? "university"
                                      : item.examType === "資格試験"
                                        ? "certification"
                                        : "language"
                                  }
                                >
                                  {item.examType}
                                </Badge>
                                <Badge variant="outline">{item.subject}</Badge>
                                {item.accessCount > 5 && (
                                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-transparent">
                                    よく利用
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold">{item.title}</h3>
                              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>購入日: {item.purchaseDate}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>最終アクセス: {item.lastAccessed}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Eye className="w-4 h-4" />
                                  <span>アクセス回数: {item.accessCount}回</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>ステータス: {item.status}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="text-lg font-bold">¥{item.price.toLocaleString()}</div>
                              <div className="flex items-center gap-1">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex flex-wrap gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              asChild
                            >
                              <Link href={`/exams/${item.id}`}>
                                <Eye className="w-4 h-4 mr-1" />
                                詳細を見る
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              ダウンロード
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>オプション</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Star className="w-4 h-4 mr-2" />
                                  レビューを書く
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="w-4 h-4 mr-2" />
                                  領収書を表示
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">問題を報告</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="university" className="mt-6">
                <div className="space-y-4">
                  {examPurchaseHistory
                    .filter((item) => item.examType === "大学入試")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden border-blue-100 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="sm:flex">
                          <div className="w-full sm:w-64 h-40 sm:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0">
                            <School className="h-16 w-16 text-blue-500" />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="university">大学入試</Badge>
                                  <Badge variant="outline">{item.subject}</Badge>
                                  {item.accessCount > 5 && (
                                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-transparent">
                                      よく利用
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>購入日: {item.purchaseDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>最終アクセス: {item.lastAccessed}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Eye className="w-4 h-4" />
                                    <span>アクセス回数: {item.accessCount}回</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>ステータス: {item.status}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="text-lg font-bold">¥{item.price.toLocaleString()}</div>
                                <div className="flex items-center gap-1">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex flex-wrap gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                asChild
                              >
                                <Link href={`/exams/${item.id}`}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  詳細を見る
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                ダウンロード
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>オプション</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Star className="w-4 h-4 mr-2" />
                                    レビューを書く
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="w-4 h-4 mr-2" />
                                    領収書を表示
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500">問題を報告</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="certification" className="mt-6">
                <div className="space-y-4">
                  {examPurchaseHistory
                    .filter((item) => item.examType === "資格試験")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden border-blue-100 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="sm:flex">
                          <div className="w-full sm:w-64 h-40 sm:h-auto bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shrink-0">
                            <FileText className="h-16 w-16 text-purple-500" />
                          </div>
                          <div className="flex-1 p-6">
                            {/* 内容は大学入試と同様 */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="certification">資格試験</Badge>
                                  <Badge variant="outline">{item.subject}</Badge>
                                  {item.accessCount > 5 && (
                                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-transparent">
                                      よく利用
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>購入日: {item.purchaseDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>最終アクセス: {item.lastAccessed}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Eye className="w-4 h-4" />
                                    <span>アクセス回数: {item.accessCount}回</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>ステータス: {item.status}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="text-lg font-bold">¥{item.price.toLocaleString()}</div>
                                <div className="flex items-center gap-1">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex flex-wrap gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                asChild
                              >
                                <Link href={`/exams/${item.id}`}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  詳細を見る
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                ダウンロード
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>オプション</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Star className="w-4 h-4 mr-2" />
                                    レビューを書く
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="w-4 h-4 mr-2" />
                                    領収書を表示
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500">問題を報告</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="language" className="mt-6">
                <div className="space-y-4">
                  {examPurchaseHistory
                    .filter((item) => item.examType === "語学試験")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden border-blue-100 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="sm:flex">
                          <div className="w-full sm:w-64 h-40 sm:h-auto bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shrink-0">
                            <BookOpen className="h-16 w-16 text-emerald-500" />
                          </div>
                          <div className="flex-1 p-6">
                            {/* 内容は大学入試と同様 */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="language">語学試験</Badge>
                                  <Badge variant="outline">{item.subject}</Badge>
                                  {item.accessCount > 5 && (
                                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-transparent">
                                      よく利用
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>購入日: {item.purchaseDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>最終アクセス: {item.lastAccessed}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Eye className="w-4 h-4" />
                                    <span>アクセス回数: {item.accessCount}回</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>ステータス: {item.status}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="text-lg font-bold">¥{item.price.toLocaleString()}</div>
                                <div className="flex items-center gap-1">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex flex-wrap gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                asChild
                              >
                                <Link href={`/exams/${item.id}`}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  詳細を見る
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                ダウンロード
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>オプション</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Star className="w-4 h-4 mr-2" />
                                    レビューを書く
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="w-4 h-4 mr-2" />
                                    領収書を表示
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500">問題を報告</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t bg-white/80">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">&copy; 2024 過去問マスター. All rights reserved.</p>
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
  )
}

// Sample purchase history data
const examPurchaseHistory = [
  {
    id: 1,
    title: "東京大学 2023年度 前期試験 数学",
    examType: "大学入試",
    subject: "数学",
    purchaseDate: "2024/04/05",
    lastAccessed: "2024/04/07",
    accessCount: 8,
    price: 1200,
    status: "完了",
    rating: 5,
  },
  {
    id: 2,
    title: "京都大学 2023年度 一般入試 英語",
    examType: "大学入試",
    subject: "英語",
    purchaseDate: "2024/04/05",
    lastAccessed: "2024/04/06",
    accessCount: 3,
    price: 1200,
    status: "完了",
    rating: 4,
  },
  {
    id: 3,
    title: "TOEIC 公式問題集 2023",
    examType: "語学試験",
    subject: "英語",
    purchaseDate: "2024/03/20",
    lastAccessed: "2024/04/01",
    accessCount: 12,
    price: 3500,
    status: "完了",
    rating: 5,
  },
  {
    id: 4,
    title: "基本情報技術者試験 2022年度 春期",
    examType: "資格試験",
    subject: "IT",
    purchaseDate: "2024/02/15",
    lastAccessed: "2024/03/10",
    accessCount: 6,
    price: 1500,
    status: "完了",
    rating: 4,
  },
  {
    id: 5,
    title: "センター試験 2022年度 国語",
    examType: "大学入試",
    subject: "国語",
    purchaseDate: "2024/01/30",
    lastAccessed: "2024/02/15",
    accessCount: 4,
    price: 980,
    status: "完了",
    rating: 3,
  },
  {
    id: 6,
    title: "日本史検定 2級 2022年度",
    examType: "資格試験",
    subject: "社会",
    purchaseDate: "2023/12/10",
    lastAccessed: "2024/01/05",
    accessCount: 2,
    price: 1800,
    status: "完了",
    rating: 4,
  },
  {
    id: 7,
    title: "司法試験 過去問題集 2022年度",
    examType: "資格試験",
    subject: "法律",
    purchaseDate: "2023/11/05",
    lastAccessed: "2023/12/20",
    accessCount: 15,
    price: 4500,
    status: "完了",
    rating: 5,
  },
  {
    id: 8,
    title: "英検1級 過去問題集 2023年度",
    examType: "語学試験",
    subject: "英語",
    purchaseDate: "2023/10/22",
    lastAccessed: "2023/11/15",
    accessCount: 7,
    price: 2800,
    status: "完了",
    rating: 4,
  },
]
