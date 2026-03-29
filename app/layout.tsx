import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Second Profits",
  description: "Fintech deep learning trading research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
