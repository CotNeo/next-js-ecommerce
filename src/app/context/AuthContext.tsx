'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Örnek kullanıcılar (gerçek uygulamada veritabanından gelecek)
const MOCK_USERS = [
  {
    id: 1,
    email: 'customer@example.com',
    password: 'customer123',
    name: 'Müşteri Kullanıcı',
    role: 'customer' as UserRole
  },
  {
    id: 2,
    email: 'seller@example.com',
    password: 'seller123',
    name: 'Satıcı Kullanıcı',
    role: 'seller' as UserRole
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // LocalStorage'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    console.log('🔄 Kullanıcı bilgileri yükleniyor...');
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log('👤 Yüklenen kullanıcı:', parsedUser);
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('🔑 Giriş yapılıyor:', { email });
      setIsLoading(true);
      setError(null);

      // Kullanıcıyı bul
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        console.log('✅ Giriş başarılı:', userWithoutPassword);
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      } else {
        console.error('Giriş başarısız: Kullanıcı bulunamadı veya şifre hatalı');
        throw new Error('Geçersiz email veya şifre');
      }
    } catch (err) {
      console.error('❌ Giriş hatası:', err);
      setError('Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      console.log('📝 Kayıt yapılıyor:', { email, name });
      setIsLoading(true);
      setError(null);

      // Email kontrolü
      if (MOCK_USERS.some(u => u.email === email)) {
        console.error('Kayıt başarısız: Bu email zaten kullanımda');
        throw new Error('Bu email adresi zaten kullanımda');
      }

      // Yeni kullanıcı oluştur
      const newUser = {
        id: MOCK_USERS.length + 1,
        email,
        password,
        name,
        role
      };

      // Gerçek uygulamada burada API çağrısı yapılacak
      console.log('✅ Kayıt başarılı:', { ...newUser, password: '***' });
      
      // Otomatik giriş yap
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      console.error('❌ Kayıt hatası:', err);
      setError('Kayıt olurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Çıkış yapılıyor');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 