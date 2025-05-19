"use client"

import { useState, useRef } from "react"
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [hasAnswers, setHasAnswers] = useState(false)
  const [hasCommentary, setHasCommentary] = useState(false)
  const [price, setPrice] = useState<number>(0)
  const [title, setTitle] = useState("")
  const [universityName, setUniversityName] = useState("")
  const [facultyName, setFacultyName] = useState("")
  const [departmentName, setDepartmentName] = useState("")
  const [graduationYear, setGraduationYear] = useState("")
  const [description, setDescription] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const calculateFee = (price: number) => {
    return Math.floor(price * 0.3)
  }

  const calculateEarnings = (price: number) => {
    return price - calculateFee(price)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ja-JP')
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
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

  const handleSubmit = async () => {
    try {
      if (!title || !universityName || !facultyName || !departmentName || !description || !price || uploadedFiles.length === 0) {
        alert("必須項目を入力してください。")
        return
      }

      const formData = new FormData()
      formData.append("title", title)
      formData.append("universityName", universityName)
      formData.append("facultyName", facultyName)
      formData.append("departmentName", departmentName)
      formData.append("graduationYear", graduationYear)
      formData.append("description", description)
      formData.append("price", price.toString())
      formData.append("hasAnswer", hasAnswers.toString())
      formData.append("fileFormat", uploadedFiles[0].type.split('/')[1].toUpperCase())

      // ファイルをアップロード
      for (const file of uploadedFiles) {
        formData.append("files", file)
      }

      const response = await fetch("http://localhost:3001/sale-data", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("出品に失敗しました")
      }

      alert("出品が完了しました")
      window.location.href = "/"
    } catch (error) {
      console.error("出品エラー:", error)
      alert("出品に失敗しました。もう一度お試しください。")
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">具体的なタイトルを入力してください（最大100文字）</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="exam-type">
                          大学名 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="exam-type"
                          placeholder="例：東京大学"
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={universityName}
                          onChange={(e) => setUniversityName(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="subject">
                          学部 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="subject"
                          placeholder="例：工学部"
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={facultyName}
                          onChange={(e) => setFacultyName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="year">
                          学科 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="year"
                          placeholder="例：情報工学科"
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={departmentName}
                          onChange={(e) => setDepartmentName(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="difficulty">受講年度</Label>
                        <Input
                          id="difficulty"
                          placeholder="例：2024年"
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                        />
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        購入者が内容を理解できるよう、詳細な説明を入力してください（最大1000文字）
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                <Button asChild variant="outline" className="border-blue-200 hover:bg-blue-50">
                    <Link href="/">ホームに戻る</Link>
                </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => goToNextTab("basic")}>
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
                    <div 
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-blue-200 bg-blue-50/50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-10 h-10 text-blue-500" />
                        <h3 className="font-semibold text-lg">ファイルをドラッグ＆ドロップ</h3>
                        <p className="text-sm text-muted-foreground mb-4">または</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                        />
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={handleUploadClick}
                        >
                          ファイルを選択
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                          PDF, DOC, DOCX, JPG, PNG形式（最大50MB）
                        </p>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">アップロード済みファイル</h3>
                        {uploadedFiles.map((file, index) => (
                          <div 
                            key={index}
                            className="border rounded-lg p-4 flex items-center justify-between bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-8 h-8 text-blue-500" />
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / (1024 * 1024)).toFixed(1)} MB • {file.type.split('/')[1].toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveFile(index)}
                            >
                              削除
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Separator />
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
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => goToNextTab("content")}>
                    次へ：価格
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="price" className="mt-6 space-y-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>価格</CardTitle>
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
                          value={price || ''}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          className="pl-8 border-blue-200 focus-visible:ring-blue-300"
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg mt-2">
                        <div className="flex justify-between text-sm mb-2">
                          <span>販売価格</span>
                          <span>¥{formatPrice(price)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>プラットフォーム手数料（30%）</span>
                          <span className="text-red-500">- ¥{formatPrice(calculateFee(price))}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>あなたの収益</span>
                          <span className="text-green-600">¥{formatPrice(calculateEarnings(price))}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        推奨価格帯：¥500〜¥3,000（内容や質によって適切な価格を設定してください）
                      </p>
                    </div>

                    <Separator />

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
                                  {facultyName && <Badge variant="outline">{facultyName}</Badge>}
                                  {uploadedFiles.length > 0 && <Badge variant="success">新着</Badge>}
                                </div>
                                <h3 className="text-lg font-semibold">{title || "タイトルを入力してください"}</h3>
                                <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                  {description || "説明を入力してください"}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {universityName && <Badge variant="outline">{universityName}</Badge>}
                                  {departmentName && <Badge variant="outline">{departmentName}</Badge>}
                                  {graduationYear && <Badge variant="outline">{graduationYear}</Badge>}
                                </div>
                              </div>
                              <div className="text-lg font-bold">¥{formatPrice(price)}</div>
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
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit}>
                    出品する
                  </Button>
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
