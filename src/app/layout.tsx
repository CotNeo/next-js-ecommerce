import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { PaymentProvider } from './context/PaymentContext'
import ClientLayout from './ClientLayout'

/**
 * Geist Sans fontunu yapılandırma
 * Latin karakter seti ile birlikte CSS değişkeni olarak tanımlanır
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono fontunu yapılandırma
 * Latin karakter seti ile birlikte CSS değişkeni olarak tanımlanır
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Sayfa meta verileri
 * SEO ve tarayıcı sekmesi başlığı için kullanılır
 */
export const metadata: Metadata = {
  title: "Next.js E-Ticaret",
  description: "Modern ve kullanıcı dostu e-ticaret uygulaması",
};

/**
 * Kök layout bileşeni
 * Tüm sayfaları saran ana layout yapısını oluşturur
 * @param {Object} props - Bileşen props'ları
 * @param {React.ReactNode} props.children - İç içe geçmiş sayfa içeriği
 * @returns {JSX.Element} Layout JSX bileşeni
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      {/* 
        Body etiketi içinde:
        - Geist Sans ve Mono fontları CSS değişkenleri olarak tanımlanır
        - antialiased sınıfı ile font yumuşatma uygulanır
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <AuthProvider>
            <CartProvider>
              <PaymentProvider>
                {children}
              </PaymentProvider>
            </CartProvider>
          </AuthProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
