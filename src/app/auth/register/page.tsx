'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../types/index';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Form doğrulama için yardımcı fonksiyonlar
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

const validateName = (name: string): boolean => {
  return name.length >= 3;
};

// Form durumu için interface
interface RegisterFormState {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: 'CUSTOMER' | 'SELLER';
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    role?: string;
    general?: string;
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: UserRole.CUSTOMER,
    errors: {}
  });

  // Form doğrulama
  const validateForm = (): boolean => {
    const errors: RegisterFormState['errors'] = {};
    let isValid = true;

    if (!formData.name) {
      errors.name = 'Ad Soyad gereklidir';
      isValid = false;
    } else if (!validateName(formData.name)) {
      errors.name = 'Ad Soyad en az 3 karakter olmalıdır';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email adresi gereklidir';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Geçerli bir email adresi giriniz';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Şifre gereklidir';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Şifre en az 6 karakter olmalıdır';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Şifre tekrarı gereklidir';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
      isValid = false;
    }

    if (!formData.role) {
      errors.role = 'Hesap türü seçilmelidir';
      isValid = false;
    }

    setFormData(prev => ({ ...prev, errors }));
    return isValid;
  };

  // Form gönderme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form gönderiliyor...');

    if (!validateForm()) {
      console.log('Form doğrulama hatası:', formData.errors);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Kayıt işlemi başlatılıyor...');
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.role as UserRole
      );
      console.log('Kayıt başarılı, yönlendiriliyor...');
      router.push('/');
    } catch (error) {
      console.error('Kayıt hatası:', error);
      setFormData(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          general: 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.'
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Input değişikliklerini izle
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Input değişikliği: ${name} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: undefined,
        general: undefined
      }
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Kayıt Ol
            </h1>

            {formData.errors.general && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                {formData.errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Ad Soyad"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={formData.errors.name}
                fullWidth
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={formData.errors.email}
                fullWidth
                required
              />

              <Input
                label="Şifre"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formData.errors.password}
                fullWidth
                required
              />

              <Input
                label="Şifre Tekrarı"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formData.errors.confirmPassword}
                fullWidth
                required
              />

              <Select
                label="Hesap Türü"
                name="role"
                value="CUSTOMER"
                onChange={handleChange}
                error={formData.errors.role}
                options={[
                  { value: 'CUSTOMER', label: 'Müşteri' },
                  { value: 'SELLER', label: 'Satıcı' }
                ]}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Kayıt Ol
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Zaten hesabınız var mı?{' '}
                <button
                  onClick={() => router.push('/auth/login')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Giriş Yap
                </button>
              </p>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 