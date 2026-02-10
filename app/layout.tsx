import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/commomUi/footer/Footer";
import Hero from "@/components/commomUi/hero/Hero";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Pop Rock | O Melhor Conteúdo de Rock do Mundo",
  description: "O melhor site de Pop Rock. Fique por dentro das ....",
  keywords: ["Pop Rock", "Bandas de Rock", "Agenda de shows", "Ingressos"],
  authors: [{ name: "Equipe PopRock" }],
  openGraph: {
    title: "Pop Rock",
    description: "O melhor site de Pop Rock. Fique por dentro das ....",
    type: "website",
    locale: "pt_BR",
    url: "https://poprock.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >  
      <Hero />      
        {children}
        <Footer />
      </body>
    </html>
  );
}
