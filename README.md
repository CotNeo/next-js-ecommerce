# Next.js E-Ticaret Projesi

Bu proje, modern ve kullanıcı dostu bir e-ticaret platformu olarak tasarlanmıştır. Next.js, React ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Kullanıcı Yönetimi**
  - Kayıt ve giriş işlemleri
  - Kullanıcı profili yönetimi
  - Rol tabanlı yetkilendirme (Müşteri/Satıcı)

- **Ürün Yönetimi**
  - Ürün listeleme ve detay sayfaları
  - Kategori bazlı filtreleme
  - Arama fonksiyonu
  - Ürün resimleri ve açıklamaları

- **Sepet İşlemleri**
  - Sepete ürün ekleme/çıkarma
  - Ürün miktarı güncelleme
  - Sepet toplamı hesaplama
  - LocalStorage ile sepet verilerini saklama

- **Ödeme İşlemleri**
  - Stripe entegrasyonu
  - Güvenli ödeme altyapısı
  - Sipariş takibi
  - Webhook ile ödeme durumu güncelleme

- **Tasarım**
  - Responsive tasarım
  - Karanlık/Aydınlık tema desteği
  - Modern ve kullanıcı dostu arayüz
  - Tailwind CSS ile özelleştirilebilir bileşenler

## 🛠️ Teknolojiler

- **Frontend**
  - Next.js 14
  - React 18
  - Tailwind CSS
  - TypeScript
  - Heroicons

- **Backend**
  - Next.js API Routes
  - Stripe API
  - LocalStorage

- **Geliştirme Araçları**
  - ESLint
  - Prettier
  - TypeScript
  - Git

## 📦 Kurulum

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/CotNeo/next-js-ecommerce.git
   cd next-js-ecommerce
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Environment değişkenlerini ayarlayın:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## 🎯 Proje Yapısı

```
src/
├── app/
│   ├── components/     # UI bileşenleri
│   ├── context/       # Context API'ler
│   ├── types/         # TypeScript tipleri
│   ├── utils/         # Yardımcı fonksiyonlar
│   ├── api/           # API rotaları
│   └── pages/         # Sayfa bileşenleri
├── public/            # Statik dosyalar
└── styles/           # Global stiller
```

## 🔄 Geliştirme Durumu

### Tamamlanan Özellikler
- [x] Kullanıcı arayüzü tasarımı
- [x] Sepet işlemleri
- [x] Ödeme sistemi entegrasyonu
- [x] Responsive tasarım
- [x] Tema desteği

### Devam Eden Özellikler
- [ ] Ürün yönetim paneli
- [ ] Sipariş takip sistemi
- [ ] Çoklu dil desteği
- [ ] SEO optimizasyonu

### Planlanan Özellikler
- [ ] Çoklu ödeme yöntemi
- [ ] Gelişmiş arama ve filtreleme
- [ ] Kullanıcı yorumları ve puanlama
- [ ] E-posta bildirimleri
- [ ] Admin paneli

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 İletişim

CotNeo - [@CotNeo](https://github.com/CotNeo)

Proje Linki: [https://github.com/CotNeo/next-js-ecommerce](https://github.com/CotNeo/next-js-ecommerce)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Heroicons](https://heroicons.com/)
