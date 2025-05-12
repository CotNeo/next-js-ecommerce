'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createPerformanceMetrics, getMemoryUsage } from "../utils/performance";
import { 
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import Image from "next/image";

/**
 * Header bileşeni
 * Sayfanın üst kısmını oluşturur ve tema değiştirme özelliğini içerir
 * @returns {JSX.Element} Header JSX bileşeni
 */
export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { totalItems, items, removeItem, updateQuantity, totalPrice } = useCart();
  const { user, logout, login, register } = useAuth();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    errors: {} as Record<string, string>
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    name: '',
    role: 'customer' as 'customer' | 'seller',
    errors: {} as Record<string, string>
  });

  useEffect(() => {
    // Performans ölçümü başlat
    const startTime = performance.now();
    
    // Performans ölçümü bitir
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    // Performans metriklerini logla
    console.log('Header Performans Metrikleri:', 
      createPerformanceMetrics('Header', loadTime, darkMode ? 'Koyu' : 'Açık')
    );
  }, [darkMode]);

  const toggleTheme = () => {
    const startTime = performance.now();
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle('dark');
    
    const endTime = performance.now();
    const toggleTime = endTime - startTime;

    console.log('Tema Değişimi Performans Metrikleri:', {
      bileşen: 'Header',
      işlem: 'Tema Değişimi',
      süre: `${toggleTime.toFixed(2)}ms`,
      yeniTema: newTheme ? 'Koyu' : 'Açık',
      bellekKullanımı: getMemoryUsage(),
      zaman: new Date().toLocaleTimeString()
    });
  };

  const handleLogout = () => {
    console.log('🚪 Çıkış yapılıyor');
    logout();
    setIsUserMenuOpen(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      setIsLoginModalOpen(false);
      setLoginForm({ email: '', password: '', errors: {} });
    } catch {
      setLoginForm(prev => ({
        ...prev,
        errors: { general: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.' }
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerForm.email, registerForm.password, registerForm.name, registerForm.role);
      setIsRegisterModalOpen(false);
      setRegisterForm({
        email: '',
        password: '',
        name: '',
        role: 'customer',
        errors: {}
      });
    } catch {
      setRegisterForm(prev => ({
        ...prev,
        errors: { general: 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.' }
      }));
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Next.js Commerce
          </Link>

          {/* Navigasyon */}
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Ana Sayfa
            </Link>
            <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Ürünler
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Hakkımızda
            </Link>

            {/* Sepet */}
            <button 
              onClick={() => setIsCartModalOpen(true)}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Sepeti görüntüle"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge
                  variant="error"
                  size="sm"
                  className="absolute -top-2 -right-2"
                >
                  {totalItems}
                </Badge>
              )}
            </button>

            {/* Kullanıcı Menüsü */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<UserIcon className="w-5 h-5" />}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  {user.name}
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      {user.role === 'seller' ? 'Satıcı Paneli' : 'Müşteri Paneli'}
                    </div>
                    <Link
                      href={user.role === 'seller' ? '/seller/dashboard' : '/customer/dashboard'}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Panel
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<UserIcon className="w-5 h-5" />}
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Giriş Yap
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<UserPlusIcon className="w-5 h-5" />}
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Kayıt Ol
                </Button>
              </div>
            )}

            {/* Tema değiştirme butonu */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Tema değiştir"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Sepet Modalı */}
      <Modal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        title="Sepetim"
        size="lg"
      >
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
              Sepetiniz boş
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium text-neutral-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">
                        {item.price.toLocaleString('tr-TR')} ₺
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
                          aria-label="Ürün adetini azalt"
                          title="Ürün adetini azalt"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-neutral-900 dark:text-white bg-transparent py-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
                          aria-label="Ürün adetini artır"
                          title="Ürün adetini artır"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                      aria-label="Ürünü sepetten kaldır"
                      title="Ürünü sepetten kaldır"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Toplam Ürün:</span>
                  <span className="font-semibold">{totalItems} adet</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium">Toplam Tutar:</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {totalPrice.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setIsCartModalOpen(false);
                    window.location.href = '/checkout';
                  }}
                >
                  Ödemeye Geç
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Giriş Modalı */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Giriş Yap"
      >
        <form onSubmit={handleLogin} className="space-y-4">
          {loginForm.errors.general && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {loginForm.errors.general}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
            fullWidth
            required
          />
          <Input
            label="Şifre"
            type="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Giriş Yap
          </Button>
        </form>
      </Modal>

      {/* Kayıt Modalı */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Kayıt Ol"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          {registerForm.errors.general && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {registerForm.errors.general}
            </div>
          )}
          <Input
            label="Ad Soyad"
            type="text"
            value={registerForm.name}
            onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
            fullWidth
            required
          />
          <Input
            label="Email"
            type="email"
            value={registerForm.email}
            onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
            fullWidth
            required
          />
          <Input
            label="Şifre"
            type="password"
            value={registerForm.password}
            onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
            fullWidth
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="customer"
              name="role"
              value="customer"
              checked={registerForm.role === 'customer'}
              onChange={() => setRegisterForm(prev => ({ ...prev, role: 'customer' }))}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="customer" className="text-gray-700 dark:text-gray-300">Müşteri</label>
            <input
              type="radio"
              id="seller"
              name="role"
              value="seller"
              checked={registerForm.role === 'seller'}
              onChange={() => setRegisterForm(prev => ({ ...prev, role: 'seller' }))}
              className="h-4 w-4 text-blue-600 ml-4"
            />
            <label htmlFor="seller" className="text-gray-700 dark:text-gray-300">Satıcı</label>
          </div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Kayıt Ol
          </Button>
        </form>
      </Modal>
    </header>
  );
} 