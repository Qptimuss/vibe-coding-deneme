// Navbar importunu kaldırdık

export default function Index() {
  return (
    <div className="min-h-screen bg-brand-dark text-white overflow-hidden relative">
      {/* Background blur effects */}
      <div className="absolute top-[-200px] left-[-100px] w-[775px] h-[775px] rounded-full bg-brand-purple opacity-50 blur-[185px] pointer-events-none" />
      <div className="absolute top-[400px] right-[-200px] w-[775px] h-[775px] rounded-full bg-brand-cyan opacity-80 blur-[246px] pointer-events-none" />

      {/* Navbar kaldırıldı */}

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-8 lg:py-16 pt-24"> {/* pt-24 eklendi */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-12">
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-[75px] font-bold leading-[100%] capitalize">
              discover and collect rare NFTs
            </h1>
            
            <p className="font-roboto text-lg lg:text-xl leading-relaxed max-w-[373px]">
              The most secure marketplace for buying and selling unique crypto assets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-10">
              <button className="px-12 py-6 lg:py-7 bg-brand-purple rounded-[50px] font-outfit text-base lg:text-[17px] font-semibold uppercase tracking-[1.7px] hover:bg-opacity-90 transition-all">
                BUY NFTS
              </button>
              <button className="px-12 py-6 lg:py-7 border border-brand-cyan rounded-[50px] font-outfit text-lg lg:text-xl font-semibold uppercase tracking-[2px] hover:bg-brand-cyan hover:bg-opacity-10 transition-all">
                SELL NFTS
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/dd6d94822dd0cc353988fc30b9c0835124ad95db?width=1132" 
              alt="NFT 3D Illustration" 
              className="w-full max-w-[566px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* Featured On Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 lg:py-24">
        <div className="space-y-6">
          <h3 className="font-outfit text-[17px] font-semibold uppercase tracking-[1.7px]">
            Featured on
          </h3>
          
          <div className="bg-brand-purple bg-opacity-50 rounded-[25px] p-8 lg:p-12 flex flex-wrap items-center justify-center lg:justify-around gap-8 lg:gap-12">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/9f35952d4aea3737af5eae51f26cdcc8fe4aaca9?width=476" 
              alt="TechCrunch" 
              className="h-8 lg:h-[76px] w-auto"
            />
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/1c7adbdc1af371e7283b5a4759a50472edf6ac85?width=428" 
              alt="Fast Company" 
              className="h-6 lg:h-7 w-auto"
            />
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/c24f6cfa96516a04cffdec5987c32367878308bf?width=174" 
              alt="MIT" 
              className="h-8 lg:h-[41px] w-auto"
            />
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/1359b1fed1318a820c2a4aae3f686dbb3618f432?width=316" 
              alt="Forbes" 
              className="h-8 lg:h-[37px] w-auto"
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex justify-center lg:justify-start">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/c44f5a2b2855e8e737f789d1d240dc9c0f0eec73?width=954" 
              alt="Analytics Dashboard" 
              className="w-full max-w-[477px] h-auto"
            />
          </div>

          <div className="space-y-8">
            <h3 className="font-outfit text-[17px] font-semibold uppercase tracking-[1.7px]">
              ANALYTICS
            </h3>
            
            <h2 className="font-outfit text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[100%] capitalize">
              built-in analytics to track your nfts
            </h2>

            <p className="font-roboto text-lg lg:text-xl leading-relaxed max-w-[492px]">
              Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time.
            </p>

            <button className="px-8 lg:px-14 py-6 lg:py-7 bg-brand-purple rounded-[50px] font-outfit text-[17px] font-semibold uppercase tracking-[1.7px] hover:bg-opacity-90 transition-all">
              FİYATLANDIRMAYA BAK
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative">
              <div className="bg-brand-card rounded-[38px] p-8 pt-28 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/05a0606b7c8cfd37b98bfdc42075d985857fbf93?width=312" 
                      alt="Olivia Cole" 
                      className="w-[156px] h-[156px] rounded-full grayscale"
                    />
                    <div className="absolute top-0 right-0 w-[30px] h-[28px] bg-brand-cyan rounded-full" />
                  </div>
                </div>

                <h4 className="font-outfit text-[17px] font-semibold uppercase tracking-[1.7px] mb-6">
                  OLIVIA COLE
                </h4>

                <p className="font-roboto text-2xl leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper scelerisque mi, in malesuada felis malesuada vel.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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