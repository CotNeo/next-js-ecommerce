import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              NetKadraj
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Fotoğraf makineleri ve aksesuarları için en iyi alışveriş deneyimi.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Kategoriler
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=dslr" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  DSLR Kameralar
                </Link>
              </li>
              <li>
                <Link href="/products?category=mirrorless" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Aynasız Kameralar
                </Link>
              </li>
              <li>
                <Link href="/products?category=lens" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Lensler
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Hızlı Linkler
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  SSS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              İletişim
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Email: info@netkadraj.com</li>
              <li>Tel: +90 (212) 123 45 67</li>
              <li>Adres: İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} NetKadraj. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
} 