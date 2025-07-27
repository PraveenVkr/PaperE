import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Papers Explorer",
  description: "Explore academic papers by semester and subject",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
