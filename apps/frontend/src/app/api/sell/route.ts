import { NextResponse } from 'next/server';

// バックエンドURLを設定（環境変数がない場合はデフォルト値を使用）
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Sending request to backend:', `${BACKEND_URL}/sell`, body);
    
    try {
      // バックエンドAPIの呼び出し
      const response = await fetch(`${BACKEND_URL}/sell`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('Backend response status:', response.status, response.statusText);
      
      // レスポンスをテキストとして読み込む
      const responseText = await response.text();
      console.log('Backend response text:', responseText);
      
      // 空のレスポンスチェック
      if (!responseText) {
        console.error('Empty response from backend');
        return NextResponse.json(
          { error: 'バックエンドからの応答が空です' },
          { status: 500 }
        );
      }
      
      try {
        // テキストをJSONとしてパース
        const responseData = JSON.parse(responseText);
        
        if (!response.ok) {
          console.error('Backend error:', responseData);
          return NextResponse.json(
            { error: 'バックエンドでエラーが発生しました', details: responseData },
            { status: response.status }
          );
        }
        
        return NextResponse.json(responseData);
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response text:', responseText);
        return NextResponse.json(
          { error: 'バックエンドからの応答を解析できませんでした', responseText },
          { status: 500 }
        );
      }
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'バックエンドへの接続に失敗しました', details: String(fetchError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request parsing error:', error);
    return NextResponse.json(
      { error: 'リクエストの解析に失敗しました', details: String(error) },
      { status: 400 }
    );
  }
} 