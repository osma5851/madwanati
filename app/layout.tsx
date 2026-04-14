import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدونتي - أفكار وقصص",
  description: "مدونة عربية حديثة للأفكار والقصص والمعلومات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-arabic antialiased">
        {children}
      </body>
    </html>
  );
}
