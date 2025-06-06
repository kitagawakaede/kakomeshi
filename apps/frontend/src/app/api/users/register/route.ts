import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    
    // 必須フィールドの検証
    if (!userData.email) {
      return NextResponse.json(
        { error: "メールアドレスは必須です" },
        { status: 400 }
      );
    }

    // バックエンドAPIにユーザー情報を送信
    const backendResponse = await axios.post(
      `${process.env.BACKEND_API_URL || 'http://localhost:3001'}/api/users`,
      userData
    );

    return NextResponse.json(backendResponse.data);
  } catch (error) {
    console.error("ユーザー登録エラー:", error);
    return NextResponse.json(
      { error: "ユーザー登録に失敗しました" },
      { status: 500 }
    );
  }
} 