"use client";

import Link from 'next/link';
import { Button } from "@/app/components/ui/button";

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button variant="ghost" size="sm">
        ログイン
      </Button>
    </Link>
  );
} 