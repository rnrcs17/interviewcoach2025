import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/query-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const font = Mulish({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interview Coach",
  description: "Interview Coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <link rel="shortcut icon" href="../images/favicon.ico" />
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
