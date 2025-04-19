import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ShoppingCart, GraduationCap, FileText, CheckCircle, BookOpen } from "lucide-react"

export default function ExamDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the exam data based on the ID
  const examId = Number.parseInt(params.id)
  const exam = examData.find((e) => e.id === examId) || examData[0]

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
                <h1 className="mt-2 text-3xl font-bold">{exam.title}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{exam.category}</Badge>
                  <Badge variant="outline">{exam.subject}</Badge>
                  <Badge variant="outline">{exam.year}年</Badge>
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
                    <p>
                      {exam.title}
                      の過去問題集です。本試験と同じ形式の問題を解くことで、実際の試験に備えることができます。
                    </p>
                    <p>
                      この問題集には、詳細な解説と解答が含まれており、自己学習に最適です。また、出題傾向の分析や、よく出る問題のポイント解説も収録されています。
                    </p>
                    <h3 className="text-lg font-semibold">特徴</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>本試験と同じ形式・難易度の問題</li>
                      <li>詳細な解説と解答</li>
                      <li>出題傾向の分析</li>
                      <li>よく出る問題のポイント解説</li>
                      <li>PDF形式でダウンロード可能</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="contents" className="p-4 border rounded-lg mt-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">目次</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                        <span>第1章: 問題（本試験と同形式）</span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                        <span>第2章: 解答と詳細な解説</span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                        <span>第3章: 出題傾向の分析</span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                        <span>第4章: よく出る問題のポイント解説</span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                        <span>第5章: 参考資料</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="p-4 border rounded-lg mt-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">レビュー</h3>
                      <Badge variant="outline">平均評価: 4.5/5</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">山田太郎</div>
                          <div className="text-sm text-muted-foreground">2023年10月15日</div>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i} className="text-yellow-500">
                                  ★
                                </span>
                              ))}
                          </div>
                        </div>
                        <p className="mt-2">解説がとても詳しく、理解しやすかったです。おかげで試験に合格できました！</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">佐藤花子</div>
                          <div className="text-sm text-muted-foreground">2023年9月22日</div>
                          <div className="flex">
                            {Array(4)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i} className="text-yellow-500">
                                  ★
                                </span>
                              ))}
                          </div>
                        </div>
                        <p className="mt-2">出題傾向の分析が役立ちました。もう少し問題数が多いとさらに良かったです。</p>
                      </div>
                    </div>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>印刷可能</span>
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
  {
    id: 5,
    title: "基本情報技術者試験 2022年度 春期",
    category: "資格試験",
    subject: "IT",
    year: 2022,
    price: 1500,
    isNew: false,
  },
  {
    id: 6,
    title: "日本史検定 2級 2022年度",
    category: "資格試験",
    subject: "社会",
    year: 2022,
    price: 1800,
    isNew: false,
  },
]
