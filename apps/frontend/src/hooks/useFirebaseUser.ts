import { getAuth, onAuthStateChanged, getRedirectResult, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseApp } from "@/lib/firebase";

const auth = getAuth(firebaseApp);

export const useFirebaseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // リダイレクト認証の結果を処理
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("リダイレクト認証成功:", result.user.email);
          // リダイレクト認証成功時の処理（必要に応じて）
        }
      } catch (error) {
        console.error("リダイレクト認証エラー:", error);
      }
    };

    // リダイレクト認証の結果を確認
    handleRedirectResult();

    // 認証状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}; 