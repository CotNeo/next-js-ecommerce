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
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { UserRole } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

/**
 * Header bileşeni
 * Sayfanın üst kısmını oluşturur ve tema değiştirme özelliğini içerir
 * @returns {JSX.Element} Header JSX bileşeni
 */
export default function Header() {
  console.log('Header component rendered')
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { totalItems, items, removeItem, updateQuantity, totalPrice } = useCart();
  const { user, logout, login, register } = useAuth();
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    errors: {} as Record<string, string>
  });

  // Register form state
  interface RegisterFormState {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    role: UserRole;
    errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      name?: string;
      role?: string;
    };
  }

  const [registerForm, setRegisterForm] = useState<RegisterFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: UserRole.CUSTOMER,
    errors: {}
  });

  useEffect(() => {
    console.log('Current pathname:', pathname)
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      console.log('Scroll position:', scrollPosition)
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  useEffect(() => {
    // Performans ölçümü başlat
    const startTime = performance.now();
    
    // Performans ölçümü bitir
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    // Performans metriklerini logla
    console.log('Header Performans Metrikleri:', 
      createPerformanceMetrics('Header', loadTime, theme === 'dark' ? 'Koyu' : 'Açık')
    );
  }, [theme]);

  const toggleTheme = () => {
    console.log('Theme toggled from', theme, 'to', theme === 'dark' ? 'light' : 'dark')
    setTheme(theme === 'dark' ? 'light' : 'dark')
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
    } catch (error) {
      setLoginForm(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          email: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.'
        }
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
        confirmPassword: '',
        name: '',
        role: UserRole.CUSTOMER,
        errors: {}
      });
    } catch (error) {
      setRegisterForm(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          email: 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.'
        }
      }));
    }
  };

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path)
    setIsUserMenuOpen(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            NetKadraj Ecommerce
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
                      {user.role === UserRole.SELLER ? 'Satıcı Paneli' : 'Müşteri Paneli'}
                    </div>
                    <Link
                      href={user.role === UserRole.SELLER ? '/seller/dashboard' : '/customer/dashboard'}
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
              {theme === 'dark' ? (
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
                  <span className="font-medium text-white">Toplam Ürün:</span>
                  <span className="font-semibold text-white">{totalItems} adet</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-white">Toplam Tutar:</span>
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
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Giriş Yap</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              {loginForm.errors.email && (
                <p className="text-red-500 text-sm mt-1">{loginForm.errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Kayıt Modalı */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kayıt Ol</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              {registerForm.errors.name && (
                <p className="text-red-500 text-sm mt-1">{registerForm.errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              {registerForm.errors.email && (
                <p className="text-red-500 text-sm mt-1">{registerForm.errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              {registerForm.errors.password && (
                <p className="text-red-500 text-sm mt-1">{registerForm.errors.password}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
              {registerForm.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{registerForm.errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <Label htmlFor="role">Hesap Türü</Label>
              <Select
                value={registerForm.role}
                onValueChange={(value: string) => setRegisterForm(prev => ({ ...prev, role: value as UserRole }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Hesap türü seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.CUSTOMER}>Müşteri</SelectItem>
                  <SelectItem value={UserRole.SELLER}>Satıcı</SelectItem>
                </SelectContent>
              </Select>
              {registerForm.errors.role && (
                <p className="text-red-500 text-sm mt-1">{registerForm.errors.role}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Kayıt Ol
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
} 