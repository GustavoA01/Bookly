"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="rounded-full w-12 h-12"
    >
      <ArrowLeft className="w-auto h-auto" />
    </Button>
  );
};
