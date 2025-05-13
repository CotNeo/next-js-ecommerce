'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Button } from '../components/ui/Button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData)
    alert('Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            İletişim
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* İletişim Bilgileri */}
            <div>
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  İletişim Bilgileri
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Adres
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Teknoloji Caddesi No:123<br />
                      Merkez/İstanbul
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Telefon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      (0212) 123 45 67
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      E-posta
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      info@sirketim.com
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 10:00 - 16:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* İletişim Formu */}
            <div>
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Bize Ulaşın
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Adınız Soyadınız"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

                  <Input
                    label="E-posta Adresiniz"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  <Input
                    label="Konu"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />

                  <Textarea
                    label="Mesajınız"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                  />

                  <Button type="submit" variant="primary" className="w-full">
                    Gönder
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 