// Navbar importunu kaldırdık

export default function About() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Navbar kaldırıldı */}
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[188px] py-16 pt-20"> {/* pt-24 eklendi */}
        <div className="text-center space-y-6">
          <h1 className="font-outfit text-4xl lg:text-6xl font-bold capitalize">
            About Krypto
          </h1>
          <p className="font-roboto text-xl text-gray-300 max-w-2xl mx-auto">
            This page is under construction. Continue prompting to fill in the content.
          </p>
        </div>
      </div>
    </div>
  );
}