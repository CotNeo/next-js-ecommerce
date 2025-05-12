'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { createPerformanceMetrics } from "../utils/performance";

/**
 * Footer bileşeni
 * Sayfanın alt kısmını oluşturur ve şirket bilgilerini gösterir
 * @returns {JSX.Element} Footer JSX bileşeni
 */
export default function Footer() {
  useEffect(() => {
    // Performans ölçümü başlat
    const startTime = performance.now();
    
    // Performans ölçümü bitir
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    // Performans metriklerini logla
    console.log('Footer Performans Metrikleri:', 
      createPerformanceMetrics('Footer', loadTime)
    );
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Şirket Bilgileri */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Next.js Commerce
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Modern ve hızlı e-ticaret deneyimi için Next.js ile geliştirilmiş platform.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Hızlı Linkler
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              İletişim
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Email: info@nextjs-commerce.com</li>
              <li>Telefon: +90 (555) 123 45 67</li>
              <li>Adres: İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} Next.js Commerce. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 