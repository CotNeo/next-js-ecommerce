'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { contactMessages } from '../../data/adminData'
import { ContactMessage } from '../../types/admin'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(contactMessages)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ))
  }

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId))
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            İletişim Mesajları
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mesaj Listesi */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id
                          ? 'bg-blue-50 dark:bg-blue-900'
                          : message.isRead
                          ? 'bg-gray-50 dark:bg-gray-800'
                          : 'bg-white dark:bg-gray-700'
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {message.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {message.email}
                          </p>
                        </div>
                        {!message.isRead && (
                          <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                            Yeni
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {message.subject}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Mesaj Detayı */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedMessage.subject}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedMessage.name} ({selectedMessage.email})
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(selectedMessage.createdAt).toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!selectedMessage.isRead && (
                        <Button
                          variant="secondary"
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                        >
                          Okundu Olarak İşaretle
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(selectedMessage.id)}
                      >
                        Sil
                      </Button>
                    </div>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Mesaj seçilmedi
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 