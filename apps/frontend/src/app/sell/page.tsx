"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { useToast } from "@/app/components/ui/use-toast"

export default function SellPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    universityName: "",
    facultyName: "",
    departmentName: "",
    yearValue: "",
    explanation: "",
    features1: "",
    features2: "",
    features3: "",
    hasAnswers: false,
    hasCommentary: false,
    price: 1000,
    isPublic: true,
    fileUploaded: false,
    fileName: "",
    filePath: "",
    fileSize: 0,
    fileType: ""
  })
  const [dragging, setDragging] = useState(false);

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

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      
      // 必須項目の検証
      if (!formData.title || !formData.universityName || !formData.facultyName || !formData.departmentName || !formData.explanation || !formData.price) {
        toast({
          title: "入力エラー",
          description: "必須項目をすべて入力してください",
          variant: "destructive"
        })
        setIsSubmitting(false)
        return
      }

      if (!formData.fileUploaded) {
        toast({
          title: "ファイルエラー",
          description: "過去問ファイルをアップロードしてください",
          variant: "destructive"
        })
        setIsSubmitting(false)
        return
      }

      // APIリクエストの作成
      const requestData = {
        userId: "user123",
        price: formData.price,
        universityName: formData.universityName,
        facultyName: formData.facultyName,
        departmentName: formData.departmentName,
        className: formData.title,
        explanation: formData.explanation,
        Features1: formData.features1 || "詳細情報なし",
        Features2: formData.features2 || "詳細情報なし",
        Features3: formData.features3 || "詳細情報なし",
        someday: formData.yearValue || "不明",
        filePath: formData.filePath
      }

      // デバッグ用ログ
      console.log('出品データを送信します:', requestData);

      try {
        // APIエンドポイントに送信
        const response = await fetch('/api/sell', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        let responseText = await response.text();
        console.log('API response text:', responseText);

        if (!response.ok) {
          let errorData;
          try {
            errorData = JSON.parse(responseText);
          } catch (e) {
            errorData = { error: responseText || '不明なエラー' };
          }
          throw new Error(errorData.error || '出品に失敗しました');
        }

        // 成功処理
        toast({
          title: "出品が完了しました",
          description: "審査後に公開されます",
        });

        // ホームページにリダイレクト
        router.push('/');
      } catch (fetchError) {
        console.error('API通信エラー:', fetchError);
        toast({
          title: "API通信エラー",
          description: fetchError instanceof Error ? fetchError.message : "サーバーとの通信に失敗しました",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('出品処理エラー:', error);
      toast({
        title: "エラーが発生しました",
        description: "入力内容を確認してもう一度お試しください",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await uploadFile(file);
    }
  };
  
  // 共通のファイルアップロード処理
  const uploadFile = async (file: File) => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    
    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      
      if (!response.ok) {
        throw new Error('ファイルのアップロードに失敗しました');
      }
      
      const result = await response.json();
      
      setFormData(prev => ({
        ...prev,
        fileUploaded: true,
        fileName: file.name,
        filePath: result.filename,
        fileSize: file.size,
        fileType: file.type
      }));
      
      toast({
        title: "ファイルがアップロードされました",
      });
    } catch (error) {
      console.error('ファイルアップロードエラー:', error);
      toast({
        title: "エラー",
        description: "ファイルのアップロードに失敗しました",
        variant: "destructive"
      });
    }
  };
  
  // 実際のファイルアップロード処理
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    await uploadFile(file);
  };

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
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">具体的なタイトルを入力してください（最大100文字）</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="university">
                          大学 <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="university" 
                          placeholder="例：東京大学" 
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={formData.universityName}
                          onChange={(e) => handleInputChange('universityName', e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="faculty">
                          学部 <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="faculty" 
                          placeholder="例：理学部" 
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={formData.facultyName}
                          onChange={(e) => handleInputChange('facultyName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="department">
                          学科 <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="department" 
                          placeholder="例：物理学科" 
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={formData.departmentName}
                          onChange={(e) => handleInputChange('departmentName', e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="year">年度</Label>
                        <Select onValueChange={(value: string) => handleInputChange('yearValue', value)}>
                          <SelectTrigger id="year" className="border-blue-200 focus-visible:ring-blue-300 bg-white">
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="2024">2024年</SelectItem>
                            <SelectItem value="2023">2023年</SelectItem>
                            <SelectItem value="2022">2022年</SelectItem>
                            <SelectItem value="2021">2021年</SelectItem>
                            <SelectItem value="2020">2020年</SelectItem>
                            <SelectItem value="older">2019年以前</SelectItem>
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
                        value={formData.explanation}
                        onChange={(e) => handleInputChange('explanation', e.target.value)}
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
                    <div 
                      className={`border-2 border-dashed ${dragging ? 'border-blue-400 bg-blue-50' : 'border-blue-200 bg-blue-50/50'} rounded-lg p-8 text-center transition-colors`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className={`w-10 h-10 ${dragging ? 'text-blue-600' : 'text-blue-500'} transition-colors`} />
                        <h3 className="font-semibold text-lg">ファイルをドラッグ＆ドロップ</h3>
                        <p className="text-sm text-muted-foreground mb-4">または</p>
                        <label htmlFor="fileUpload" className="cursor-pointer">
                          <input
                            id="fileUpload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                          />
                          <Button className="bg-blue-600 hover:bg-blue-700" type="button" onClick={() => document.getElementById('fileUpload')?.click()}>
                            ファイルを選択
                          </Button>
                        </label>
                        <p className="text-xs text-muted-foreground mt-4">PDF, DOC, DOCX, JPG, PNG形式（最大50MB）</p>
                      </div>
                    </div>

                    {formData.fileUploaded && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">アップロード済みファイル</h3>
                        <div className="border rounded-lg p-4 flex items-center bg-white">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-blue-500" />
                            <div>
                              <p className="font-medium">{formData.fileName}</p>
                              <p className="text-xs text-muted-foreground">{Math.round(formData.fileSize / 1024)} KB • {formData.fileType.split('/')[1]?.toUpperCase()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">詳細情報</h3>
                      <div className="grid gap-2">
                        <Label htmlFor="features1">詳細情報1</Label>
                        <Input 
                          id="features1" 
                          placeholder="例：解答の正確さ、難易度など" 
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={formData.features1}
                          onChange={(e) => handleInputChange('features1', e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          解答・解説が含まれている場合は「解答あり」と入力してください。
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="features2">詳細情報2</Label>
                        <Input 
                          id="features2" 
                          placeholder="例：詳細な解説の内容、ポイントなど" 
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={formData.features2}
                          onChange={(e) => handleInputChange('features2', e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          詳細な解説（解法のステップや考え方の説明など）が含まれている場合は「詳細解説あり」と入力してください。
                        </p>
                      </div>
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
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg mt-2">
                        <div className="flex justify-between text-sm mb-2">
                          <span>販売価格</span>
                          <span>¥{formData.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>プラットフォーム手数料（30%）</span>
                          <span className="text-red-500">- ¥{Math.round(formData.price * 0.3).toLocaleString()}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>あなたの収益</span>
                          <span className="text-green-600">¥{Math.round(formData.price * 0.7).toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        推奨価格帯：¥500〜¥3,000（内容や質によって適切な価格を設定してください）
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">公開設定</h3>
                      <div className="grid gap-2">
                        <Label htmlFor="features3">詳細情報3</Label>
                        <Input 
                          id="features3" 
                          placeholder="例：その他の特徴、注意事項など" 
                          className="border-blue-200 focus-visible:ring-blue-300"
                          value={formData.features3}
                          onChange={(e) => handleInputChange('features3', e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">公開/非公開に関する情報を入力してください。</p>
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
                                  <Badge variant="university">{formData.universityName || "大学入試"}</Badge>
                                  <Badge variant="outline">{formData.facultyName || "学部"}</Badge>
                                  <Badge variant="success">新着</Badge>
                                </div>
                                <h3 className="text-lg font-semibold">{formData.title || "タイトル未設定"}</h3>
                                <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                  {formData.explanation || "説明文がありません"}
                                </div>
                              </div>
                              <div className="text-lg font-bold">¥{formData.price.toLocaleString()}</div>
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
                  <Button 
                    className="bg-green-600 hover:bg-green-700" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "処理中..." : "出品する"}
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
