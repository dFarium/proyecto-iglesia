"use client";

import HomePage from "@/components/home/homePage";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomePage>{children}</HomePage>;
}
