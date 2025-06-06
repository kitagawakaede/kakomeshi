import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google認証のプロフィール画像
      'avatars.githubusercontent.com', // GitHubアバター（将来的に必要な場合）
    ],
  },
};

export default nextConfig;
