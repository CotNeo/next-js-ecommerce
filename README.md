# Next.js E-Commerce Project

This project is designed as a modern and user-friendly e-commerce platform. It is developed using Next.js, React, and Tailwind CSS.

## 🚀 Features

- **User Management**
  - Registration and login operations
  - User profile management
  - Role-based authorization (Customer/Seller)

- **Product Management**
  - Product listing and detail pages
  - Category-based filtering
  - Search functionality
  - Product images and descriptions

- **Cart Operations**
  - Add/remove products to cart
  - Update product quantity
  - Calculate cart total
  - Store cart data with LocalStorage

- **Payment Operations**
  - Stripe integration
  - Secure payment infrastructure
  - Order tracking
  - Payment status update with webhook

- **Design**
  - Responsive design
  - Dark/Light theme support
  - Modern and user-friendly interface
  - Customizable components with Tailwind CSS

## 🛠️ Technologies

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

- **Development Tools**
  - ESLint
  - Prettier
  - TypeScript
  - Git

## 📦 Installation

1. Clone the project:
   ```bash
   git clone https://github.com/CotNeo/next-js-ecommerce.git
   cd next-js-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 Project Structure

```
src/
├── app/
│   ├── components/     # UI components
│   ├── context/       # Context APIs
│   ├── types/         # TypeScript types
│   ├── utils/         # Helper functions
│   ├── api/           # API routes
│   └── pages/         # Page components
├── public/            # Static files
└── styles/           # Global styles
```

## 🔄 Development Status

### Completed Features
- [x] User interface design
- [x] Cart operations
- [x] Payment system integration
- [x] Responsive design
- [x] Theme support

### In Progress Features
- [ ] Product management panel
- [ ] Order tracking system
- [ ] Multi-language support
- [ ] SEO optimization

### Planned Features
- [ ] Multiple payment methods
- [ ] Advanced search and filtering
- [ ] User reviews and ratings
- [ ] Email notifications
- [ ] Admin panel

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Contact

CotNeo - [@CotNeo](https://github.com/CotNeo)

Project Link: [https://github.com/CotNeo/next-js-ecommerce](https://github.com/CotNeo/next-js-ecommerce)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Heroicons](https://heroicons.com/)

## 🗄️ Database & Prisma

- Uses [Prisma ORM](https://www.prisma.io/) for database modeling and migrations.
- To initialize Prisma and generate the client:
  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```
- Make sure to set your `DATABASE_URL` in the `.env` file.

## 🛡️ Linting & Build Tips

- **Generated files** (like `src/generated/prisma/`) are excluded from linting via `.eslintignore`:
  ```
  src/generated/
  ```
- If you encounter many `@typescript-eslint/no-unused-expressions` errors from generated files, ensure your `.eslintignore` is present and correct.
- To build without linting errors (for troubleshooting):
  ```bash
  NEXT_DISABLE_ESLINT_PLUGIN=true npm run build
  ```

## 🛠️ Admin Panel & Mock Data

- The project includes an **Admin Dashboard** for managing products, orders, and messages.
- Mock data for products, orders, and messages is provided in `src/app/data/` for development and testing.
- You can extend or replace mock data with real database integration using Prisma.

---

# Next.js E-Ticaret Projesi (Turkish Version)

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

## 🗄️ Database & Prisma

- Uses [Prisma ORM](https://www.prisma.io/) for database modeling and migrations.
- To initialize Prisma and generate the client:
  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```
- Make sure to set your `DATABASE_URL` in the `.env` file.

## 🛡️ Linting & Build Tips

- **Generated files** (like `src/generated/prisma/`) are excluded from linting via `.eslintignore`:
  ```
  src/generated/
  ```
- If you encounter many `@typescript-eslint/no-unused-expressions` errors from generated files, ensure your `.eslintignore` is present and correct.
- To build without linting errors (for troubleshooting):
  ```bash
  NEXT_DISABLE_ESLINT_PLUGIN=true npm run build
  ```

## 🛠️ Admin Panel & Mock Data

- The project includes an **Admin Dashboard** for managing products, orders, and messages.
- Mock data for products, orders, and messages is provided in `src/app/data/` for development and testing.
- You can extend or replace mock data with real database integration using Prisma.
