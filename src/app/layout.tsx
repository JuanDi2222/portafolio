import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Diego's Portfolio",
  description: "Portafolio de proyectos de Juan Diego",
  icons: [{ rel: "icon", url: "/juan.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Fixed background overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(0px) brightness(0.95)", // adjust as needed
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className=" relative w-1/2 pt-40">
        <div className=" absolute left-1/2 top-20 transform -translate-x-1/2 z-5">
          <div className=" w-48 h-48 rounded-full overflow-hidden border-4 border-white/60 shadow-lg bg-white/30 backdrop-blur-md">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={1228}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        <Card className="pt-20  shadow-xl border-none w-full ">
          <CardContent>
             <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex gap-4 flex-1 justify-end">
              <Button
                asChild
                variant="outline"
                className="h-15 w-32 text-lg font-semibold px-5"
              >
                <Link href="/">About Me</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-15 w-32 text-lg font-semibold px-5"
              >
                <Link href="/projects">Projects</Link>
              </Button>
            </div>
            <div className=" w-64 "></div>

            <div className="flex gap-4 flex-1 justify-start">
              <Button
                asChild
                variant="outline"
                className="h-15 w-32 text-lg font-semibold px-5"
              >
                <Link href="/hobbies">Hobbies</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-15 w-32 text-lg font-semibold px-5"
              >
                <Link href="/contact">Contact</Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
            {children }
          </CardContent>
        </Card>
      </div>
          </div>
        </ThemeProvider>
         <Toaster />
      </body>
    </html>
  );
}
