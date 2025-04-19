"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Separator } from "@/app/components/ui/separator"
import { Switch } from "@/app/components/ui/switch"
import { Badge } from "@/app/components/ui/badge"
import { Label } from "@/app/components/ui/label"
import { GraduationCap, Upload, FileText, HelpCircle, ShoppingCart, BookOpen, AlertCircle, Info } from "lucide-react"

export default function SellPage() {
  const [activeTab, setActiveTab] = useState("basic")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const goToNextTab = (current: string) => {
    if (current === "basic") {
      setActiveTab("content")
    } else if (current === "content") {
      setActiveTab("price")
    }
  }

  const goToPreviousTab = (current: string) => {
    if (current === "content") {
      setActiveTab("basic")
    } else if (current === "price") {
      setActiveTab("content")
    }
  }

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
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">過去問を出品する</h1>
            <p className="text-muted-foreground">
              あなたの持っている過去問を出品して、他のユーザーに販売することができます。
            </p>
          </div>

          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-blue-700">出品の注意事項</CardTitle>
              </div>
              <CardDescription>出品前に以下の点をご確認ください：</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                  <span>
                    著作権を侵害するコンテンツは出品できません。出品者は著作権の所有または適切な許可を得ていることを確認する責任があります。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                  <span>出品された過去問は審査を経て掲載されます。不適切なコンテンツは削除される場合があります。</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                  <span>販売価格の30%が手数料として差し引かれます。残りの70%が出品者への支払いとなります。</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-white/70 p-1 w-full grid grid-cols-3">
              <TabsTrigger value="basic" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                基本情報
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                コンテンツ
              </TabsTrigger>
              <TabsTrigger value="price" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                価格・公開設定
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6 space-y-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>基本情報</CardTitle>
                  <CardDescription>過去問の基本情報を入力してください。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">
                        タイトル <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="例：東京大学 2023年度 前期試験 数学"
                        className="border-blue-200 focus-visible:ring-blue-300"
                      />
                      <p className="text-xs text-muted-foreground">具体的なタイトルを入力してください（最大100文字）</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="exam-type">
                          試験タイプ <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger id="exam-type" className="border-blue-200 focus-visible:ring-blue-300">
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="university">大学入試</SelectItem>
                            <SelectItem value="highschool">高校入試</SelectItem>
                            <SelectItem value="certification">資格試験</SelectItem>
                            <SelectItem value="language">語学試験</SelectItem>
                            <SelectItem value="other">その他</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="subject">
                          科目 <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger id="subject" className="border-blue-200 focus-visible:ring-blue-300">
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math">数学</SelectItem>
                            <SelectItem value="japanese">国語</SelectItem>
                            <SelectItem value="english">英語</SelectItem>
                            <SelectItem value="science">理科</SelectItem>
                            <SelectItem value="social">社会</SelectItem>
                            <SelectItem value="it">IT</SelectItem>
                            <SelectItem value="law">法律</SelectItem>
                            <SelectItem value="other">その他</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="year">
                          年度 <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger id="year" className="border-blue-200 focus-visible:ring-blue-300">
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024年</SelectItem>
                            <SelectItem value="2023">2023年</SelectItem>
                            <SelectItem value="2022">2022年</SelectItem>
                            <SelectItem value="2021">2021年</SelectItem>
                            <SelectItem value="2020">2020年</SelectItem>
                            <SelectItem value="older">2019年以前</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="difficulty">難易度</Label>
                        <Select>
                          <SelectTrigger id="difficulty" className="border-blue-200 focus-visible:ring-blue-300">
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">初級</SelectItem>
                            <SelectItem value="intermediate">中級</SelectItem>
                            <SelectItem value="advanced">上級</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">
                        説明 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="過去問の内容、特徴、解説の有無などを詳しく記入してください。"
                        className="min-h-32 border-blue-200 focus-visible:ring-blue-300"
                      />
                      <p className="text-xs text-muted-foreground">
                        購入者が内容を理解できるよう、詳細な説明を入力してください（最大1000文字）
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="tags">タグ（カンマ区切りで入力）</Label>
                      <Input
                        id="tags"
                        placeholder="例：センター試験, 理系, 難問"
                        className="border-blue-200 focus-visible:ring-blue-300"
                      />
                      <p className="text-xs text-muted-foreground">
                        検索で見つけやすくするためのタグを入力してください（最大10個）
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                <Button asChild variant="outline" className="border-blue-200 hover:bg-blue-50">
                    <Link href="/">ホームに戻る</Link>
                </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => goToNextTab("basic")}>
                    次へ：コンテンツ
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="mt-6 space-y-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>コンテンツのアップロード</CardTitle>
                  <CardDescription>過去問のファイルをアップロードしてください。PDF形式を推奨します。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center bg-blue-50/50">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-10 h-10 text-blue-500" />
                        <h3 className="font-semibold text-lg">ファイルをドラッグ＆ドロップ</h3>
                        <p className="text-sm text-muted-foreground mb-4">または</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">ファイルを選択</Button>
                        <p className="text-xs text-muted-foreground mt-4">PDF, DOC, DOCX, JPG, PNG形式（最大50MB）</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">アップロード済みファイル</h3>
                      <div className="border rounded-lg p-4 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-500" />
                          <div>
                            <p className="font-medium">東大数学2023.pdf</p>
                            <p className="text-xs text-muted-foreground">2.4 MB • PDF</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          削除
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="has-answers">解答・解説の有無</Label>
                          <HelpCircle className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Switch id="has-answers" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        解答・解説が含まれている場合はオンにしてください。含まれている場合は価格を高く設定できます。
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="has-commentary">詳細な解説の有無</Label>
                          <HelpCircle className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Switch id="has-commentary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        詳細な解説（解法のステップや考え方の説明など）が含まれている場合はオンにしてください。
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-blue-200 hover:bg-blue-50"
                    onClick={() => goToPreviousTab("content")}
                  >
                    戻る：基本情報
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => goToNextTab("content")}>
                    次へ：価格・公開設定
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="price" className="mt-6 space-y-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>価格・公開設定</CardTitle>
                  <CardDescription>販売価格と公開設定を行ってください。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="price">
                        販売価格（税込） <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-muted-foreground">¥</span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="1000"
                          className="pl-8 border-blue-200 focus-visible:ring-blue-300"
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg mt-2">
                        <div className="flex justify-between text-sm mb-2">
                          <span>販売価格</span>
                          <span>¥1,000</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>プラットフォーム手数料（30%）</span>
                          <span className="text-red-500">- ¥300</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>あなたの収益</span>
                          <span className="text-green-600">¥700</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        推奨価格帯：¥500〜¥3,000（内容や質によって適切な価格を設定してください）
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">公開設定</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="is-public">公開状態</Label>
                          <p className="text-sm text-muted-foreground">オンにすると審査後に公開されます</p>
                        </div>
                        <Switch id="is-public" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">プレビュー</h3>
                      <Card className="overflow-hidden border-blue-100 shadow-sm">
                        <div className="sm:flex">
                          <div className="w-full sm:w-48 h-32 sm:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0">
                            <BookOpen className="h-12 w-12 text-blue-500" />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="university">大学入試</Badge>
                                  <Badge variant="outline">数学</Badge>
                                  <Badge variant="success">新着</Badge>
                                </div>
                                <h3 className="text-lg font-semibold">東京大学 2023年度 前期試験 数学</h3>
                                <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                  東京大学の2023年度前期試験の数学問題と詳細な解説が含まれています。解法のステップや考え方の説明も記載されています。
                                </div>
                              </div>
                              <div className="text-lg font-bold">¥1,000</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-blue-200 hover:bg-blue-50"
                    onClick={() => goToPreviousTab("price")}
                  >
                    戻る：コンテンツ
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">出品する</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
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
