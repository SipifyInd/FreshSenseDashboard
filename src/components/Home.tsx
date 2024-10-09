"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// home
const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return null;
};

export default HomePage;
