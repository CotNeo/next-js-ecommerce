/** @type {import('next').NextConfig} */
const nextConfig = {
  // .well-known klasörü için yönlendirme
  async rewrites() {
    return [
      {
        source: '/.well-known/:path*',
        destination: '/.well-known/:path*',
      },
    ];
  },
  // Resim optimizasyonu için domain ayarları
  images: {
    domains: [
      'store.storeimages.cdn-apple.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'images.pexels.com'
    ],
  },
};

module.exports = nextConfig

 