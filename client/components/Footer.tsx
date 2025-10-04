import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin } from 'lucide-react';
import XBrandLogoCssArt from '@/components/XBrandLogoCssArt'; // Yeni CSS art bileşenini import ettik

export default function Footer() {
  return (
    <footer className="bg-[#000034] text-white py-16 lg:py-24 border-t border-brand-purple/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
        {/* Sol Bölüm: Logo ve Sosyal Medya */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <Link to="/" className="font-outfit text-5xl font-bold uppercase text-white">
            KRYPTO
          </Link>
          <p className="font-roboto text-base text-gray-400 max-w-xs">
            Dijital varlıkların geleceğini keşfedin.
          </p>
          <div className="flex space-x-6 mt-4">
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-cyan transition-colors">
              <Github size={24} />
            </a>
            <a href="https://instagram.com/your-instagram" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-cyan transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-cyan transition-colors">
              <XBrandLogoCssArt size={24} className="text-gray-400 hover:text-brand-cyan transition-colors" /> {/* XBrandLogoCssArt bileşenini kullandık */}
            </a>
            <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-cyan transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Sağ Bölüm: Navigasyon Bağlantıları */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16 text-center lg:text-left">
          <div className="flex flex-col space-y-4">
            <h4 className="font-outfit text-lg font-semibold text-brand-cyan mb-2">Keşfet</h4>
            <Link to="/buy-nfts" className="font-roboto text-gray-300 hover:text-white transition-colors">NFT'ler</Link>
            <Link to="/pricing" className="font-roboto text-gray-300 hover:text-white transition-colors">Fiyatlandırma</Link>
            <Link to="/comments" className="font-roboto text-gray-300 hover:text-white transition-colors">Yorumlar</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-outfit text-lg font-semibold text-brand-cyan mb-2">Hakkımızda</h4>
            <Link to="/about" className="font-roboto text-gray-300 hover:text-white transition-colors">Hikayemiz</Link>
            <Link to="/contact" className="font-roboto text-gray-300 hover:text-white transition-colors">İletişim</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-outfit text-lg font-semibold text-brand-cyan mb-2">Yasal</h4>
            <a href="#" className="font-roboto text-gray-300 hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="font-roboto text-gray-300 hover:text-white transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center text-gray-500 text-sm font-roboto">
        &copy; {new Date().getFullYear()} Krypto. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
}