import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, ShieldCheck, Users, Gem } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-brand-dark text-white overflow-hidden relative">
      {/* Background blur effects */}
      <div className="absolute top-[-200px] left-[-100px] w-[775px] h-[775px] rounded-full bg-brand-purple opacity-50 blur-[185px] pointer-events-none" />
      <div className="absolute top-[400px] right-[-200px] w-[775px] h-[775px] rounded-full bg-brand-cyan opacity-80 blur-[246px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 pt-20 text-center">
        <h1 className="font-outfit text-5xl sm:text-6xl lg:text-[75px] font-bold leading-tight capitalize mb-6">
          Krypto Hakkında
        </h1>
        <p className="font-roboto text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto text-gray-300">
          Krypto, dijital varlıkların geleceğini şekillendiren yenilikçi bir platformdur. Misyonumuz, NFT dünyasını herkes için erişilebilir, güvenli ve heyecan verici kılmaktır.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h3 className="font-outfit text-[17px] font-semibold uppercase tracking-[1.7px] text-brand-cyan">
              MİSYONUMUZ
            </h3>
            <h2 className="font-outfit text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[100%] capitalize">
              Dijital Sanat ve Koleksiyonculuğu Yeniden Tanımlıyoruz
            </h2>
            <p className="font-roboto text-lg lg:text-xl leading-relaxed max-w-[492px] text-gray-300">
              Krypto olarak, sanatçıların eserlerini sergilemeleri ve koleksiyoncuların benzersiz dijital varlıkları keşfetmeleri için güvenli ve şeffaf bir ortam sunuyoruz. Blockchain teknolojisinin gücünü kullanarak, yaratıcılığı ve sahipliği yeni bir boyuta taşıyoruz.
            </p>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/c44f5a2b2855e8e737f789d1d240dc9c0f0eec73?width=954"
              alt="Mission Illustration"
              className="w-full max-w-[477px] h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 lg:py-24">
        <div className="text-center mb-12">
          <h3 className="font-outfit text-[17px] font-semibold uppercase tracking-[1.7px] text-brand-purple">
            DEĞERLERİMİZ
          </h3>
          <h2 className="font-outfit text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[100%] capitalize mt-4">
            Bizi Biz Yapan İlkeler
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-brand-card border-brand-purple/50 text-white p-6 text-center">
            <CardHeader className="flex flex-col items-center p-0 mb-4">
              <Lightbulb className="h-12 w-12 text-brand-cyan mb-4" />
              <CardTitle className="text-2xl font-outfit font-semibold">Yenilikçilik</CardTitle>
            </CardHeader>
            <CardDescription className="text-gray-300 font-roboto text-base">
              Sürekli olarak yeni teknolojileri ve fikirleri keşfederek NFT pazarını ileri taşıyoruz.
            </CardDescription>
          </Card>
          <Card className="bg-brand-card border-brand-purple/50 text-white p-6 text-center">
            <CardHeader className="flex flex-col items-center p-0 mb-4">
              <ShieldCheck className="h-12 w-12 text-brand-cyan mb-4" />
              <CardTitle className="text-2xl font-outfit font-semibold">Güvenlik</CardTitle>
            </CardHeader>
            <CardDescription className="text-gray-300 font-roboto text-base">
              Kullanıcılarımızın varlıklarını ve verilerini en üst düzeyde koruyoruz.
            </CardDescription>
          </Card>
          <Card className="bg-brand-card border-brand-purple/50 text-white p-6 text-center">
            <CardHeader className="flex flex-col items-center p-0 mb-4">
              <Users className="h-12 w-12 text-brand-cyan mb-4" />
              <CardTitle className="text-2xl font-outfit font-semibold">Topluluk</CardTitle>
            </CardHeader>
            <CardDescription className="text-gray-300 font-roboto text-base">
              Canlı ve destekleyici bir sanatçı ve koleksiyoncu topluluğu oluşturuyoruz.
            </CardDescription>
          </Card>
          <Card className="bg-brand-card border-brand-purple/50 text-white p-6 text-center">
            <CardHeader className="flex flex-col items-center p-0 mb-4">
              <Gem className="h-12 w-12 text-brand-cyan mb-4" />
              <CardTitle className="text-2xl font-outfit font-semibold">Kalite</CardTitle>
            </CardHeader>
            <CardDescription className="text-gray-300 font-roboto text-base">
              Platformumuzda sadece en yüksek kalitede dijital varlıklara yer veriyoruz.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Our Team Section (Placeholder) */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 lg:py-24 text-center">
        <h3 className="font-outfit text-[17px] font-semibold uppercase tracking-[1.7px] text-brand-cyan">
          EKİBİMİZ
        </h3>
        <h2 className="font-outfit text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[100%] capitalize mt-4 mb-6">
          Vizyonumuzu Gerçekleştirenler
        </h2>
        <p className="font-roboto text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto text-gray-300">
          Krypto'nun arkasında, blockchain teknolojisine ve dijital sanata tutkuyla bağlı, deneyimli profesyonellerden oluşan bir ekip var. Birlikte, NFT pazarının geleceğini inşa ediyoruz.
        </p>
      </section>

      {/* CTA Section - Reusing the one from Index.tsx for consistency */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 lg:py-24">
        <div className="relative rounded-[57px] overflow-hidden h-[300px] lg:h-[412px]">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
            alt="Mountain landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center px-4">
            <h3 className="font-outfit text-[17px] font-semibold uppercase tracking-[1.7px] mb-4 text-white">
              ÖĞRENMEYE HAZIR MISIN?
            </h3>
            
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-[60px] font-bold leading-[100%] capitalize mb-8 lg:mb-12 max-w-[659px] text-white">
              teknolojinin yenilikler dünyasını keşfet
            </h2>

            <button className="px-12 py-6 lg:py-7 bg-brand-purple bg-opacity-70 backdrop-blur-sm rounded-[50px] font-outfit text-[17px] font-semibold uppercase tracking-[1.7px] hover:bg-opacity-90 transition-all text-white">
              ÖĞRENMEYE BAŞLA
            </button>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
}