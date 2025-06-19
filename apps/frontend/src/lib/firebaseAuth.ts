import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, User } from "firebase/auth";
import { firebaseApp } from "./firebase";

// ポップアップによるGoogle認証
export const signInWithGoogle = async () => {
  try {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    
    // ポップアップでの認証を試みる
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // デバッグ用：FirebaseのUIDを出力
      console.log('Firebase UID:', user.uid);
      console.log('Firebase Email:', user.email);
      
      // ユーザー情報をバックエンドに送信して保存（エラーでも続行）
      if (user) {
        try {
          await registerUserInDatabase(user);
        } catch (registrationError) {
          console.error("ユーザー登録エラー（認証は成功）:", registrationError);
          // 認証自体は成功しているため、ユーザー登録エラーでも処理を続行
        }
      }
      
      return user;
    } catch (popupError) {
      // ポップアップがブロックされた場合などのエラー
      console.warn("ポップアップ認証エラー、リダイレクト認証に切り替えます:", popupError);
      
      // リダイレクト認証を代替手段として使用
      await signInWithRedirect(auth, provider);
      
      // リダイレクト認証の場合は、この後の処理はリダイレクト先のページで行われる
      // そのため、ここではユーザー情報を返さない
      return null;
    }
  } catch (error) {
    console.error("Googleログインエラー:", error);
    throw error;
  }
};

// ログアウト処理
export const signOut = async () => {
  try {
    const auth = getAuth(firebaseApp);
    await auth.signOut();
    console.log("ログアウト成功");
  } catch (error) {
    console.error("ログアウトエラー:", error);
    throw error;
  }
};

// ユーザー情報をバックエンドのデータベースに登録
const registerUserInDatabase = async (user: User) => {
  try {
    // ユーザーデータの準備
    const userData = {
      id: user.uid, // FirebaseのUIDを使用
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    };
    
    // バックエンドAPIにユーザー情報を送信
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`ユーザー登録に失敗しました: ${response.status} ${errorData.error || ''}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("ユーザー登録処理エラー:", error);
    throw error;
  }
};

// 現在のユーザーを取得
export const getCurrentUser = () => {
  const auth = getAuth(firebaseApp);
  return auth.currentUser;
}; 