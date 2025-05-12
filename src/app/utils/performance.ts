/**
 * Bellek kullanımını MB cinsinden döndürür
 * @returns {string} Bellek kullanımı (MB)
 */
export const getMemoryUsage = (): string => {
  if (typeof performance !== 'undefined' && performance.memory) {
    return `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)}MB`;
  }
  return 'Bellek kullanımı bilgisi mevcut değil';
};

/**
 * Performans metriklerini oluşturur
 * @param {string} componentName - Bileşen adı
 * @param {number} loadTime - Yüklenme süresi (ms)
 * @param {string} [theme] - Tema durumu (opsiyonel)
 * @returns {Object} Performans metrikleri
 */
export const createPerformanceMetrics = (
  componentName: string,
  loadTime: number,
  theme?: string
) => {
  const metrics: Record<string, string> = {
    bileşen: componentName,
    yüklenmeSüresi: `${loadTime.toFixed(2)}ms`,
    bellekKullanımı: getMemoryUsage(),
    zaman: new Date().toLocaleTimeString()
  };

  if (theme) {
    metrics.tema = theme;
  }

  return metrics;
}; 