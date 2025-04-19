import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { GraduationCap, Download, Search, FileText, Clock, ShoppingCart } from "lucide-react"

export default function PurchaseHistoryPage() {
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
            <Button>ログアウト</Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">購入履歴</h1>
            <p className="text-muted-foreground">
              過去に購入した試験問題の一覧です。ダウンロードボタンから再度ダウンロードできます。
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="購入履歴を検索..." className="pl-9" />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="期間" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての期間</SelectItem>
                    <SelectItem value="30days">過去30日間</SelectItem>
                    <SelectItem value="6months">過去6ヶ月</SelectItem>
                    <SelectItem value="1year">過去1年</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
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
              </div>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="list">リスト表示</TabsTrigger>
                <TabsTrigger value="card">カード表示</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <Card>
                  <CardHeader>
                    <CardTitle>購入履歴一覧</CardTitle>
                    <CardDescription>合計購入数: {purchaseHistory.length} 件</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>注文番号</TableHead>
                          <TableHead>商品名</TableHead>
                          <TableHead className="hidden md:table-cell">購入日</TableHead>
                          <TableHead className="hidden md:table-cell">カテゴリー</TableHead>
                          <TableHead className="text-right">価格</TableHead>
                          <TableHead className="text-center">ステータス</TableHead>
                          <TableHead className="text-right">アクション</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {purchaseHistory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.orderId}</TableCell>
                            <TableCell>
                              <div className="max-w-[250px] truncate" title={item.title}>
                                {item.title}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{item.purchaseDate}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                            <TableCell className="text-right">¥{item.price.toLocaleString()}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={item.status === "完了" ? "success" : "outline"}>{item.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline" className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">ダウンロード</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="card">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {purchaseHistory.map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">注文番号: {item.orderId}</CardDescription>
                          </div>
                          <Badge variant={item.status === "完了" ? "success" : "outline"}>{item.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{item.purchaseDate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            <span>{item.category}</span>
                          </div>
                          <div className="col-span-2 mt-2">
                            <div className="font-medium">¥{item.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6">
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          ダウンロード
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t">
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
const purchaseHistory = [
  {
    id: 1,
    orderId: "ORD-2024-0001",
    title: "東京大学 2023年度 前期試験 数学",
    purchaseDate: "2024/04/05",
    category: "大学入試",
    price: 1200,
    status: "完了",
  },
  {
    id: 2,
    orderId: "ORD-2024-0001",
    title: "京都大学 2023年度 一般入試 英語",
    purchaseDate: "2024/04/05",
    category: "大学入試",
    price: 1200,
    status: "完了",
  },
  {
    id: 3,
    orderId: "ORD-2024-0002",
    title: "TOEIC 公式問題集 2023",
    purchaseDate: "2024/03/20",
    category: "語学試験",
    price: 3500,
    status: "完了",
  },
  {
    id: 4,
    orderId: "ORD-2024-0003",
    title: "基本情報技術者試験 2022年度 春期",
    purchaseDate: "2024/02/15",
    category: "資格試験",
    price: 1500,
    status: "完了",
  },
  {
    id: 5,
    orderId: "ORD-2024-0004",
    title: "センター試験 2022年度 国語",
    purchaseDate: "2024/01/30",
    category: "大学入試",
    price: 980,
    status: "完了",
  },
  {
    id: 6,
    orderId: "ORD-2023-0025",
    title: "日本史検定 2級 2022年度",
    purchaseDate: "2023/12/10",
    category: "資格試験",
    price: 1800,
    status: "完了",
  },
  {
    id: 7,
    orderId: "ORD-2023-0024",
    title: "司法試験 過去問題集 2022年度",
    purchaseDate: "2023/11/05",
    category: "資格試験",
    price: 4500,
    status: "完了",
  },
  {
    id: 8,
    orderId: "ORD-2023-0023",
    title: "公認会計士試験 短答式 2022年度",
    purchaseDate: "2023/10/22",
    category: "資格試験",
    price: 2800,
    status: "処理中",
  },
]
